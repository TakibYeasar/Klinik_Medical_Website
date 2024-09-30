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
    const [location, setLocation] = useState("");
    const [services, setServices] = useState("");
    const [languages, setLanguages] = useState("");
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
            dept: "Cardiology",
            experience: 10,
            available: true,
            ratings: 4.5,
            contact: "jane.smith@hospital.com",
            location: "New York",
            services: ["Heart Surgery", "Cardiac Consultation"],
            languages: ["English", "Spanish"],
        },
        {
            id: 2,
            name: "Dr. John Doe",
            image: "/path/to/image2.jpg",
            dept: "Neurology",
            experience: 8,
            available: false,
            ratings: 4.2,
            contact: "john.doe@hospital.com",
            location: "Los Angeles",
            services: ["Brain Surgery", "Neuro Consultation"],
            languages: ["English"],
        },
        {
            id: 3,
            name: "Dr. Emily Davis",
            image: "/path/to/image3.jpg",
            dept: "Dermatology",
            experience: 7,
            available: true,
            ratings: 4.8,
            contact: "emily.davis@hospital.com",
            location: "Chicago",
            services: ["Skin Treatment", "Laser Therapy"],
            languages: ["English", "French"],
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
        const matchesLocation = location ? doctor.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesServices = services
            ? doctor.services.some((service) => service.toLowerCase().includes(services.toLowerCase()))
            : true;
        const matchesLanguages = languages
            ? doctor.languages.some((lang) => lang.toLowerCase().includes(languages.toLowerCase()))
            : true;

        return matchesName && matchesRating && matchesAvailability && matchesExperience && matchesSpeciality && matchesLocation && matchesServices && matchesLanguages;
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Find the Best Healthcare Providers</h1>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
                Use the filters below to search for healthcare providers by name, specialty, location, rating, availability, services, and languages spoken.
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

                {/* Specialty Dropdown */}
                <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500"
                >
                    <option value="">All Specialties</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Physician">General Physician</option>
                </select>

                {/* Location Filter */}
                <input
                    type="text"
                    placeholder="Search by location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500"
                />

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

                {/* Services Filter */}
                <input
                    type="text"
                    placeholder="Search by services (e.g., surgery)"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500"
                />

                {/* Languages Filter */}
                <input
                    type="text"
                    placeholder="Search by languages spoken"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* Doctors List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
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
                                <p className="text-sm text-gray-600">{doctor.dept}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Experience: {doctor.experience} years
                                </p>
                                <p className="text-sm text-gray-600 mt-2">Location: {doctor.location}</p>
                                <p className="text-sm text-gray-600 mt-2">Services: {doctor.services.join(", ")}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Languages: {doctor.languages.join(", ")}
                                </p>
                                <p className="text-sm text-gray-600 mt-2 flex items-center">
                                    {doctor.available ? (
                                        <FaCheckCircle className="text-green-500 mr-1" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 mr-1" />
                                    )}
                                    {doctor.available ? "Available" : "Unavailable"}
                                </p>
                                <a
                                    href={`mailto:${doctor.contact}`}
                                    className="flex items-center mt-4 text-blue-600 hover:underline"
                                >
                                    <FaEnvelope className="mr-2" />
                                    Contact
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-3">
                        No doctors found. Try adjusting your filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Doctors;
