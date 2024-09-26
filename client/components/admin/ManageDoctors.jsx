"use client"

import React, { useState, useEffect } from 'react';

// Commenting out the API fetching code
// const fetchDoctors = async () => {
//     const response = await fetch("/api/doctors");
//     const data = await response.json();
//     return data;
// };

const ManageDoctors = () => {
    // Using dummy data instead of fetching from an API
    const dummyDoctors = [
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', email: 'john.doe@example.com', experience: 12 },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics', email: 'jane.smith@example.com', experience: 8 },
        { id: 3, name: 'Dr. Emily Johnson', specialty: 'Dermatology', email: 'emily.johnson@example.com', experience: 15 },
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', email: 'john.doe@example.com', experience: 12 },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics', email: 'jane.smith@example.com', experience: 8 },
        { id: 3, name: 'Dr. Emily Johnson', specialty: 'Dermatology', email: 'emily.johnson@example.com', experience: 15 }
    ];

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Directly setting dummy data
        setDoctors(dummyDoctors);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                            <p className="text-gray-600">Specialty: {doctor.specialty}</p>
                            <p className="text-gray-600">Experience: {doctor.experience} years</p>
                            <p className="text-gray-600">Email: {doctor.email}</p>
                            <div className="mt-4 flex justify-between items-center">
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

export default ManageDoctors;
