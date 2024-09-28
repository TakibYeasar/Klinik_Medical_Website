"use client";

import { useEffect, useState } from 'react';
import {
  PetLeftSidebar,
  MyProfile,
  MyAppointments,
  MedicalRecordsAccess,
  HealthTracking,
  PaymentHistory,
} from '../../../../components';

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState('myProfile');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [docInfo, setDocInfo] = useState(null);

  // Dummy data
  const dummyPatients = [
    { id: 1, name: "Alice Smith", age: 30, lastVisit: "2024-09-20", history: "Heart check-up" },
    { id: 2, name: "Bob Johnson", age: 45, lastVisit: "2024-09-18", history: "Routine check-up" },
  ];

  const dummyAppointments = [
    { id: 1, date: "2024-09-30", time: "10:00 AM", patient: "Alice Smith" },
    { id: 2, date: "2024-10-01", time: "2:00 PM", patient: "Bob Johnson" },
  ];

  useEffect(() => {
    // Simulate fetching data
    setPatients(dummyPatients);
    setAppointments(dummyAppointments);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'myProfile':
        return <MyProfile />;
      case 'myAppointments':
        return <MyAppointments />;
      case 'medicalRecordsAccess':
        return <MedicalRecordsAccess />;
      case 'healthTracking':
        return <HealthTracking />;
      case 'paymentHistory':
        return <PaymentHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <PetLeftSidebar selectedItem={activeSection} onSelect={setActiveSection} />

      {/* Main Content */}
      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-xl font-semibold">Welcome, {docInfo?.name || 'Patient'}</h1>
        </header>

        <main className="flex flex-col space-y-14">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
