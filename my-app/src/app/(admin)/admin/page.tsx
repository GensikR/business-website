"use client";
import React from "react";
import { requestNotificationPermission } from "@/lib/utils/request_fms_permission";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-white">
      <p className="text-xl font-semibold">Coming Soon - Admin Dashboard</p>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        onClick={requestNotificationPermission}
      >
        Enable Notifications
      </button>

      <button
        className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition"
        onClick={async () => {
          try {
            const res = await fetch("/api/notify/appointment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: "Test Notification",
                body: "This is a test notification from admin page",
              }),
            });
            const data = await res.json();
            alert(`Response: ${JSON.stringify(data)}`);
          } catch (error) {
            alert("Error calling API");
          }
        }}
      >
        Test Notify Appointment API
      </button>
    </div>
  );
};

export default AdminPage;
