"use client";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Framer Motion
import { motion } from "framer-motion";

// Zod schema
const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
  subject: z.string().min(1, "Please select a subject"),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    subject: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = ContactSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors as Partial<ContactFormData>);
      return;
    }

    try {
      const res = await axios.post("/api/contact", formData);
      if (res.data.success) {
        toast.success("Message sent successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
          subject: "",
        });
        setErrors({});
      } else {
        toast.error("Failed to send your message.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center px-4 py-16 md:py-24"
    >
      {/* Animated Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10"
      >
        <h1 className="text-4xl font-extrabold mb-2 text-white text-center tracking-tight">
          Contact Us
        </h1>
        <p className="mb-8 text-lg text-gray-200 text-center">
          Any question or remarks? Just write us a message!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="flex flex-wrap gap-4">
            {["firstName", "lastName"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex-1 min-w-[45%]"
              >
                <label className="block text-sm mb-1 capitalize text-gray-300">
                  {field.replace("Name", " Name")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof ContactFormData]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-[#1F2937]/80 text-white placeholder:text-gray-400 border ${
                    errors[field as keyof ContactFormData]
                      ? "border-red-500"
                      : "border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[field as keyof ContactFormData] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field as keyof ContactFormData]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Email & Phone */}
          <div className="flex flex-wrap gap-4">
            {["email", "phoneNumber"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex-1 min-w-[45%]"
              >
                <label className="block text-sm mb-1 capitalize text-gray-300">
                  {field === "phoneNumber" ? "Phone Number" : "Email"}
                </label>
                <input
                  type={field === "email" ? "email" : "tel"}
                  name={field}
                  value={formData[field as keyof ContactFormData]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-[#1F2937]/80 text-white placeholder:text-gray-400 border ${
                    errors[field as keyof ContactFormData]
                      ? "border-red-500"
                      : "border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[field as keyof ContactFormData] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field as keyof ContactFormData]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Subject Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm mb-3 text-gray-300">
              Select Subject
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                "General Inquiry",
                "Technical Support",
                "Sales Inquiry",
                "Other",
              ].map((subj) => (
                <label
                  key={subj}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="subject"
                    value={subj}
                    checked={formData.subject === subj}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                    {subj}
                  </span>
                </label>
              ))}
            </div>
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm mb-1 text-gray-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg bg-[#1F2937]/80 text-white placeholder:text-gray-400 border ${
                errors.message ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold shadow-md transform transition-all duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      <ToastContainer
        toastStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
      />
    </section>
  );
}
