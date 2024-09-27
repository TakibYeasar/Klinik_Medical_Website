// components/DoctorDetails.jsx
import React from 'react';
import { FaStar, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const DoctorDetails = ({ doctor }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 flex flex-col md:flex-row">
            <img
                src={doctor.profilePhoto}
                alt={doctor.name}
                className="w-full md:w-1/3 h-72 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
                    <p className="text-gray-600 mb-4">{doctor.bio}</p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <FaStar className="text-yellow-500" />
                        <span className="ml-2 text-lg text-gray-700">{doctor.ratings} / 5</span>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Specialties:</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {doctor.specialties.map((specialty, index) => (
                                <li key={index}>{specialty}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Education:</h3>
                        <ul className="list-none text-gray-700">
                            {doctor.education.map((edu, index) => (
                                <li key={index}>
                                    <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
                        <div className="flex items-center mb-2">
                            <FaPhoneAlt className="text-blue-500 mr-2" />
                            <span>{doctor.contact.phone}</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-2" />
                            <span>{doctor.contact.email}</span>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Follow on Social Media</h3>
                    <div className="flex space-x-4">
                        <a href={doctor.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
                            <FaFacebook size={24} />
                        </a>
                        <a href={doctor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition">
                            <FaTwitter size={24} />
                        </a>
                        <a href={doctor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 transition">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
