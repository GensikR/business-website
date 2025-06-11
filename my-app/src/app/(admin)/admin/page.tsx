"use client";
import React from "react";

const AdminPage = () => {
  return (
    <div>
      <div>
        <p>Coming Soon - Admin Dashboard</p>
      </div>
      <button
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
