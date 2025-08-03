'use client';
import React from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

const UploadImages: React.FC<{
  imagePreviews: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ imagePreviews, handleImageUpload }) => {
  return (
    <section>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
        <UploadCloud className="w-5 h-5 text-blue-500" />
        3. Upload Reference Images{" "}
        <span className="text-sm text-gray-500 font-normal">(Optional, max 3)</span>
      </h2>

      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full cursor-pointer bg-gradient-to-br from-blue-50 to-white border-2 border-dashed border-blue-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-blue-100 transition-colors duration-300"
      >
        <svg
          className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-2 sm:mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 0 1 4-4h1m2-4l3-3 3 3m0 0v12m-6 0V9m0 12h6"
          />
        </svg>
        <p className="text-gray-700 text-sm sm:text-base font-medium">Click or drag to upload images</p>
        <p className="text-xs text-gray-500 mt-1">Only JPG, PNG. Up to 3 images.</p>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {imagePreviews.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {imagePreviews.map((src, i) => (
            <div
              key={i}
              className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <Image
                src={src}
                alt={`preview-${i}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UploadImages;
