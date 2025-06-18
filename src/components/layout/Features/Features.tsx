"use client";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

// Individual icon imports
import { FaBrain } from "react-icons/fa";
import { BsStopwatchFill } from "react-icons/bs";
import { MdOutlineFactCheck } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";

const Features = () => {
  const features = [
    {
      icon: <FaBrain size={32} className="text-blue-400" />,
      title: "AI-Powered Detection",
      description:
        "Our system uses advanced machine learning models to detect fake news with high precision.",
    },
    {
      icon: <BsStopwatchFill size={32} className="text-green-400" />,
      title: "Real-Time Analysis",
      description:
        "Instantly analyze any article or post in real-time for authenticity and reliability.",
    },
    {
      icon: <MdOutlineFactCheck size={32} className="text-purple-400" />,
      title: "High Accuracy",
      description:
        "Trained on thousands of verified datasets to ensure accurate and trustworthy results.",
    },
    {
      icon: <GiNewspaper size={32} className="text-red-400" />,
      title: "Source Verification",
      description:
        "Automatically verifies the credibility of news sources and highlights potentially unreliable ones.",
    },
  ];

  return (
    <section id="features" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-1 bg-white"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={800}
              glareEnable={true}
              glareMaxOpacity={0.2}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col space-y-4">
                <div>{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
