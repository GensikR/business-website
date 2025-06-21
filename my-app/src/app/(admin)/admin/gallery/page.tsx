'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/utils/firebase'

export default function GalleryAdmin() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      setFiles(selected);
      setPreviews(Array.from(selected).map(file => URL.createObjectURL(file)));
    }
  };

  const handleUpload = async () => {
    if (!files) return;
    setUploading(true);

    const uploads = Array.from(files).map(async (file) => {
      const fileRef = ref(storage, `gallery/${file.name}`);
      const snapshot = await uploadBytesResumable(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'gallery'), {
        url,
        uploadedAt: serverTimestamp(),
      });
    });

    await Promise.all(uploads);
    setUploading(false);
    setFiles(null);
    setPreviews([]);
    alert('Upload complete!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Gallery Admin Panel</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block mb-4"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Preview ${i}`}
              className="w-full h-40 object-cover rounded shadow"
            />
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!files || uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        {uploading ? 'Uploading...' : 'Upload to Gallery'}
      </button>
    </div>
  );
}
