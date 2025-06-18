"use client";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { postServerRequest } from "@/utils/generalServerRequest";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/utils/toast";
import FloatingParticles from "@/components/layout/FloatingParticles/FloatingParticles";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

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

  const handleStartChat = () => {
    createSessionMutation.mutate();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const glitchVariants = {
    glitch: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Floating particles */}
        <FloatingParticles />
      </div>

      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main 404 */}
        <motion.div className="relative mb-8" variants={itemVariants}>
          <motion.h1
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative"
            variants={glitchVariants}
            animate="glitch"
          >
            404
          </motion.h1>

          {/* Glitch effect overlay */}
          <motion.div
            className="absolute inset-0 text-8xl md:text-9xl font-bold text-red-500/20"
            animate={{
              x: [0, -3, 3, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* AI Robot/Astronaut illustration */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
          animate={{
            y: [-10, 10],
            rotate: [-1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div className="w-48 h-48 mx-auto relative">
            {/* AI Robot Body */}
            <div className="w-32 h-40 bg-gradient-to-b from-gray-300 to-gray-500 rounded-2xl mx-auto relative shadow-2xl">
              {/* Head */}
              <div className="w-24 h-24 bg-gradient-to-b from-white to-gray-200 rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2 shadow-lg">
                {/* Eyes */}
                <motion.div
                  className="flex justify-center items-center pt-6 space-x-3"
                  animate={{
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-inner"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-inner"></div>
                </motion.div>
                {/* Mouth */}
                <div className="w-8 h-2 bg-gray-400 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2"></div>
              </div>

              {/* Body details */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-red-400 rounded-full mb-2"></div>
                <div className="w-16 h-1 bg-gray-400 rounded mb-2"></div>
                <div className="w-12 h-1 bg-gray-400 rounded"></div>
              </div>

              {/* Arms */}
              <div className="absolute top-12 -left-6 w-6 h-16 bg-gray-400 rounded-full"></div>
              <div className="absolute top-12 -right-6 w-6 h-16 bg-gray-400 rounded-full"></div>
            </div>

            {/* Floating particles around robot */}
            <FloatingParticles />
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl mb-4 font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Rashed Lost in Space!
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Our AI seems to have wandered off into the digital void. Don&apos;t
          worry, we&apos;re recalibrating the neural networks to get you back on
          track!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleStartChat}
            disabled={createSessionMutation.isPending}
            className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl px-8 py-4 text-lg transition-all duration-300 shadow-lg ${
              createSessionMutation.isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={
              createSessionMutation.isPending
                ? {
                    rotate: [0, 5, -5, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              repeat: createSessionMutation.isPending ? Infinity : 0,
            }}
          >
            {createSessionMutation.isPending ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Initializing AI...</span>
              </div>
            ) : (
              "🤖 Start New Chat"
            )}
          </motion.button>

          <motion.button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl px-8 py-4 text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">🏠 Go to Home page</Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
