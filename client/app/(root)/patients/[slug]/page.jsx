"use client";

import React, { useState, useEffect } from 'react';
import { PetLeftSidebar, MyProfile, MyAppointments, MedicalRecordsAccess, HealthTracking, PaymentHistory } from '../../../../components';

// Dummy patient and appointment data
const dummyPatients = [
  { id: 1, name: "Alice Smith", age: 30, lastVisit: "2024-09-20", history: "Heart check-up" },
  { id: 2, name: "Bob Johnson", age: 45, lastVisit: "2024-09-18", history: "Routine check-up" },
];

const dummyAppointments = [
  { id: 1, date: "2024-09-30", time: "10:00 AM", patient: "Alice Smith" },
  { id: 2, date: "2024-10-01", time: "2:00 PM", patient: "Bob Johnson" },
];

// Fetch patients and appointments (simulated for now)
const fetchPatientsAndAppointments = () => {
  return {
    patients: dummyPatients,
    appointments: dummyAppointments,
  };
};

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState('myProfile');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({
    name: "Dr. John Doe",
    specialization: "Cardiology",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "johndoe@healthcare.com",
    },
  });

  useEffect(() => {
    const { patients, appointments } = fetchPatientsAndAppointments();
    setPatients(patients);
    setAppointments(appointments);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Patient Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'myProfile' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('myProfile')}
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'myAppointments' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('myAppointments')}
            >
              My Appointments
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'medicalRecordsAccess' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('medicalRecordsAccess')}
            >
              Medical Records Access
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'healthTracking' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('healthTracking')}
            >
              Health Tracking
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'paymentHistory' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('paymentHistory')}
            >
              Payment History
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">

        <main className="flex flex-col space-y-14">
          {/* Render Section Content */}
          {activeSection === 'myProfile' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">My Profile</h2>
              <MyProfile doctor={doctor} />
            </div>
          )}
          {activeSection === 'myAppointments' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">My Appointments</h2>
              <MyAppointments appointments={appointments} />
            </div>
          )}
          {activeSection === 'medicalRecordsAccess' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Medical Records Access</h2>
              <MedicalRecordsAccess patients={patients} />
            </div>
          )}
          {activeSection === 'healthTracking' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Health Tracking</h2>
              <HealthTracking />
            </div>
          )}
          {activeSection === 'paymentHistory' && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Payment History</h2>
              <PaymentHistory />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
