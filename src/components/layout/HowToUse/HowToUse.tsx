"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

import {
  FaRegLightbulb,
  FaPaste,
  FaRobot,
  FaCheckCircle,
  FaShare,
} from "react-icons/fa";

const HowToUse = () => {
  return (
    <section id="how-to-use" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Use</h1>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-1 bg-white"></div>
          </div>
        </motion.div>

        <VerticalTimeline lineColor="#374151">
          {/* Step 1 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#1F2937", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1F2937" }}
            date="Step 1"
            iconStyle={{ background: "#2563EB", color: "#fff" }}
            icon={<FaRegLightbulb />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-semibold">
              Find a News Article
            </h3>
            <p className="mt-2 text-gray-300">
              Locate the article or post you&apos;d like to verify. This could
              be from social media, a website, or any online source.
            </p>
          </VerticalTimelineElement>

          {/* Step 2 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#1F2937", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1F2937" }}
            date="Step 2"
            iconStyle={{ background: "#10B981", color: "#fff" }}
            icon={<FaPaste />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-semibold">
              Copy the Text
            </h3>
            <p className="mt-2 text-gray-300">
              Copy the headline or body of the article into your clipboard. Make
              sure to include enough context for accurate analysis.
            </p>
          </VerticalTimelineElement>

          {/* Step 3 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#1F2937", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1F2937" }}
            date="Step 3"
            iconStyle={{ background: "#8B5CF6", color: "#fff" }}
            icon={<FaRobot />}
          >
            <h3 className="vertical-time-line-element-title text-xl font-semibold">
              Paste & Analyze
            </h3>
            <p className="mt-2 text-gray-300">
              Paste the copied text into our AI detection tool and click
              &apos;Analyze&apos;. The system will process the input using
              advanced NLP models.
            </p>
          </VerticalTimelineElement>

          {/* Step 4 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#1F2937", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1F2937" }}
            date="Step 4"
            iconStyle={{ background: "#F59E0B", color: "#fff" }}
            icon={<FaCheckCircle />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-semibold">
              Review Results
            </h3>
            <p className="mt-2 text-gray-300">
              Get a detailed breakdown including reliability score, flagged
              claims, and source verification results.
            </p>
          </VerticalTimelineElement>

          {/* Step 5 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#1F2937", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1F2937" }}
            date="Step 5"
            iconStyle={{ background: "#EF4444", color: "#fff" }}
            icon={<FaShare />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-semibold">
              Share or Save
            </h3>
            <p className="mt-2 text-gray-300">
              Export or share the result with others to spread awareness about
              misinformation and help build a more informed community.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default HowToUse;
