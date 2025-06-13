"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "../ModelView/ModelView";

function Controls() {
  const { invalidate } = useThree();
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
      onChange={() => invalidate()}
    />
  );
}

export default function Home() {
  return (
    <main className="text-white min-h-screen">
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }} frameloop="demand">
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={0.8} />
            <Suspense fallback={null}>
              <Model scale={[2, 2, 2]} />
            </Suspense>
            <Controls />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-blue-500">Rashed</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300 mb-8">
            Your AI-powered fake news detector. See through the noise.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"

          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
