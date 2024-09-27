"use client"

import React, { useState } from 'react';
import { FaCalendarAlt, FaRegEdit, FaTrash } from 'react-icons/fa';

const AppointmentManagement = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-09-30',
      time: '10:00 AM',
      doctor: 'Dr. John Doe',
      status: 'Upcoming',
    },
    {
      id: 2,
      date: '2024-10-05',
      time: '2:00 PM',
      doctor: 'Dr. Jane Smith',
      status: 'Upcoming',
    },
    {
      id: 3,
      date: '2024-08-20',
      time: '1:00 PM',
      doctor: 'Dr. John Doe',
      status: 'Completed',
    },
  ]);

  // Handler functions for booking, rescheduling, and canceling appointments
  const handleBookAppointment = () => {
    // Logic for booking an appointment
    alert('Book Appointment functionality not implemented.');
  };

  const handleRescheduleAppointment = (id) => {
    // Logic for rescheduling an appointment
    alert(`Reschedule Appointment ID: ${id} functionality not implemented.`);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
    alert(`Appointment ID: ${id} has been canceled.`);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Appointment Management</h2>

      {/* Appointment Booking Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Book a New Appointment</h3>
        <button
          onClick={handleBookAppointment}
          className="bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
        >
          Book Appointment
        </button>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
        <ul className="space-y-4">
          {appointments
            .filter((appt) => appt.status === 'Upcoming')
            .map((appt) => (
              <li key={appt.id} className="flex justify-between items-center p-4 border-b">
                <div>
                  <p className="font-medium text-gray-800">{`${appt.date} at ${appt.time}`}</p>
                  <p className="text-gray-600">With: {appt.doctor}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRescheduleAppointment(appt.id)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(appt.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Appointment History Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment History</h3>
        <ul className="space-y-4">
          {appointments
            .filter((appt) => appt.status === 'Completed')
            .map((appt) => (
              <li key={appt.id} className="p-4 border-b">
                <p className="font-medium text-gray-800">{`${appt.date} at ${appt.time}`}</p>
                <p className="text-gray-600">With: {appt.doctor}</p>
              </li>
            ))}
        </ul>
      </div>

      {/* Reminders Section */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Reminder Preferences</h3>
        <form>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="email-reminder"
              className="mr-2"
            />
            <label htmlFor="email-reminder" className="text-gray-700">Receive reminders via Email</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sms-reminder"
              className="mr-2"
            />
            <label htmlFor="sms-reminder" className="text-gray-700">Receive reminders via SMS</label>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md shadow-lg hover:bg-secondary transition duration-300"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentManagement;
