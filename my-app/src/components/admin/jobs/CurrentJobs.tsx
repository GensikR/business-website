'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/utils/firebase'; // Adjust path to your firebase config

interface Job {
  id: string;
  name: string;
  location: string;
  client: string;
  createdAt?: any;
}

const CurrentJobs = () =>
{
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() =>
  {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) =>
    {
      const jobsList: Job[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Job));

      setJobs(jobsList);
      setLoading(false);
    }, (err) =>
    {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
  {
    return (
      <div className="text-center text-gray-600 py-8">
        Loading jobs...
      </div>
    );
  }

  if (error)
  {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (jobs.length === 0)
  {
    return (
      <div className="text-center text-gray-600 py-8">
        No jobs found.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Current Jobs</h2>

      <ul className="space-y-3">
        {jobs.map(({ id, name, location, client }) => (
          <li
            key={id}
            className="p-4 bg-white rounded-xl shadow border border-blue-200"
          >
            <p className="font-semibold text-blue-700 text-sm truncate">{name}</p>
            <p className="text-gray-600 text-xs truncate">Location: {location}</p>
            <p className="text-gray-600 text-xs truncate">Client: {client}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentJobs;
