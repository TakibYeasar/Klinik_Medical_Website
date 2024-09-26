"use client"

import React, { useState } from 'react';

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

const ManageMedicalRecords = () => {
    const [medicalRecords] = useState(dummyMedicalRecords);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Medical Records</h2>

            {/* Medical Records Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
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
                            <tr key={record.id} className="border-b">
                                <td className="px-4 py-2">{record.patientName}</td>
                                <td className="px-4 py-2">{record.doctor}</td>
                                <td className="px-4 py-2">{record.diagnosis}</td>
                                <td className="px-4 py-2">{record.medications}</td>
                                <td className="px-4 py-2">{record.recordDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMedicalRecords;
