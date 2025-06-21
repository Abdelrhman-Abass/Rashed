"use client";
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AstronautSpaceLanding from "@/components/layout/RightLogin";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { postServerRequest } from "@/utils/generalServerRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuthStore();
  const starsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Mutation for creating a chat session
  const createSessionMutation = useMutation({
    mutationFn: () =>
      postServerRequest("/messages/session", { title: "New Chat" }),
    onSuccess: (response) => {
      if (response?.data?.success) {
        const { sessionId } = response.data.data;
        router.push(`/chat/${sessionId}`);
      } else {
        showErrorToast("Failed to start a new chat session.");
        router.push("/");
      }
    },
    onError: () => {
      showErrorToast("An error occurred while starting a new chat session.");
      router.push("/");
    },
  });

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInputs) =>
      postServerRequest("/auth/login", data),
    onSuccess: (response) => {
      // console.log("Login Response:", response); // Debug the response
      if (response?.data?.success) {
        const { token, user } = response.data.data;
        login(token, { email: user.email, userName: user.name });
        showSuccessToast("Login successful!");
        createSessionMutation.mutate();
      } else {
        showErrorToast(
          response?.message || "Failed to login. Please try again."
        );
      }
    },
    onError: (error: any) => {
      showErrorToast(error?.message || "An error occurred. Please try again.");
    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    const createStars = () => {
      if (!starsRef.current) return;
      const numberOfStars = 200;

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full animate-pulse";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        starsRef.current.appendChild(star);
      }
    };

    const createParticles = () => {
      if (!particlesRef.current) return;

      const addParticle = () => {
        const particle = document.createElement("div");
        particle.className =
          "absolute bg-white/60 rounded-full animate-float-up";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = "-10px";
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particlesRef.current?.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 8000);
      };

      const interval = setInterval(addParticle, 500);
      return () => clearInterval(interval);
    };

    const createShootingStars = () => {
      if (!shootingStarsRef.current) return;

      const addShootingStar = () => {
        const shootingStar = document.createElement("div");
        shootingStar.className =
          "absolute w-0.5 h-0.5 bg-white rounded-full animate-shoot";
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.left = "-100px";
        shootingStar.style.boxShadow = "0 0 6px 2px rgba(255,255,255,0.8)";

        const tail = document.createElement("div");
        tail.className =
          "absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent";
        tail.style.transform = "translateX(-48px)";
        shootingStar.appendChild(tail);

        shootingStarsRef.current?.appendChild(shootingStar);

        setTimeout(() => {
          shootingStar.remove();
        }, 3000);
      };

      const interval = setInterval(addShootingStar, 4000);
      return () => clearInterval(interval);
    };

    createStars();
    const particleCleanup = createParticles();
    const shootingStarCleanup = createShootingStars();

    return () => {
      particleCleanup?.();
      shootingStarCleanup?.();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-radial flex items-center justify-center p-4 relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Shared Starry Background */}
      <div ref={starsRef} className="absolute inset-0 w-full h-full" />
      <div ref={particlesRef} className="absolute inset-0" />
      <div ref={shootingStarsRef} className="absolute inset-0" />

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row w-full items-center justify-center  max-w-5xl gap-6 relative z-10">
        {/* Left Box - Login Form */}
        <div
          style={{ width: "fit-content" }}
          className="  lg:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInLeft"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16  rounded-xl flex items-center justify-center shadow-lg animate-float">
              <Image
                src="/assets/white_logo.png"
                alt="logo"
                width={50}
                height={50}
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 animate-slideUp">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-sm">
              Great to see you again! Let&apos;s continue our AI conversation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-md pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 animate-slideDown">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full bg-white/10 border border-white/20 rounded-md pl-10 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 animate-slideDown">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                />
                <span className="text-gray-300">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-blue-400 hover:text-blue-300 transition-all duration-200"
              >
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 transition-all duration-200"
                >
                  Forgot Password?
                </button>
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md py-2.5 transition-all duration-300 shadow-md ${
                isSubmitting || loginMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:scale-105"
              }`}
            >
              {isSubmitting || loginMutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "🚀 Sign In"
              )}
            </button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          <div className="text-center space-y-2 text-sm">
            <p className="text-gray-300">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">
                <button className="text-blue-400 hover:text-blue-300 transition-all duration-200">
                  Sign Up
                </button>
              </Link>
            </p>
            <div className="flex justify-center space-x-3 text-xs text-gray-400">
              {["Terms & Conditions", "Support", "Customer Service"].map(
                (link, index) => (
                  <React.Fragment key={link}>
                    <button className="hover:text-blue-400 transition-all duration-200">
                      {link}
                    </button>
                    {index < 2 && <span>|</span>}
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Box - Astronaut Scene */}
        <div className="w-full lg:h-[65vh] hidden lg:block lg:w-1/2 md:mt-16 p-4 animate-fadeInRight">
          <AstronautSpaceLanding />
        </div>
      </div>
    </div>
  );
};

export default Login;
