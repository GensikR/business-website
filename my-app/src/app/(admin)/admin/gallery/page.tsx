'use client';

import { useRef, useState } from 'react';
import { db, storage } from '@/lib/utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function GalleryAdmin() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (fileList: FileList | File[]) => {
    const newFiles = Array.from(fileList);
    setFiles(newFiles);
    setProgress(new Array(newFiles.length).fill(0));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => inputRef.current?.click();

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    const uploadTasks = files.map(async (file, idx) => {
      const storageRef = ref(storage, `gallery/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress((prev) => {
              const updated = [...prev];
              updated[idx] = percent;
              return updated;
            });
          },
          reject,
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, 'gallery'), {
              url,
              uploadedAt: serverTimestamp(),
            });
            resolve();
          }
        );
      });
    });

    await Promise.all(uploadTasks);

    alert('✅ Upload complete!');
    setFiles([]);
    setProgress([]);
    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">🖼️ Gallery Admin Panel</h2>

      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
        className="cursor-pointer w-full border-2 border-dashed border-white/20 hover:border-pink-500 rounded-xl py-12 flex flex-col items-center justify-center text-white/70 hover:text-white transition"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mb-3 text-pink-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m5 4v8m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        <p className="text-center text-sm font-medium">
          Click or drag & drop to upload images
        </p>
        <p className="text-xs text-white/40 mt-1">PNG, JPG, JPEG — up to 10 files</p>
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-xl border border-white/10 relative group"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-semibold">
                {file.name}
              </div>
              {uploading && (
                <div className="absolute bottom-0 left-0 h-1 bg-pink-500" style={{ width: `${progress[idx]}%` }} />
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="mt-6 px-5 py-2 bg-pink-600 hover:bg-pink-700 transition rounded-xl text-white font-semibold shadow"
      >
        {uploading ? 'Uploading...' : 'Upload to Gallery'}
      </button>
    </div>
  );
}
