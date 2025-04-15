"use client";

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    service: "",
    budget: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your form submission logic here (e.g., sending data to an API)
    console.log("Form Data:", formData);
    alert("Message sent (implementation pending)!");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Expertise</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          We specialize in delivering tailored solutions to address your business needs across these
          key areas:
        </p>

        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
                Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Service</option>
                <option value="product-consulting">Product Consulting</option>
                <option value="legacy-migration">Legacy System Migration</option>
                <option value="automated-teams">Automated Teams</option>
                <option value="engineering-consulting">Engineering Consulting</option>
                <option value="erp-implementation">ERP Implementation</option>
                <option value="cybersecurity-services">Cybersecurity Services</option>
                {/* Add more service options as needed */}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">
                Budget
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Subject (Full Width) */}
            <div className="col-span-full">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Message (Full Width) */}
            <div className="col-span-full">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Send Message Button (Full Width) */}
            <div className="col-span-full">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md shadow-md inline-flex items-center space-x-2"
              >
                <span>Send Message</span>
                <FaArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;