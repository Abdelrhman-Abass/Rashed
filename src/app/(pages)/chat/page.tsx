"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { postServerRequest } from "@/utils/generalServerRequest";
import { showErrorToast } from "@/utils/toast";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { token } = useAuthStore();

  // Mutation to create a new chat session
  const createSessionMutation = useMutation({
    mutationFn: () => postServerRequest("/messages/session", { title: "New Chat" }),
    onSuccess: (response) => {
      if (response?.success) {
        const { sessionId } = response.data;
        router.push(`/chat/${sessionId}`);
      } else {
        showErrorToast("Failed to start a new chat session.");
      }
    },
    onError: () => {
      showErrorToast("An error occurred while starting a new chat session.");
    },
  });

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/auth/login");
  //   }
  // }, [token, router]);

  const handleStartChat = () => {
    createSessionMutation.mutate();
  };

  return (
    <div className="bg-[url('/assets/background.png')] bg-cover bg-center bg-no-repeat w-full h-screen relative overflow-hidden">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg max-w-sm w-full my-8">
          <h1 className="text-xl font-bold text-white mb-2">Welcome to ChatBot</h1>
          <p className="text-xs text-gray-300 mb-4">Start a new conversation with our AI!</p>
          <button
            onClick={handleStartChat}
            disabled={createSessionMutation.isPending}
            className={`bg-blue-500 text-white font-semibold rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-300 active:scale-95 text-sm ${
              createSessionMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {createSessionMutation.isPending ? "Starting Chat..." : "Start Chat"}
          </button>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-300">
              Not logged in?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}