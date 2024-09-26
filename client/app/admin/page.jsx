"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ManageDoctors, ManagePatients, ManageAppointments, ManageMedicalRecords } from '../../components';

// Fetch appointments from Django backend API
const fetchAppointments = async () => {
  const response = await fetch("/api/appointments/recent");
  const data = await response.json();
  return data;
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('appointments');
  const [appointments, setAppointments] = useState({
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
  });

  useEffect(() => {
    // Fetch recent appointment list on component mount
    const getAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };
    getAppointments();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'doctors' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('doctors')}
            >
              Manage Doctors
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'patients' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('patients')}
            >
              Manage Patients
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'appointments' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('appointments')}
            >
              Appointments
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'medicalRecords' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('medicalRecords')}
            >
              Medical Records
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center py-6">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-xl font-semibold">Admin Dashboard</p>
        </header>

        <main className="flex flex-col space-y-14">
          {/* Dashboard Content */}
          {activeSection === 'doctors' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Doctors</h2>
              <ManageDoctors />
            </div>
          )}

          {activeSection === 'patients' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Patients</h2>
              <ManagePatients />
            </div>
          )}

          {activeSection === 'appointments' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Appointments</h2>
              <ManageAppointments appointments={appointments} />
            </div>
          )}

          {activeSection === 'medicalRecords' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Medical Records</h2>
              <ManageMedicalRecords />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
