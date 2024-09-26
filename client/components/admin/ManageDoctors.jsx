"use client"

import React, { useState, useEffect } from 'react';

const fetchDoctors = async () => {
    const response = await fetch("/api/doctors");
    const data = await response.json();
    return data;
};

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const getDoctors = async () => {
            const data = await fetchDoctors();
            setDoctors(data);
        };
        getDoctors();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>
            <ul className="space-y-2">
                {doctors.map((doctor) => (
                    <li key={doctor.id} className="border p-4 rounded">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p>Specialty: {doctor.specialty}</p>
                        <p>Email: {doctor.email}</p>
                        <button className="bg-red-500 text-white py-1 px-2 mt-2 rounded">Delete</button>
                    </li>
                ))}
            </ul>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add New Doctor</button>
        </div>
    );
};

export default ManageDoctors;
