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

    const uploadTasks = files.map((file, idx) => {
      return new Promise<void>((resolve, reject) => {
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

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
          (error) => {
            console.error('Upload failed:', error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              await addDoc(collection(db, 'gallery'), {
                url,
                uploadedAt: serverTimestamp(),
              });
              resolve();
            } catch (err) {
              console.error('Firestore save error:', err);
              reject(err);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadTasks);
      alert('✅ Upload complete!');
    } catch (error) {
      alert('⚠️ Upload failed. Check console for details.');
    } finally {
      setUploading(false);
      setFiles([]);
      setProgress([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center">🖼️ Gallery Admin Panel</h2>

      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
        className="cursor-pointer w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl py-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition"
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
          className="h-10 w-10 mb-3 text-blue-400"
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
        <p className="text-center text-sm font-medium text-gray-600">
          Click or drag & drop to upload images
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG — up to 10 files</p>
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-xl border border-gray-200 relative group"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-gray-700 font-semibold">
                {file.name}
              </div>
              {uploading && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500"
                  style={{ width: `${progress[idx]}%` }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-medium shadow"
      >
        {uploading ? 'Uploading...' : 'Upload to Gallery'}
      </button>
    </div>
  );
}
