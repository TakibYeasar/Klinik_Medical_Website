"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaStar, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Doctors = () => {
    const [filterDoc, setFilterDoc] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [minExperience, setMinExperience] = useState(0);
    const [speciality, setSpeciality] = useState("");
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
        // More doctors...
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctors = dummyDoctors;

                if (searchSpeciality) {
                    setSpeciality(searchSpeciality);
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

    // Filter logic
    const filteredDoctors = filterDoc.filter((doctor) => {
        const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = doctor.ratings >= minRating;
        const matchesAvailability = availableOnly ? doctor.available : true;
        const matchesExperience = doctor.experience >= minExperience;
        const matchesSpeciality = speciality ? doctor.dept === speciality : true;

        return matchesName && matchesRating && matchesAvailability && matchesExperience && matchesSpeciality;
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Find the Best Specialists for You</h1>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
                Use the filters below to search for doctors by name, speciality, rating, availability, and experience.
            </p>

            {/* Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Name Search */}
                <input
                    type="text"
                    placeholder="Search by doctor's name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500"
                />

                {/* Speciality Dropdown */}
                <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500"
                >
                    <option value="">All Specialities</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="General Physician">General Physician</option>
                </select>

                {/* Ratings Slider */}
                <div>
                    <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-700">
                        Minimum Rating: {minRating}+
                    </label>
                    <input
                        type="range"
                        id="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Availability Filter */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="available"
                        checked={availableOnly}
                        onChange={(e) => setAvailableOnly(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="available" className="text-sm font-medium text-gray-700">
                        Available Only
                    </label>
                </div>

                {/* Experience Filter */}
                <div>
                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-700">
                        Minimum Experience: {minExperience} years
                    </label>
                    <input
                        type="range"
                        id="experience"
                        min="0"
                        max="50"
                        step="1"
                        value={minExperience}
                        onChange={(e) => setMinExperience(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Doctors List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
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
