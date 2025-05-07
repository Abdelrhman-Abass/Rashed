"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoLogoFacebook, IoLogoGoogle, IoLogoGithub } from "react-icons/io5";
import { IoEyeSharp, IoEyeOffSharp, IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { postServerRequest } from "@/utils/generalServerRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"), // Fixed error message
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const createSessionMutation = useMutation({
    mutationFn: () => postServerRequest("/messages/session", { title: "New Chat" }),
    onSuccess: (response) => {
      console.log(response)
      if (response?.data?.success) {
        const { sessionId } = response.data.data;
        router.push(`/chat/${sessionId}`);
      } else {
        showErrorToast("Failed to start a new chat session.");
        router.push("/"); // Redirect to home if session creation fails
      }
    },
    onError: () => {
      showErrorToast("An error occurred while starting a new chat session.");
      router.push("/");
    },
  });


  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInputs) => postServerRequest("/auth/login", data),
    onSuccess: (response) => {
      console.log("Login response:", response); // Log the entire response for debugging
      // Since postServerRequest wraps the response in { success, data }, access response.data
      if (response?.data?.success) {
        const { token, user } = response.data.data; // response.data contains the actual API response
        login(token, { email: user.email });
        // console.log("Login successful:", response.data.data);
        showSuccessToast("Login successful!");
        createSessionMutation.mutate();

        // router.push("/chat");
      } else {
        showErrorToast(response?.message || "Failed to login. Please try again.");
      }
    },
    onError: (error: any) => {
      showErrorToast(error?.message || "An error occurred. Please try again.");

    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form submitted:", data);
    loginMutation.mutate(data);
  };

  return (
    <div className="bg-[url('/assets/background.png')] bg-cover bg-center bg-no-repeat w-full h-screen relative overflow-hidden">
      {/* Centered Login Box */}
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
          {/* Logo */}
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="mb-4"
          />

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-2">Login</h1>
          <p className="text-xs text-gray-300 mb-4">Great to see you again!</p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-3"
          >
            {/* Email Field */}
            <div className="relative">
              <label className="text-white text-xs font-medium mb-1 block">
                Email
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-white text-xs font-medium mb-1 block">
                Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-transparent border border-white rounded focus:ring-blue-500"
                />
                <label className="text-white text-xs ml-2">Remember me</label>
              </div>
              <Link
                href="/auth/forgetpassword"
                className="text-blue-400 text-xs hover:underline"
              >
                Forget Password ?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className={`bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm ${
                loginMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider Line with "OR" Text */}
          <div className="relative w-full flex items-center my-4">
            <div className="flex-grow border-t border-white/50"></div>
            <span className="mx-2 text-white text-xs font-medium">OR</span>
            <div className="flex-grow border-t border-white/50"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4 w-full">
            <button
              className="text-white text-lg hover:text-blue-500 transition duration-300"
              title="Login with Facebook"
            >
              <IoLogoFacebook />
            </button>
            <button
              className="text-white text-lg hover:text-yellow-600 transition duration-300"
              title="Login with Google"
            >
              <IoLogoGoogle />
            </button>
            <button
              className="text-white text-lg hover:text-gray-800 transition duration-300"
              title="Login with GitHub"
            >
              <IoLogoGithub />
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-300 mt-2">
              <Link href="*" className="text-blue-400 hover:underline">
                Terms & Conditions
              </Link>
              <span className="mx-1">|</span>
              <Link href="*" className="text-blue-400 hover:underline">
                Support
              </Link>
              <span className="mx-1">|</span>
              <Link href="*" className="text-blue-400 hover:underline">
                Customer Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;