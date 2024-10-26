"use client";

import React, { useState, useEffect } from "react";
import {
  AdminLeftSidebar,
  ManageUsers,
  ManageDoctors,
  ManagePatients,
  ManageAppointments,
  ManageMedicalRecords,
  FinanceManagement,
  SystemSettings,
  ReportingAnalytics,
  ChangePassword,
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case "users":
        return <ManageUsers />;
      case "doctors":
        return <ManageDoctors />;
      case "patients":
        return <ManagePatients />;
      case "appointments":
        return <ManageAppointments />;
      case "medicalRecords":
        return <ManageMedicalRecords />;
      case "finance":
        return <FinanceManagement />;
      case "settings":
        return <SystemSettings />;
      case "changepass":
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <AdminLeftSidebar
          activeSection={activeSection}
          handleSectionChange={setActiveSection}
        />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-xl font-semibold">Welcome to Admin Dashboard</h1>
        </header>

        <main className="flex flex-col space-y-14">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
