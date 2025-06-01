// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   IoLogoFacebook,
//   IoLogoGoogle,
//   IoLogoGithub,
//   IoMailOutline,
//   IoCallOutline,
//   IoLockClosedOutline,
//   IoEyeSharp,
//   IoEyeOffSharp,
// } from "react-icons/io5";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { showErrorToast, showSuccessToast } from "@/utils/toast";
// import router from "next/router";
// import { postServerRequest } from "@/utils/generalServerRequest";
// import { useMutation } from "@tanstack/react-query";
// import { useAuthStore } from "@/store/authStore";

// // Define Zod schema for validation
// const signupSchema = z
//   .object({
//     email: z.string().email("Invalid email address"),
//     phone: z
//       .string()
//       .regex(
//         /^01[0125]\d{8}$/,
//         "Number must start with 010, 011, 012, or 015 and be 11 digits"
//       ),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/^[A-Z]/, "Password must start with a capital letter")
//       .regex(/\d/, "Password must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type SignupFormInputs = z.infer<typeof signupSchema>;

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuthStore();
  

//   // Initialize react-hook-form with Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormInputs>({
//     resolver: zodResolver(signupSchema),
//   });

//   // Handle form submission
//   const signupMutation = useMutation({
//     mutationFn: (data: SignupFormInputs) => postServerRequest("/auth/register", data),
//     onSuccess: (response) => {
//       if (response?.data?.success) {
//         const { token, name, email } = response.data.data;
//         login(token, { email });
//         showSuccessToast("Registration successful!");
//         router.push("/chat");
//       } else {
//         showErrorToast(response?.message || "Failed to register. Please try again.");
//       }
//     },
//     onError: () => {
//       showErrorToast("An error occurred. Please try again.");
//     },
//   });

//   // Handle form submission
//   const onSubmit = (data: SignupFormInputs) => {
//     signupMutation.mutate(data);
//   };

//   return (
//     <div className="bg-[url('/assets/background.png')] bg-cover bg-center bg-no-repeat w-full h-screen relative overflow-hidden">
//       {/* Centered Signup Box */}
//       <div className="flex justify-center items-center h-full w-full">
//         <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
//           {/* Logo */}
//           <Image
//             src="/assets/logo.png"
//             alt="logo"
//             width={60}
//             height={60}
//             className="mb-4"
//           />

//           {/* Title */}
//           <h1 className="text-xl font-bold text-white mb-2">Sign Up</h1>
//           <p className="text-xs text-gray-300 mb-4">Create your account</p>

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col w-full space-y-3"
//           >
//             {/* Email Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Email
//               </label>
//               <div className="relative">
//                 <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("email")}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Phone Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <IoCallOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type="tel"
//                   placeholder="Enter your phone number"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("phone")}
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-red-500 text-xs">{errors.phone.message}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Password
//               </label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("password")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm your password"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("confirmPassword")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-xs">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* Signup Button */}
//             <button
//               type="submit"
//               className="bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Divider Line with "OR" Text */}
//           <div className="relative w-full flex items-center my-4">
//             <div className="flex-grow border-t border-white/50"></div>
//             <span className="mx-2 text-white text-xs font-medium">OR</span>
//             <div className="flex-grow border-t border-white/50"></div>
//           </div>

//           {/* Social Login Buttons */}
//           <div className="flex justify-center space-x-4 w-full">
//             <button
//               className="text-white text-lg hover:text-blue-500 transition duration-300"
//               title="Login with Facebook"
//             >
//               <IoLogoFacebook />
//             </button>
//             <button
//               className="text-white text-lg hover:text-yellow-600 transition duration-300"
//               title="Login with Google"
//             >
//               <IoLogoGoogle />
//             </button>
//             <button
//               className="text-white text-lg hover:text-gray-800 transition duration-300"
//               title="Login with GitHub"
//             >
//               <IoLogoGithub />
//             </button>
//           </div>

//           {/* Footer Links */}
//           <div className="mt-4 text-center">
//             <p className="text-xs text-gray-300">
//               Already have an account?&nbsp;
//               <Link
//                 href="/auth/login"
//                 className="text-blue-400 hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//             <p className="text-xs text-gray-300 mt-2">
//               <Link href="*" className="text-blue-400 hover:underline">
//                 Terms & Conditions
//               </Link>
//               <span className="mx-1">|</span>
//               <Link href="*" className="text-blue-400 hover:underline">
//                 Support
//               </Link>
//               <span className="mx-1">|</span>
//               <Link href="*" className="text-blue-400 hover:underline">
//                 Customer Service
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;


// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
// import {
//   IoLogoFacebook,
//   IoLogoGoogle,
//   IoLogoGithub,
//   IoMailOutline,
//   IoCallOutline,
//   IoLockClosedOutline,
//   IoEyeSharp,
//   IoEyeOffSharp,
// } from "react-icons/io5";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { showErrorToast, showSuccessToast } from "@/utils/toast";
// import { postServerRequest } from "@/utils/generalServerRequest";
// import { useMutation } from "@tanstack/react-query";
// import { useAuthStore } from "@/store/authStore";

// // Define Zod schema for validation
// const signupSchema = z
//   .object({
//     email: z.string().email("Invalid email address"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/^[A-Z]/, "Password must start with a capital letter")
//       .regex(/\d/, "Password must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type SignupFormInputs = z.infer<typeof signupSchema>;

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const { login } = useAuthStore();

//   // Initialize react-hook-form with Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormInputs>({
//     resolver: zodResolver(signupSchema),
//   });

//   const createSessionMutation = useMutation({
//     mutationFn: () => postServerRequest("/messages/session", { title: "New Chat" }),
//     onSuccess: (response) => {
//       if (response?.data?.success) {
//         const { sessionId } = response.data.data;
        
//         router.push(`/chat/${sessionId}`);
//       } else {
//         showErrorToast("Failed to start a new chat session.");
//         router.push("/");
//       }
//     },
//     onError: () => {
//       showErrorToast("An error occurred while starting a new chat session.");
//       router.push("/");
//     },
//   });


//   // Handle form submission with useMutation
//   const signupMutation = useMutation({
//     mutationFn: (data: SignupFormInputs) => postServerRequest("/auth/register", data),
//     onSuccess: (response) => {
//       if (response?.data?.success) { // Check response.success directly
//         console.log(response)
//         const { token, name, email } = response.data.data;
//         login(token, { email , userName: name});
//         showSuccessToast("Registration successful!");
//         createSessionMutation.mutate();
//         // router.push("/chat");
//       } else {
//         showErrorToast(response?.message || "Failed to register. Please try again.");
//       }
//     },
//     onError: () => {
//       showErrorToast("An error occurred. Please try again.");
//     },
//   });

//   // Handle form submission
//   const onSubmit = (data: SignupFormInputs) => {
//     signupMutation.mutate(data);
//   };

//   return (
//     <div className="bg-[url('/assets/background.webp')] bg-cover bg-center bg-no-repeat w-full h-screen relative overflow-hidden">
//       {/* Centered Signup Box */}
//       <div className="flex justify-center items-center h-full w-full">
//         <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
//           {/* Logo */}
//           <Image
//             src="/assets/logo.webp"
//             alt="logo"
//             width={70}
//             height={70}
//             className="mb-4"
//           />

//           {/* Title */}
//           <h1 className="text-2xl  font-bold text-white mb-2">Sign Up</h1>
//           <p className="text-xs text-gray-300 mb-4">Create your account</p>

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col w-full space-y-3"
//           >
//             {/* Email Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Email
//               </label>
//               <div className="relative">
//                 <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("email")}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email.message}</p>
//               )}
//             </div>
            

//             {/* Password Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Password
//               </label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("password")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm your password"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("confirmPassword")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-xs">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* Signup Button */}
//             <button
//               type="submit"
//               disabled={signupMutation.isPending} // Disable while mutation is pending
//               className={`bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm ${
//                 signupMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {signupMutation.isPending ? "Signing up..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Divider Line with "OR" Text */}
//           <div className="relative w-full flex items-center my-4">
//             <div className="flex-grow border-t border-white/50"></div>
//             <span className="mx-2 text-white text-xs font-medium">OR</span>
//             <div className="flex-grow border-t border-white/50"></div>
//           </div>

//           {/* Social Login Buttons */}
//           <div className="flex justify-center space-x-4 w-full">
//             <button
//               className="text-white text-lg hover:text-blue-500 transition duration-300"
//               title="Login with Facebook"
//             >
//               <IoLogoFacebook />
//             </button>
//             <button
//               className="text-white text-lg hover:text-yellow-600 transition duration-300"
//               title="Login with Google"
//             >
//               <IoLogoGoogle />
//             </button>
            
//           </div>

//           {/* Footer Links */}
//           <div className="mt-4 text-center">
//             <p className="text-xs text-gray-300">
//               Already have an account?{" "}
//               <Link
//                 href="/auth/login"
//                 className="text-blue-400 hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//             <p className="text-xs text-gray-300 mt-2">
//               <Link href="*" className="text-blue-400 hover:underline">
//                 Terms & Conditions
//               </Link>
//               <span className="mx-1">|</span>
//               <Link href="*" className="text-blue-400 hover:underline">
//                 Support
//               </Link>
//               <span className="mx-1">|</span>
//               <Link href="*" className="text-blue-400 hover:underline">
//                 Customer Service
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;



// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   IoLogoFacebook,
//   IoLogoGoogle,
//   IoMailOutline,
//   IoLockClosedOutline,
//   IoEyeSharp,
//   IoEyeOffSharp,
// } from "react-icons/io5";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { showErrorToast, showSuccessToast } from "@/utils/toast";
// import { postServerRequest } from "@/utils/generalServerRequest";
// import { useMutation } from "@tanstack/react-query";
// import { useAuthStore } from "@/store/authStore";

// // Define Zod schema for validation
// const signupSchema = z
//   .object({
//     email: z.string().email("Invalid email address"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/^[A-Z]/, "Password must start with a capital letter")
//       .regex(/\d/, "Password must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type SignupFormInputs = z.infer<typeof signupSchema>;

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { login } = useAuthStore();

//   // Initialize react-hook-form with Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormInputs>({
//     resolver: zodResolver(signupSchema),
//   });

//   // Handle Google OAuth callback
  
//   const createSessionMutation = useMutation({
//     mutationFn: () => postServerRequest("/messages/session", { title: "New Chat" }),
//     onSuccess: (response) => {
//       if (response?.data?.success) {
//         const { sessionId } = response.data.data;
//         router.push(`/chat/${sessionId}`);
//       } else {
//         showErrorToast("Failed to start a new chat session.");
//         router.push("/");
//       }
//     },
//     onError: () => {
//       showErrorToast("An error occurred while starting a new chat session.");
//       router.push("/");
//     },
//   });
  
//   useEffect(() => {
//     const token = searchParams.get("token");
//     const email = searchParams.get("email");
//     const name = searchParams.get("name");

//     if (token && email && name) {
//       login(token, { email, userName: name });
//       showSuccessToast("Google authentication successful!");
//       createSessionMutation.mutate();
//     } else if (searchParams.get("error")) {
//       showErrorToast("Google authentication failed. Please try again.");
//     }
//   }, [createSessionMutation, login, searchParams]);

//   // Handle form submission with useMutation
//   const signupMutation = useMutation({
//     mutationFn: (data: SignupFormInputs) => postServerRequest("/auth/register", data),
//     onSuccess: (response) => {
//       if (response?.data?.success) {
//         const { token, name, email } = response.data.data;
//         login(token, { email, userName: name });
//         showSuccessToast("Registration successful!");
//         createSessionMutation.mutate();
//       } else {
//         showErrorToast(response?.message || "Failed to register. Please try again.");
//       }
//     },
//     onError: () => {
//       showErrorToast("An error occurred. Please try again.");
//     },
//   });

//   // Handle form submission
//   const onSubmit = (data: SignupFormInputs) => {
//     signupMutation.mutate(data);
//   };

//   // Handle Google OAuth button click
//   const handleGoogleSignup = () => {
//     window.location.href = "/auth/google";
//   };

//   return (
//     <div className="bg-[url('/assets/background.webp')] bg-cover bg-center bg-no-repeat w-full h-screen relative overflow-hidden">
//       {/* Centered Signup Box */}
//       <div className="flex justify-center items-center h-full w-full">
//         <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
//           {/* Logo */}
//           <Image
//             src="/assets/logo.webp"
//             alt="logo"
//             width={70}
//             height={70}
//             className="mb-4"
//           />

//           {/* Title */}
//           <h1 className="text-2xl font-bold text-white mb-2">Sign Up</h1>
//           <p className="text-xs text-gray-300 mb-4">Create your account</p>

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col w-full space-y-3"
//           >
//             {/* Email Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Email
//               </label>
//               <div className="relative">
//                 <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("email")}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Password
//               </label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("password")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="relative">
//               <label className="text-white text-xs font-medium mb-1 block">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm your password"
//                   className="border border-white/50 bg-transparent text-white rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 w-full"
//                   {...register("confirmPassword")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-xs">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* Signup Button */}
//             <button
//               type="submit"
//               disabled={signupMutation.isPending}
//               className={`bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm ${
//                 signupMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {signupMutation.isPending ? "Signing up..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Divider Line with "OR" Text */}
//           <div className="relative w-full flex items-center my-4">
//             <div className="flex-grow border-t border-white/50"></div>
//             <span className="mx-2 text-white text-xs font-medium">OR</span>
//             <div className="flex-grow border-t border-white/50"></div>
//           </div>

//           {/* Social Login Buttons */}
//           <div className="flex justify-center space-x-4 w-full">
//             <button
//               className="text-white text-lg hover:text-blue-500 transition duration-300"
//               title="Sign up with Facebook"
//             >
//               <IoLogoFacebook />
//             </button>
//             <button
//               onClick={handleGoogleSignup}
//               className="text-white text-lg hover:text-yellow-600 transition duration-300"
//               title="Sign up with Google"
//             >
//               <IoLogoGoogle />
//             </button>
//           </div>

//           {/* Footer Links */}
//           <div className="mt-4 text-center">
//             <p className="text-xs text-gray-300">
//               Already have an account?{" "}
//               <Link
//                 href="/auth/login"
//                 className="text-blue-400 hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//             <p className="text-xs text-gray-300 mt-2">
//               <Link href="/terms" className="text-blue-400 hover:underline">
//                 Terms & Conditions
//               </Link>
//               <span className="mx-1">|</span>
//               <Link href="/support" className="text-blue-400 hover:underline">
//                 Support
//               </Link>
//               <span className="mx-1">|</span>
//               <Link href="/contact" className="text-blue-400 hover:underline">
//                 Customer Service
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;


"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Facebook,
  Chrome,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
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
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define Zod schema for validation
const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
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

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const starsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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

  // Mutation for signup
  const signupMutation = useMutation({
    mutationFn: (data: SignupFormInputs) =>
      postServerRequest("/auth/register", {
        email: data.email,
        password: data.password,
      }),
    onSuccess: (response) => {
      if (response?.data?.success) {
        const { token, name, email } = response.data.data;
        login(token, { email, userName: name });
        showSuccessToast("Registration successful!");
        createSessionMutation.mutate();
      } else {
        showErrorToast(response?.message || "Failed to register. Please try again.");
      }
    },
    onError: (error: any) => {
      showErrorToast(error?.message || "An error occurred. Please try again.");
    },
  });

  // Handle Google OAuth callback
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (token && email && name) {
      login(token, { email, userName: name });
      showSuccessToast("Google authentication successful!");
      createSessionMutation.mutate();
    } else if (searchParams.get("error")) {
      showErrorToast("Google authentication failed. Please try again.");
    }
  }, [createSessionMutation, login, searchParams]);

  // Handle form submission
  const onSubmit = (data: SignupFormInputs) => {
    signupMutation.mutate(data);
  };

  // Handle Google OAuth button click
  const handleGoogleSignup = () => {
    window.location.href = "/auth/google";
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
        particle.className = "absolute bg-white/60 rounded-full animate-float-up";
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
        shootingStar.className = "absolute w-0.5 h-0.5 bg-white rounded-full animate-shoot";
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.left = "-100px";
        shootingStar.style.boxShadow = "0 0 6px 2px rgba(255,255,255,0.8)";

        const tail = document.createElement("div");
        tail.className = "absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent";
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
        {/* Left Box - Signup Form */}
        <div style={{ width: "fit-content" }} className="lg:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInLeft">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg animate-float">
              <Image src="/assets/white_logo.png" alt="logo" width={50} height={50} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 animate-slideUp">
              Create Your Account
            </h1>
            <p className="text-gray-300 text-sm">
              Join us and start your AI conversation journey!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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

            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm your password"
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
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 animate-slideDown">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || signupMutation.isPending}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md py-2.5 transition-all duration-300 shadow-md ${
                isSubmitting || signupMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:scale-105"
              }`}
            >
              {isSubmitting || signupMutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing Up...</span>
                </div>
              ) : (
                "🚀 Sign Up"
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
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 transition-all duration-200">
                Sign In
              </Link>
            </p>
            <div className="flex justify-center space-x-3 text-xs text-gray-400">
              {["Terms & Conditions", "Support", "Customer Service"].map((link, index) => (
                <React.Fragment key={link}>
                  <a href={`/${link.toLowerCase().replace(" & ", "-").replace(" ", "-")}`} className="hover:text-blue-400 transition-all duration-200">
                    {link}
                  </a>
                  {index < 2 && <span>|</span>}
                </React.Fragment>
              ))}
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

export default Signup;