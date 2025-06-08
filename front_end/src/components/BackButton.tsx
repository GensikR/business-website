// src/components/BackButton.tsx
"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg text-lg font-semibold transition"
    >
      Back to Services
    </button>
  );
}
