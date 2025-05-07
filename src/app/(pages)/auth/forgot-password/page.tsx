"use client";
import React from "react";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoGithub,
  IoMailOutline,
  IoLogoGoogle,
} from "react-icons/io5";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define Zod schema for validation
const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgetPasswordFormInputs = z.infer<typeof forgetPasswordSchema>;

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormInputs>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async (data: ForgetPasswordFormInputs) => {
    try {
      // Simulate an API call or data submission
      console.log("Form submitted:", data);

      // Simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      toast.success("Password reset link sent successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // Simulate an error response
      toast.error("Failed to send password reset link. Please try again.", {
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
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
          {/* Logo */}
          <h1 className="text-xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-xs text-gray-300 mb-4">Please Enter Your Email</p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-3"
          >
            <div className="relative">
              <label className="text-white text-xs font-medium mb-1 block">
                Email
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm"
            >
              Reset Your Password
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4 w-full mt-4">
            <button
              className="text-white text-lg hover:text-blue-500 transition duration-300"
              title="Login with Facebook"
            >
              <IoLogoFacebook />
            </button>

            {/* Google Login Button with multi-color effect */}
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

export default ForgetPassword;
