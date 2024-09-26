"use client"

import React, { useState, useEffect } from 'react';

const dummyPatients = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        medicalHistory: "No known allergies. Previous surgery in 2015.",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        medicalHistory: "Diabetic. Hypertension since 2018.",
    },
    {
        id: 3,
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "555-444-3333",
        medicalHistory: "Asthmatic. Allergy to penicillin.",
    },
    {
        id: 4,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "222-111-4444",
        medicalHistory: "Cardiac issues. Under medication.",
    },
    {
        id: 5,
        name: "Sophia White",
        email: "sophia.white@example.com",
        phone: "666-555-1234",
        medicalHistory: "No known medical history.",
    }
];

const ManagePatients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Simulating fetching data by setting dummy data
        setPatients(dummyPatients);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Patients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((patient) => (
                    <div key={patient.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
                            <p className="text-gray-600">Email: {patient.email}</p>
                            <p className="text-gray-600">Phone: {patient.phone}</p>
                            <p className="text-gray-600">Medical History: {patient.medicalHistory}</p>

                            <div className="flex justify-between items-center mt-4">
                                <button className="text-sm bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">View Profile</button>
                                <button className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagePatients;
