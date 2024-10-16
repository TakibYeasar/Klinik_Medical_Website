"use client";

import React, { useState, useEffect } from "react";
import {
  ManageUsers,
  ManageDoctors,
  ManagePatients,
  ManageAppointments,
  ManageMedicalRecords,
  FinanceManagement,
  ReportingAnalytics,
  SystemSettings,
} from "../../components";

// Fetch appointments from Django backend API
const fetchAppointments = async () => {
  const response = await fetch("/api/appointments/recent");
  const data = await response.json();
  return data;
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("reporting");
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <ul className="space-y-4">
          {[
            { label: "Manage Users", section: "users" },
            { label: "Manage Doctors", section: "doctors" },
            { label: "Medical Records", section: "medicalRecords" },
            { label: "Finance Management", section: "finance" },
            { label: "System Settings", section: "settings" },
          ].map(({ label, section }) => (
            <li key={section}>
              <button
                className={`w-full text-left p-2 rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 ${activeSection === section ? "bg-gray-600" : ""
                  }`}
                onClick={() => handleSectionChange(section)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 bg-gray-100 p-5">
        <header className="mb-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>

        <section className="space-y-10">

          {activeSection === "reporting" && (
            <div>
              <ReportingAnalytics />
            </div>
          )}

          {activeSection === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Users</h2>
              <ManageUsers />
            </div>
          )}

          {activeSection === "doctors" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Doctors</h2>
              <ManageDoctors />
            </div>
          )}

          {activeSection === "medicalRecords" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Manage Medical Records</h2>
              <ManageMedicalRecords />
            </div>
          )}

          {activeSection === "finance" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Finance Management</h2>
              <FinanceManagement />
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">System Settings</h2>
              <SystemSettings />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
