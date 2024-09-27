import React from 'react';
import { FaStar } from 'react-icons/fa';

const DoctorProfile = () => {
    // Sample data
    const doctor = {
        name: "Dr. John Doe",
        profilePhoto: "/path/to/profile-photo.jpg",
        bio: "Experienced cardiologist with over 10 years of practice. Passionate about providing the best care to patients and dedicated to continuous education.",
        specialties: ["Cardiology", "Hypertension", "Heart Failure"],
        education: [
            { degree: "MD", institution: "Harvard Medical School", year: 2012 },
            { degree: "BS in Biology", institution: "Stanford University", year: 2008 },
        ],
        ratings: 4.8,
        schedule: [
            { day: "Monday", time: "9:00 AM - 5:00 PM" },
            { day: "Tuesday", time: "10:00 AM - 4:00 PM" },
            { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
            { day: "Thursday", time: "10:00 AM - 4:00 PM" },
            { day: "Friday", time: "9:00 AM - 5:00 PM" },
        ],
    };

    return (
        <div className="container mx-auto p-8">
            {/* Doctor Information Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div className="flex flex-col md:flex-row">
                    <img
                        src={doctor.profilePhoto}
                        alt={doctor.name}
                        className="w-full md:w-1/3 h-48 object-cover"
                    />
                    <div className="p-6 flex-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
                        <p className="text-gray-600 mb-4">{doctor.bio}</p>
                        <div className="flex items-center mb-2">
                            <FaStar className="text-yellow-500" />
                            <span className="ml-1 text-lg text-gray-700">{doctor.ratings} / 5</span>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Specialties:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {doctor.specialties.map((specialty, index) => (
                                    <li key={index}>{specialty}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">Education:</h3>
                            <ul className="text-gray-700">
                                {doctor.education.map((edu, index) => (
                                    <li key={index}>
                                        {edu.degree}, {edu.institution} ({edu.year})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Availability Schedule Card */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Availability Schedule</h3>
                <ul className="list-disc list-inside text-gray-700">
                    {doctor.schedule.map((slot, index) => (
                        <li key={index} className="flex justify-between py-2 border-b last:border-b-0">
                            <span>{slot.day}</span>
                            <span>{slot.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DoctorProfile;
