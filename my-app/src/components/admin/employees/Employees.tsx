'use client';

import React, { useState } from 'react';
import { UserPlus, Clock, ArrowLeft } from 'lucide-react';

import AddEmployee from './AddEmployee';
import EmployeeHours from './EmployeeHours';

type SectionKey = 'addEmployee' | 'employeeHours';

const sections: Record<SectionKey, React.ReactNode> = {
  addEmployee: <AddEmployee />,
  employeeHours: <EmployeeHours />,
};

const options: { id: SectionKey; label: string; icon: React.ElementType }[] = [
  { id: 'addEmployee', label: 'Add Employee', icon: UserPlus },
  { id: 'employeeHours', label: 'Employee Hours', icon: Clock },
];

const Employees = () =>
{
  const [activeTab, setActiveTab] = useState<SectionKey | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-200 p-4 sm:p-6">
      <div className="max-w-sm mx-auto text-center space-y-6">
        {!activeTab && (
          <>
            <h1 className="text-xl font-bold text-blue-800">
              Employees Management
            </h1>
            <p className="text-gray-600 text-sm">Select an option below</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {options.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-white shadow border border-blue-200 hover:bg-blue-50 active:scale-95 transition text-xs font-medium text-blue-700"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab && (
          <div className="text-left max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab(null)}
              className="mb-4 flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="bg-white rounded-xl shadow p-4">
              {sections[activeTab]}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Employees;
