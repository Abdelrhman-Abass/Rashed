"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section id="about" className=" text-white min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Our AI Fake News Detector
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We are committed to helping users identify misinformation and
            promote media literacy through advanced AI technology.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To empower individuals with tools that help them verify
              information quickly and accurately, reducing the spread of fake
              news online.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-300">
              Our AI model analyzes content using natural language processing
              and fact-checking databases to provide real-time feedback.
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Download Our App Today</h2>
          <p className="text-lg text-white/90 mb-6">
            Stay informed and protect yourself from misinformation — available
            now on iOS and Android.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#"
              className="bg-black/30 hover:bg-black/50 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Download The App
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
