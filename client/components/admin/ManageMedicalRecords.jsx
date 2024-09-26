"use client"

import React, { useState, useEffect } from 'react';

const fetchMedicalRecords = async () => {
    const response = await fetch("/api/medical-records");
    const data = await response.json();
    return data;
};

const ManageMedicalRecords = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        const getMedicalRecords = async () => {
            const data = await fetchMedicalRecords();
            setMedicalRecords(data);
        };
        getMedicalRecords();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Medical Records</h2>
            <ul className="space-y-2">
                {medicalRecords.map((record) => (
                    <li key={record.id} className="border p-4 rounded">
                        <h3 className="font-semibold">Patient: {record.patientName}</h3>
                        <p>Date: {new Date(record.date).toLocaleDateString()}</p>
                        <p>Doctor: {record.doctorName}</p>
                        <p>Notes: {record.notes}</p>
                        <button className="bg-red-500 text-white py-1 px-2 mt-2 rounded">Delete</button>
                    </li>
                ))}
            </ul>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add New Record</button>
        </div>
    );
};

export default ManageMedicalRecords;
