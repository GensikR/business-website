"use client";

import React from "react";

const GlobalChatButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => alert("Chat feature coming soon!")}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
      >
        💬 Chat
      </button>
    </div>
  );
};

export default GlobalChatButton;