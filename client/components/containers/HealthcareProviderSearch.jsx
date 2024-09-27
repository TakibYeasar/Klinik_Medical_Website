"use client"

import { useState } from 'react';

const HealthcareProviderSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState('');
    const [rating, setRating] = useState('');
    const [language, setLanguage] = useState('');

    const handleSearch = () => {
        // Handle the search logic here (e.g., make an API call with the filter values)
        console.log({
            searchQuery,
            specialty,
            location,
            availability,
            rating,
            language,
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Search Healthcare Providers</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search Query */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Search by name or keyword..."
                    />
                </div>

                {/* Specialty */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialty
                    </label>
                    <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="">All Specialties</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="orthopedics">Orthopedics</option>
                        {/* Add more specialties as needed */}
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="City or ZIP code"
                    />
                </div>

                {/* Availability */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                    </label>
                    <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="">Any Time</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="weekends">Weekends</option>
                    </select>
                </div>

                {/* Ratings */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ratings
                    </label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="">Any Rating</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars & Up</option>
                        <option value="3">3 Stars & Up</option>
                        <option value="2">2 Stars & Up</option>
                        <option value="1">1 Star & Up</option>
                    </select>
                </div>

                {/* Languages Spoken */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Languages Spoken
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="">Any Language</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="chinese">Chinese</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default HealthcareProviderSearch;
