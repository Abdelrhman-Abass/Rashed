"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_STARS = 150;
const NUM_PARTICLES = 30;

const StarryBackgroundMotion: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Only render dynamic parts after mount (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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

      {/* Render stars and particles only after mounted */}
      {mounted && (
        <>
          {/* Stars */}
          {Array.from({ length: NUM_STARS }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={`star-${i}`}
                className="bg-white rounded-full"
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: Math.random() * 0.8 + 0.2,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
              />
            );
          })}

          {/* Floating Particles */}
          {Array.from({ length: NUM_PARTICLES }).map((_, i) => {
            const x = Math.random() * 100;
            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 5;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                initial={{ y: "100%", opacity: 1 }}
                animate={{ y: "-10vh", opacity: 0 }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
                style={{
                  left: `${x}%`,
                }}
              />
            );
          })}

          {/* Shooting Stars */}
          {Array.from({ length: 3 }).map((_, i) => {
            const delay = Math.random() * 10;

            return (
              <motion.div
                key={`shooting-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]"
                initial={{ x: "-100vw", y: `${Math.random() * 100}%` }}
                animate={{ x: "100vw" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{ transform: "translateX(-48px)" }}
                />
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default StarryBackgroundMotion;
