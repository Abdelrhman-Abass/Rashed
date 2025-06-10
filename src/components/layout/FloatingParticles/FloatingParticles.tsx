"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  // Run only on client after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing on server or before mount

  return (
    <>
      {[...Array(30)].map((_, i) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{
              x: x,
              y: y,
            }}
            animate={{
              y: [y, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        );
      })}
    </>
  );
}
