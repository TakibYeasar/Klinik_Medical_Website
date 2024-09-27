"use client";

import React, { useState, useEffect } from 'react';

// Dummy data for appointments
const dummyAppointments = [
    { id: 1, patientName: 'John Doe', date: '2024-09-30', time: '10:30 AM', status: 'Pending', doctor: 'Dr. Smith', telemedicineAvailable: true },
    { id: 2, patientName: 'Jane Doe', date: '2024-09-29', time: '11:00 AM', status: 'Scheduled', doctor: 'Dr. Adams', telemedicineAvailable: false },
    { id: 3, patientName: 'Michael Johnson', date: '2024-09-28', time: '12:00 PM', status: 'Cancelled', doctor: 'Dr. Brown', telemedicineAvailable: true },
];

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Set dummy data
        setAppointments(dummyAppointments);
    }, []);

    const handleApproveAppointment = (id) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: 'Scheduled' } : appointment
        ));
    };

    const handleToggleTelemedicine = (id) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, telemedicineAvailable: !appointment.telemedicineAvailable } : appointment
        ));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Appointments</h2>

            {/* Appointment Requests Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Appointment Requests</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Patient</th>
                            <th className="px-4 py-2 text-left">Doctor</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Time</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Telemedicine</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id} className="border-b">
                                <td className="px-4 py-2">{appointment.patientName}</td>
                                <td className="px-4 py-2">{appointment.doctor}</td>
                                <td className="px-4 py-2">{appointment.date}</td>
                                <td className="px-4 py-2">{appointment.time}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`inline-block px-2 py-1 text-sm rounded ${appointment.status === 'Scheduled'
                                            ? 'bg-blue-200 text-blue-800'
                                            : appointment.status === 'Completed'
                                                ? 'bg-green-200 text-green-800'
                                                : appointment.status === 'Cancelled'
                                                    ? 'bg-red-200 text-red-800'
                                                    : 'bg-yellow-200 text-yellow-800'
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleToggleTelemedicine(appointment.id)}
                                        className={`text-sm py-1 px-3 rounded transition ${appointment.telemedicineAvailable ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'
                                            }`}
                                    >
                                        {appointment.telemedicineAvailable ? 'Virtual Consultation Available' : 'Offer Virtual Consultation'}
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    {appointment.status === 'Pending' && (
                                        <button
                                            onClick={() => handleApproveAppointment(appointment.id)}
                                            className="text-sm bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppointments;
