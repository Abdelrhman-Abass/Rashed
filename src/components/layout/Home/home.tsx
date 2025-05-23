"use client";
import React from "react";
import { ModelViewer } from "@/components/layout/ModelView/ModelView";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section with Interactive 3D Model */}
      <section className="w-full h-[80vh] md:h-screen relative overflow-hidden flex items-center justify-center">
        {/* 3D Model Background */}
        <div className="absolute inset-0 z-0">
          <ModelViewer glbPath="/Models/humanoid_robot_ai/scene.gltf" />
        </div>

        {/* Centered Content */}
        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to Rashed
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Your AI-powered fake news detector.
          </p>
          <Link
            href="#features"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
