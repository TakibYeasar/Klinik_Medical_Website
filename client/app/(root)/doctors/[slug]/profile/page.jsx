// components/DoctorProfile.jsx
import Link from 'next/link';
import React from 'react';
import { DoctorDetails } from '../../../../../components';
import { FaStar } from 'react-icons/fa';

const DoctorProfile = () => {
    // Sample data (could be fetched from an API)
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
        contact: {
            phone: "+1 (555) 123-4567",
            email: "johndoe@healthcare.com"
        },
        reviews: [
            { patient: "Jane Smith", review: "Dr. Doe is amazing! He took the time to explain everything and really listened.", rating: 5 },
            { patient: "John Appleseed", review: "Great doctor, very knowledgeable and friendly.", rating: 4 },
        ],
        socialLinks: {
            facebook: "https://facebook.com/doctorjohndoe",
            twitter: "https://twitter.com/doctorjohndoe",
            linkedin: "https://linkedin.com/in/doctorjohndoe"
        }
    };

    return (
        <div className="container mx-auto p-8">
            {/* Doctor Profile Section */}
            <DoctorDetails doctor={doctor} />

            {/* Bio and Specialties Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Biography</h3>
                <p className="text-gray-700 mb-4">{doctor.bio}</p>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Specialties</h4>
                <ul className="list-disc pl-5 text-gray-700">
                    {doctor.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                    ))}
                </ul>
                <h4 className="text-lg font-medium text-gray-800 mt-4 mb-2">Education</h4>
                <ul className="list-none text-gray-700">
                    {doctor.education.map((edu, index) => (
                        <li key={index}>
                            {edu.degree}, {edu.institution} ({edu.year})
                        </li>
                    ))}
                </ul>
            </div>

            {/* Availability Schedule Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Availability Schedule</h3>
                <ul className="list-none text-gray-700">
                    {doctor.schedule.map((slot, index) => (
                        <li key={index} className="flex justify-between py-2 border-b last:border-b-0">
                            <span>{slot.day}</span>
                            <span>{slot.time}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Patient Reviews Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Reviews</h3>
                {doctor.reviews.map((review, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center mb-2">
                            <FaStar className="text-yellow-500" />
                            <span className="ml-2 text-gray-700">{review.rating} / 5</span>
                        </div>
                        <p className="text-gray-700">
                            <strong>{review.patient}:</strong> {review.review}
                        </p>
                    </div>
                ))}
            </div>

            {/* Contact Information Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <p className="text-gray-700">Phone: {doctor.contact.phone}</p>
                <p className="text-gray-700">Email: <a href={`mailto:${doctor.contact.email}`} className="text-blue-600 hover:underline">{doctor.contact.email}</a></p>
            </div>

            {/* Social Links Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect with Dr. John Doe</h3>
                <div className="flex space-x-4">
                    <a href={doctor.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
                    <a href={doctor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a>
                    <a href={doctor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
                </div>
            </div>

            <Link href={`/appointment`} className="mt-8 text-center">
                <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition">
                    Book an Appointment
                </button>
            </Link>
        </div>
    );
};

export default DoctorProfile;
