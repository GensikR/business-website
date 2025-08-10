'use client';

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/utils/firebase'; // Adjust path to your firebase config

const AddEmployee = () =>
{
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) =>
  {
    e.preventDefault();

    if (!name.trim() || !phone.trim())
    {
      setMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try
    {
      // Add new employee doc to Firestore "employees" collection
      await addDoc(collection(db, 'employees'), {
        name: name.trim(),
        phone: phone.trim(),
        description: description.trim() || null,
        createdAt: serverTimestamp(),
      });

      setMessage('Employee added successfully!');
      setName('');
      setPhone('');
      setDescription('');
    }
    catch (error)
    {
      console.error('Error adding employee:', error);
      setMessage('Failed to add employee. Please try again.');
    }
    finally
    {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full name"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. +1 555 123 4567"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Role or notes about the employee"
            rows={3}
          />
        </div>

        {message && (
          <p
            className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded-md text-white font-semibold
            ${submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            transition`}
        >
          {submitting ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
