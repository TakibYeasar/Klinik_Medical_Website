"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

const ManagePatients = () => {
    // Dummy data for patients
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: 'John Doe',
            age: 30,
            email: 'john@example.com',
            medicalHistory: 'No significant history',
            treatmentPlans: 'Regular check-ups',
            appointments: [
                { date: '2024-01-15', status: 'Completed' },
                { date: '2024-02-20', status: 'Scheduled' },
            ],
            billing: { total: 200, paid: 150 }
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 45,
            email: 'jane@example.com',
            medicalHistory: 'Diabetes',
            treatmentPlans: 'Insulin therapy',
            appointments: [
                { date: '2024-01-10', status: 'Completed' },
                { date: '2024-03-05', status: 'Scheduled' },
            ],
            billing: { total: 300, paid: 300 }
        },
    ]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Patient Management</h2>

            {/* Patient Management Table */}
            <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} // Animation transition
            >
                <h3 className="text-2xl font-semibold mb-4">Manage Patients</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Age</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Medical History</th>
                            <th className="px-4 py-2 text-left">Treatment Plans</th>
                            <th className="px-4 py-2 text-left">Appointments</th>
                            <th className="px-4 py-2 text-left">Billing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <motion.tr
                                key={patient.id}
                                className="border-b"
                                initial={{ opacity: 0, x: -20 }} // Initial position for the row
                                animate={{ opacity: 1, x: 0 }} // Final position for the row
                                transition={{ duration: 0.2 }} // Animation duration for the row
                            >
                                <td className="px-4 py-2">{patient.name}</td>
                                <td className="px-4 py-2">{patient.age}</td>
                                <td className="px-4 py-2">{patient.email}</td>
                                <td className="px-4 py-2">{patient.medicalHistory}</td>
                                <td className="px-4 py-2">{patient.treatmentPlans}</td>
                                <td className="px-4 py-2">
                                    <ul>
                                        {patient.appointments.map((appointment, index) => (
                                            <li key={index}>
                                                {appointment.date} - {appointment.status}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 py-2">
                                    Total: ${patient.billing.total} - Paid: ${patient.billing.paid}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ManagePatients;
