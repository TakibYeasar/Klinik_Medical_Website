"use client"

import React, { useState, useEffect } from 'react';

const fetchPatients = async () => {
    const response = await fetch("/api/patients");
    const data = await response.json();
    return data;
};

const ManagePatients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const getPatients = async () => {
            const data = await fetchPatients();
            setPatients(data);
        };
        getPatients();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Patients</h2>
            <ul className="space-y-2">
                {patients.map((patient) => (
                    <li key={patient.id} className="border p-4 rounded">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p>Email: {patient.email}</p>
                        <p>Medical History: {patient.medicalHistory}</p>
                        <button className="bg-red-500 text-white py-1 px-2 mt-2 rounded">Delete</button>
                    </li>
                ))}
            </ul>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add New Patient</button>
        </div>
    );
};

export default ManagePatients;
