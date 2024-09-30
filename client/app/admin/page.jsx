"use client";

import React, { useState, useEffect } from 'react';
import { ManageUsers, ManageDoctors, ManagePatients, ManageAppointments, ManageMedicalRecords, FinanceManagement, ReportingAnalytics, SystemSettings } from '../../components';

// Fetch appointments from Django backend API
const fetchAppointments = async () => {
  const response = await fetch("/api/appointments/recent");
  const data = await response.json();
  return data;
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('');
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
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'users' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('users')}
            >
              Manage Users
            </button>
          </li>
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
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'medicalRecords' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('medicalRecords')}
            >
              Medical Records
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'finance' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('finance')}
            >
              Finance Management
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'reporting' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('reporting')}
            >
              Reporting & Analytics
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'settings' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('settings')}
            >
              System Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center py-6">
          <p className="text-xl font-semibold">Admin Dashboard</p>
        </header>

        <main className="flex flex-col space-y-14">
          {/* Dashboard Content */}

          {activeSection === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Users</h2>
              <ManageUsers />
            </div>
          )}

          {activeSection === 'doctors' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Doctors</h2>
              <ManageDoctors />
            </div>
          )}

          {activeSection === 'medicalRecords' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Medical Records</h2>
              <ManageMedicalRecords />
            </div>
          )}

          {activeSection === 'finance' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Finance Management</h2>
              <FinanceManagement />
            </div>
          )}

          {activeSection === 'reporting' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Reporting & Analytics</h2>
              <ReportingAnalytics />
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">System Settings</h2>
              <SystemSettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
