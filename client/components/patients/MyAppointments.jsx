"use client";

import React, { useState } from 'react';
import { FaCalendarAlt, FaRegEdit, FaTrash, FaStar } from 'react-icons/fa';

const AppointmentManagement = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-09-30',
      time: '10:00 AM',
      doctor: 'Dr. John Doe',
      status: 'Upcoming',
      feedbackGiven: false,
      rating: 0,
      review: '',
    },
    {
      id: 2,
      date: '2024-10-05',
      time: '2:00 PM',
      doctor: 'Dr. Jane Smith',
      status: 'Upcoming',
      feedbackGiven: false,
      rating: 0,
      review: '',
    },
    {
      id: 3,
      date: '2024-08-20',
      time: '1:00 PM',
      doctor: 'Dr. John Doe',
      status: 'Completed',
      feedbackGiven: false,
      rating: 0,
      review: '',
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  const handleOpenFeedback = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleFeedbackSubmit = (id, rating, review) => {
    setAppointments(appointments.map(appt => {
      if (appt.id === id) {
        return { ...appt, feedbackGiven: true, rating, review };
      }
      return appt;
    }));
    setSelectedAppointment(null);
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
                {!appt.feedbackGiven ? (
                  <button
                    onClick={() => handleOpenFeedback(appt)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Provide Feedback
                  </button>
                ) : (
                  <div>
                    <p className="text-yellow-500">Rating: {appt.rating}/5</p>
                    <p className="text-gray-600">Review: {appt.review}</p>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* Feedback Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Provide Feedback for {selectedAppointment.doctor}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating:</label>
              <select
                className="border p-2 w-full"
                onChange={(e) => setSelectedAppointment({ ...selectedAppointment, rating: e.target.value })}
                value={selectedAppointment.rating}
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>{rate} Stars</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Review:</label>
              <textarea
                className="border p-2 w-full"
                rows="3"
                onChange={(e) => setSelectedAppointment({ ...selectedAppointment, review: e.target.value })}
                value={selectedAppointment.review}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleFeedbackSubmit(selectedAppointment.id, selectedAppointment.rating, selectedAppointment.review)}
                className="bg-primary text-white py-2 px-4 rounded-md shadow-lg hover:bg-secondary transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
