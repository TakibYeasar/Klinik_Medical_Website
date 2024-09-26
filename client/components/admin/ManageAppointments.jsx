"use client"

import React, { useState } from 'react';

// Dummy appointment data
const dummyAppointments = [
    {
        id: 1,
        patientName: 'John Doe',
        date: '2024-09-30',
        time: '10:30 AM',
        status: 'Scheduled',
        doctor: 'Dr. Smith',
    },
    {
        id: 2,
        patientName: 'Jane Doe',
        date: '2024-09-29',
        time: '11:00 AM',
        status: 'Completed',
        doctor: 'Dr. Adams',
    },
    {
        id: 3,
        patientName: 'Michael Johnson',
        date: '2024-09-28',
        time: '12:00 PM',
        status: 'Cancelled',
        doctor: 'Dr. Brown',
    },
];

const ManageAppointments = () => {
    const [appointments] = useState(dummyAppointments);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Appointments</h2>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="shadow-lg rounded-lg bg-blue-100 p-6 text-center">
                    <p className="text-xl font-semibold">Scheduled</p>
                    <p className="text-3xl font-bold">{appointments.filter(a => a.status === 'Scheduled').length}</p>
                </div>
                <div className="shadow-lg rounded-lg bg-yellow-100 p-6 text-center">
                    <p className="text-xl font-semibold">Completed</p>
                    <p className="text-3xl font-bold">{appointments.filter(a => a.status === 'Completed').length}</p>
                </div>
                <div className="shadow-lg rounded-lg bg-red-100 p-6 text-center">
                    <p className="text-xl font-semibold">Cancelled</p>
                    <p className="text-3xl font-bold">{appointments.filter(a => a.status === 'Cancelled').length}</p>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Appointment List</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Patient</th>
                            <th className="px-4 py-2 text-left">Doctor</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Time</th>
                            <th className="px-4 py-2 text-left">Status</th>
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
                                                    : 'bg-red-200 text-red-800'
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>
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
