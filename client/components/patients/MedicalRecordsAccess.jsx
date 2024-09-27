"use client";

import React, { useState } from 'react';
import { FaDownload, FaFileMedical, FaPrescriptionBottleAlt } from 'react-icons/fa';

const MedicalRecordsAccess = () => {
    // Sample data for medical records
    const [records] = useState([
        {
            id: 1,
            type: 'Lab Results',
            date: '2024-09-15',
            doctor: 'Dr. Jane Smith',
            description: 'Blood Test Results',
        },
        {
            id: 2,
            type: 'Treatment Plan',
            date: '2024-08-30',
            doctor: 'Dr. John Doe',
            description: 'Post-surgery Recovery Plan',
        },
    ]);

    // Sample data for prescriptions
    const [prescriptions] = useState([
        {
            id: 1,
            date: '2024-09-20',
            doctor: 'Dr. John Doe',
            medication: 'Ibuprofen 400mg',
            dosage: 'Take 1 tablet twice daily',
        },
        {
            id: 2,
            date: '2024-07-05',
            doctor: 'Dr. Jane Smith',
            medication: 'Amoxicillin 500mg',
            dosage: 'Take 1 capsule every 8 hours for 7 days',
        },
    ]);

    const handleDownloadRecord = (id) => {
        // Logic for downloading the medical record
        alert(`Download medical record with ID: ${id} functionality not implemented.`);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Medical Records Access</h2>

            {/* Medical Records Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical Records</h3>
                <ul className="space-y-4">
                    {records.map((record) => (
                        <li key={record.id} className="flex justify-between items-center p-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">
                                    {`${record.date} - ${record.type}`}
                                </p>
                                <p className="text-gray-600">By: {record.doctor}</p>
                                <p className="text-gray-500">{record.description}</p>
                            </div>
                            <button
                                onClick={() => handleDownloadRecord(record.id)}
                                className="bg-primary text-white py-2 px-4 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                            >
                                <FaDownload className="inline-block mr-2" /> Download
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Prescription History Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Prescription History</h3>
                <ul className="space-y-4">
                    {prescriptions.map((prescription) => (
                        <li key={prescription.id} className="p-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">{`${prescription.date} - ${prescription.medication}`}</p>
                                <p className="text-gray-600">Prescribed by: {prescription.doctor}</p>
                                <p className="text-gray-500">Dosage: {prescription.dosage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Medication Access Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Medication Access</h3>
                <p className="text-gray-700">
                    Easily access your medication history and prescriptions. Download detailed records of all prescribed medications.
                </p>
                <button
                    onClick={() => alert('Access Medication History functionality not implemented.')}
                    className="mt-4 bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                >
                    <FaPrescriptionBottleAlt className="inline-block mr-2" /> Access Medication History
                </button>
            </div>
        </div>
    );
};

export default MedicalRecordsAccess;
