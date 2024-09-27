"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaStar, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Doctors = () => {
    const [filterDoc, setFilterDoc] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const searchSpeciality = searchParams.get("speciality");

    // Dummy doctor data for demonstration
    const dummyDoctors = [
        {
            id: 1,
            name: "Dr. Jane Smith",
            image: "/path/to/image1.jpg",
            dept: "Cardiologist",
            experience: 10,
            available: true,
            ratings: 4.5,
            contact: "jane.smith@hospital.com",
        },
        {
            id: 2,
            name: "Dr. John Doe",
            image: "/path/to/image2.jpg",
            dept: "Neurologist",
            experience: 8,
            available: false,
            ratings: 4.2,
            contact: "john.doe@hospital.com",
        },
        {
            id: 3,
            name: "Dr. Emily Davis",
            image: "/path/to/image3.jpg",
            dept: "Dermatologist",
            experience: 7,
            available: true,
            ratings: 4.8,
            contact: "emily.davis@hospital.com",
        },
        {
            id: 1,
            name: "Dr. Jane Smith",
            image: "/path/to/image1.jpg",
            dept: "Cardiologist",
            experience: 10,
            available: true,
            ratings: 4.5,
            contact: "jane.smith@hospital.com",
        },
        {
            id: 2,
            name: "Dr. John Doe",
            image: "/path/to/image2.jpg",
            dept: "Neurologist",
            experience: 8,
            available: false,
            ratings: 4.2,
            contact: "john.doe@hospital.com",
        },
        {
            id: 3,
            name: "Dr. Emily Davis",
            image: "/path/to/image3.jpg",
            dept: "Dermatologist",
            experience: 7,
            available: true,
            ratings: 4.8,
            contact: "emily.davis@hospital.com",
        },
        // More doctors...
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctors = dummyDoctors;

                if (searchSpeciality) {
                    setFilterDoc(doctors.filter((doc) => doc.dept === searchSpeciality));
                } else {
                    setFilterDoc(doctors);
                }

                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching doctors:", err);
                setIsLoading(false);
            }
        };

        fetchDoctors();
    }, [searchSpeciality]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Specialists</h1>

            {/* Doctors List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterDoc.map((doctor) => (
                    <div
                        className="relative bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                        key={doctor.id}
                    >
                        <img
                            className="w-full h-48 object-cover object-center"
                            src={doctor.image}
                            alt={doctor.name}
                        />
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                                <div className="flex items-center text-yellow-500">
                                    <FaStar />
                                    <span className="ml-1 text-sm text-gray-800">{doctor.ratings}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{doctor.dept}</p>
                            <p className="text-gray-500 text-sm">Experience: {doctor.experience} years</p>
                            <div className="flex items-center gap-2 mt-4">
                                {doctor.available ? (
                                    <div className="flex items-center text-green-600">
                                        <FaCheckCircle className="mr-1" />
                                        <span>Available</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-red-500">
                                        <FaTimesCircle className="mr-1" />
                                        <span>Not Available</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <FaEnvelope className="text-blue-500" />
                                <a
                                    href={`mailto:${doctor.contact}`}
                                    className="text-sm text-blue-500 underline hover:text-blue-700"
                                >
                                    Contact: {doctor.contact}
                                </a>
                            </div>
                            {/* View Profile Button */}
                            <button
                                onClick={() => router.push(`/doctors/${doctor.name}/profile`)}
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                View Profile
                            </button>
                        </div>
                        <div className="absolute top-2 right-2">
                            {/* Additional labels like "Featured" */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;
