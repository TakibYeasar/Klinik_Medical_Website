"use client";

import React, { useState } from "react";
import { FaDownload, FaFileMedical, FaPrescriptionBottleAlt, FaCalendarCheck, FaBell } from "react-icons/fa";

const MedicalRecordsAccess = () => {
    // Sample data for medical records
    const [records] = useState([
        {
            id: 1,
            type: "Lab Results",
            date: "2024-09-15",
            doctor: "Dr. Jane Smith",
            description: "Blood Test Results",
        },
        {
            id: 2,
            type: "Treatment Plan",
            date: "2024-08-30",
            doctor: "Dr. John Doe",
            description: "Post-surgery Recovery Plan",
        },
    ]);

    // Sample data for prescriptions
    const [prescriptions] = useState([
        {
            id: 1,
            date: "2024-09-20",
            doctor: "Dr. John Doe",
            medication: "Ibuprofen 400mg",
            dosage: "Take 1 tablet twice daily",
        },
        {
            id: 2,
            date: "2024-07-05",
            doctor: "Dr. Jane Smith",
            medication: "Amoxicillin 500mg",
            dosage: "Take 1 capsule every 8 hours for 7 days",
        },
    ]);

    // Sample data for appointments
    const [appointments] = useState([
        {
            id: 1,
            date: "2024-10-05",
            doctor: "Dr. Jane Smith",
            type: "Check-up",
            status: "Upcoming",
        },
        {
            id: 2,
            date: "2024-08-15",
            doctor: "Dr. John Doe",
            type: "Follow-up",
            status: "Completed",
        },
    ]);

    // Sample notifications
    const [notifications] = useState([
        { id: 1, message: "Your lab results are ready to view." },
        { id: 2, message: "Upcoming appointment with Dr. Jane Smith on 2024-10-05." },
        { id: 3, message: "Prescription for Ibuprofen is due for renewal." },
    ]);

    const handleDownloadRecord = (id) => {
        // Logic for downloading the medical record
        alert(`Download medical record with ID: ${id} functionality not implemented.`);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Patient Dashboard</h2>

            {/* Notifications Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaBell className="mr-2" /> Notifications
                </h3>
                <ul className="space-y-2">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="text-gray-700 p-2 border-b">
                            {notification.message}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Medical Records Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaFileMedical className="mr-2" /> Medical Records
                </h3>
                <ul className="space-y-4">
                    {records.map((record) => (
                        <li key={record.id} className="flex justify-between items-center p-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">{`${record.date} - ${record.type}`}</p>
                                <p className="text-gray-600">By: {record.doctor}</p>
                                <p className="text-gray-500">{record.description}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDownloadRecord(record.id)}
                                    className="bg-primary text-white py-2 px-4 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                                >
                                    <FaDownload className="inline-block mr-2" /> Download
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Prescription History Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaPrescriptionBottleAlt className="mr-2" /> Prescription History
                </h3>
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
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaPrescriptionBottleAlt className="mr-2" /> Medication Access
                </h3>
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

            {/* Appointments Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaCalendarCheck className="mr-2" /> Appointments
                </h3>
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="p-4 border-b flex justify-between">
                            <div>
                                <p className="font-medium text-gray-800">{`${appointment.date} - ${appointment.type}`}</p>
                                <p className="text-gray-600">With: {appointment.doctor}</p>
                            </div>
                            <div>
                                <span
                                    className={`py-1 px-3 rounded-full text-sm ${appointment.status === "Upcoming" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {appointment.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MedicalRecordsAccess;
