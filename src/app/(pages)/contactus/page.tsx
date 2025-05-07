"use client";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/assets/bg.jpg')] bg-cover bg-center bg-no-repeat px-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#111827]/70 p-8 rounded-xl shadow-xl backdrop-blur-md"
      >
        <h1 className="text-4xl font-bold mb-2 text-white text-center">
          Contact Us
        </h1>
        <p className="mb-8 text-lg text-gray-200 text-center">
          Any question or remarks? Just write us a message!
        </p>
        {/* Name Fields */}
        <div className="flex gap-4 mb-4">
          {["firstName", "lastName"].map((field) => (
            <div className="flex-1" key={field}>
              <label className="block text-sm mb-1 capitalize">
                {field.replace("Name", " Name")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field as keyof ContactFormData]}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-[#1F2937] text-white border ${
                  errors[field as keyof ContactFormData]
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              {errors[field as keyof ContactFormData] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[field as keyof ContactFormData]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Email & Phone */}
        <div className="flex gap-4 mb-4">
          {["email", "phoneNumber"].map((field) => (
            <div className="flex-1" key={field}>
              <label className="block text-sm mb-1 capitalize">
                {field === "phoneNumber" ? "Phone Number" : "Email"}
              </label>
              <input
                type={field === "email" ? "email" : "tel"}
                name={field}
                value={formData[field as keyof ContactFormData]}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-[#1F2937] text-white border ${
                  errors[field as keyof ContactFormData]
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              {errors[field as keyof ContactFormData] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[field as keyof ContactFormData]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Select Subject?</label>
          <div className="flex flex-wrap gap-6">
            {[
              "General Inquiry",
              "Technical Support",
              "Sales Inquiry",
              "Other",
            ].map((subj) => (
              <label key={subj} className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="subject"
                  value={subj}
                  checked={formData.subject === subj}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span>{subj}</span>
              </label>
            ))}
          </div>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-2 rounded-md bg-[#1F2937] text-white border ${
              errors.message ? "border-red-500" : "border-gray-600"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
        >
          Send Message
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
