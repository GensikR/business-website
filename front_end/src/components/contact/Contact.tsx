"use client";

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Thank you for reaching out! We'll be in touch soon.");
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Decorative Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f680_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Get a Free Estimate
          </h2>
          <p className="text-lg text-gray-600">
            Tell us about your remodeling project and we'll send a detailed, no‑obligation quote.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Service (full width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="service"
              className="block text-gray-700 font-medium mb-2"
            >
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Service</option>
              <option value="bathroom-remodeling">Bathroom Remodeling</option>
              <option value="kitchen-remodeling">Kitchen Remodeling</option>
              <option value="bedroom-renovation">Bedroom Renovation</option>
              <option value="livingroom-makeover">Living Room Makeover</option>
              <option value="patio-upgrade">Patio Upgrade</option>
              <option value="custom-project">Custom Project</option>
            </select>
          </div>

          {/* Budget (full width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="budget"
              className="block text-gray-700 font-medium mb-2"
            >
              Estimated Budget
            </label>
            <input
              id="budget"
              name="budget"
              type="text"
              placeholder="$5,000 - $20,000"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Subject (full width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-medium mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Message (full width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>

          {/* Submit Button (full width) */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
            >
              <span>Send Message</span>
              <FaArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
