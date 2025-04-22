"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoGithub,
  IoMailOutline,
  IoCallOutline,
  IoLockClosedOutline,
  IoEyeSharp,
  IoEyeOffSharp,
} from "react-icons/io5";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define Zod schema for validation
const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .regex(
        /^01[0125]\d{8}$/,
        "Number must start with 010, 011, 012, or 015 and be 11 digits"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^[A-Z]/, "Password must start with a capital letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  // Handle form submission
  const onSubmit = async (data: SignupFormInputs) => {
    try {
      // Simulate an API call or data submission
      console.log("Form submitted:", data);

      // Simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // Simulate an error response
      toast.error("Failed to create account. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="bg-[url('/assets/background.png')] bg-cover bg-center bg-no-repeat w-full h-screen relative overflow-hidden">
      {/* Centered Signup Box */}
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
          {/* Logo */}
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="mb-4"
          />

          {/* Title */}
          <h1 className="text-xl font-bold text-white mb-2">Sign Up</h1>
          <p className="text-xs text-gray-300 mb-4">Create your account</p>

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
                  placeholder="Enter your email"
                  className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <label className="text-white text-xs font-medium mb-1 block">
                Phone Number
              </label>
              <div className="relative">
                <IoCallOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
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
                  placeholder="Enter your password"
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

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="text-white text-xs font-medium mb-1 block">
                Confirm Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
                  {...register("confirmPassword")}
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm"
            >
              Sign Up
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
              Already have an account?&nbsp;
              <Link
                href="/auth/login"
                className="text-blue-400 hover:underline"
              >
                Login
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

export default Signup;
