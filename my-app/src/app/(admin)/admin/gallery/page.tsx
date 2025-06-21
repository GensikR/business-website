'use client';

import { useEffect, useRef, useState } from 'react';
import { db, storage } from '@/lib/utils/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { all_services } from '@/lib/utils/getService';

const CATEGORIES = all_services.map(service => service.title).concat('Other');

export default function GalleryAdmin() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    { id: string; url: string; path: string; category?: string }[]
  >([]);

  const fetchGallery = async () => {
    const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      url: docSnap.data().url,
      path: docSnap.data().path,
      category: docSnap.data().category,
    }));
    setUploadedImages(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

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

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    const uploadTasks = files.map((file, idx) => {
      return new Promise<void>((resolve, reject) => {
        const uniquePath = `gallery/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, uniquePath);
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
                path: uniquePath,
                uploadedAt: serverTimestamp(),
                category: 'All',
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
      await fetchGallery();
    } catch (error) {
      alert('⚠️ Upload failed. Check console for details.');
    } finally {
      setUploading(false);
      setFiles([]);
      setProgress([]);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    const confirm = window.confirm('Are you sure you want to delete this image?');
    if (!confirm) return;

    try {
      await deleteObject(ref(storage, path));
      await deleteDoc(doc(db, 'gallery', id));
      setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error('❌ Failed to delete image:', err);
      alert('Failed to delete image. Check console for details.');
    }
  };

  const updateCategory = async (id: string, newCategory: string) => {
    try {
      await updateDoc(doc(db, 'gallery', id), { category: newCategory });
      setUploadedImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, category: newCategory } : img))
      );
    } catch (err) {
      console.error('❌ Failed to update category:', err);
      alert('Failed to update category. Check console for details.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center">🖼️ Gallery Admin Panel</h2>

      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl py-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block mb-3"
        />
        <p className="text-center text-sm font-medium text-gray-600">
          Select or drag & drop images
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

      {uploadedImages.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">📁 Uploaded Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {uploadedImages.map((img) => (
              <div key={img.id} className="relative border rounded-lg overflow-hidden group">
                <img src={img.url} alt="Uploaded" className="w-full h-48 object-cover" />
                <button
                  onClick={() => handleDelete(img.id, img.path)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded shadow">
                  <select
                    value={img.category || 'All'}
                    onChange={(e) => updateCategory(img.id, e.target.value)}
                    className="text-xs text-gray-700 bg-white border border-gray-300 rounded"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
