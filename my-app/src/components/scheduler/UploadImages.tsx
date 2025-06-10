import React from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react"; // Optional icon, can be removed

const UploadImages: React.FC<{
  imagePreviews: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ imagePreviews, handleImageUpload }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        <UploadCloud className="w-5 h-5 text-blue-500" />
        3. Upload Reference Images <span className="text-sm text-gray-500">(Optional, max 3)</span>
      </h2>

      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full cursor-pointer bg-gradient-to-br from-blue-50 to-white border-2 border-dashed border-blue-300 rounded-2xl p-6 hover:bg-blue-100 transition-colors duration-300"
      >
        <svg
          className="w-12 h-12 text-blue-400 mb-3"
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
        <p className="text-gray-700 font-medium">Click or drag to upload images</p>
        <p className="text-xs text-gray-500">Only JPG, PNG. Up to 3 images.</p>
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
        <div className="mt-6 grid grid-cols-3 gap-4">
          {imagePreviews.map((src, i) => (
            <div
              key={i}
              className="relative w-full aspect-square overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <Image
                src={src}
                alt={`preview-${i}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UploadImages;
