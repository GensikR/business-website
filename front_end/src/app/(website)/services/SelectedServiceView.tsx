import React from "react";

const ServiceView: React.FC<{ serviceName: string }> = ({ serviceName }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">{serviceName}</h1>
    </div>
  );
}

export default ServiceView;