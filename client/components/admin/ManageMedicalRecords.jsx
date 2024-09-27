"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

const ManageMedicalRecords = () => {
    // Dummy medical records data
    const dummyMedicalRecords = [
        {
            id: 1,
            patientName: 'John Doe',
            recordDate: '2024-09-20',
            diagnosis: 'Hypertension',
            medications: 'Amlodipine 5mg daily',
            doctor: 'Dr. Smith',
        },
        {
            id: 2,
            patientName: 'Jane Doe',
            recordDate: '2024-09-18',
            diagnosis: 'Diabetes Type 2',
            medications: 'Metformin 500mg daily',
            doctor: 'Dr. Adams',
        },
        {
            id: 3,
            patientName: 'Michael Johnson',
            recordDate: '2024-09-15',
            diagnosis: 'Asthma',
            medications: 'Salbutamol inhaler as needed',
            doctor: 'Dr. Brown',
        },
    ];

    // Dummy data for analytics
    const dummyAnalytics = {
        totalAppointments: 150,
        totalPatients: 80,
        averageEngagement: 75, // Percentage
        appointmentStats: [
            { status: 'Scheduled', count: 100 },
            { status: 'Completed', count: 40 },
            { status: 'Cancelled', count: 10 },
        ],
    };

    const [medicalRecords] = useState(dummyMedicalRecords);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Medical Records & Analytics</h2>

            {/* Overview Section */}
            <motion.div
                className="bg-white shadow-md rounded-lg p-6 mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} // Animation transition
            >
                <h3 className="text-2xl font-semibold mb-4">Platform Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h4 className="font-bold">Total Appointments</h4>
                        <p className="text-2xl">{dummyAnalytics.totalAppointments}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h4 className="font-bold">Total Patients</h4>
                        <p className="text-2xl">{dummyAnalytics.totalPatients}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h4 className="font-bold">Average Engagement</h4>
                        <p className="text-2xl">{dummyAnalytics.averageEngagement}%</p>
                    </div>
                </div>
            </motion.div>

            {/* Medical Records Table */}
            <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} // Animation transition
            >
                <h3 className="text-2xl font-semibold mb-4">Patient Medical Records</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Patient</th>
                            <th className="px-4 py-2 text-left">Doctor</th>
                            <th className="px-4 py-2 text-left">Diagnosis</th>
                            <th className="px-4 py-2 text-left">Medications</th>
                            <th className="px-4 py-2 text-left">Record Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecords.map((record) => (
                            <motion.tr
                                key={record.id}
                                className="border-b"
                                initial={{ opacity: 0, x: -20 }} // Initial position for the row
                                animate={{ opacity: 1, x: 0 }} // Final position for the row
                                transition={{ duration: 0.2 }} // Animation duration for the row
                            >
                                <td className="px-4 py-2">{record.patientName}</td>
                                <td className="px-4 py-2">{record.doctor}</td>
                                <td className="px-4 py-2">{record.diagnosis}</td>
                                <td className="px-4 py-2">{record.medications}</td>
                                <td className="px-4 py-2">{record.recordDate}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ManageMedicalRecords;
