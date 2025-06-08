"use client";

import React, { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import AstronautSpaceLanding from "@/components/layout/RightLogin";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { postServerRequest } from "@/utils/generalServerRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define Zod schema for validation
const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgetPasswordFormInputs = z.infer<typeof forgetPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormInputs>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Mutation for forgot password
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgetPasswordFormInputs) =>
      postServerRequest("/auth/forgot-password", { email: data.email }),
    onSuccess: (response) => {
      if (response?.success) {
        showSuccessToast("Password reset link sent successfully!");
        router.push("/auth/login");
      } else {
        showErrorToast(
          response?.message || "Failed to send password reset link."
        );
      }
    },
    onError: (error: any) => {
      showErrorToast(error?.message || "An error occurred. Please try again.");
    },
  });

  // Handle form submission
  const onSubmit = (data: ForgetPasswordFormInputs) => {
    forgotPasswordMutation.mutate(data);
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
      <div className="flex flex-col lg:flex-row w-full items-center justify-center max-w-5xl gap-6 relative z-10">
        {/* Left Box - Forgot Password Form */}
        <div
          style={{ width: "fit-content" }}
          className="lg:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInLeft"
        >
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg animate-float">
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
              Forgot Password
            </h1>
            <p className="text-gray-300 text-sm">
              Enter your email to receive a password reset link.
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

            <button
              type="submit"
              disabled={isSubmitting || forgotPasswordMutation.isPending}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md py-2.5 transition-all duration-300 shadow-md ${
                isSubmitting || forgotPasswordMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:scale-105"
              }`}
            >
              {isSubmitting || forgotPasswordMutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                "🚀 Send Reset Link"
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
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-400 hover:text-blue-300 transition-all duration-200"
              >
                Sign In
              </Link>
            </p>
            <p className="text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-400 hover:text-blue-300 transition-all duration-200"
              >
                Sign Up
              </Link>
            </p>
            <div className="flex justify-center space-x-3 text-xs text-gray-400">
              {["Terms & Conditions", "Support", "Customer Service"].map(
                (link, index) => (
                  <React.Fragment key={link}>
                    <a
                      href={`/${link
                        .toLowerCase()
                        .replace(" & ", "-")
                        .replace(" ", "-")}`}
                      className="hover:text-blue-400 transition-all duration-200"
                    >
                      {link}
                    </a>
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

export default ForgotPassword;
