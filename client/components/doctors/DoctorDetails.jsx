"use client"

// components/DoctorDetails.jsx
import React, { useState } from 'react';
import { FaStar, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaClock, FaEdit } from 'react-icons/fa';

const DoctorDetails = ({ doctor, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: doctor.name,
        bio: doctor.bio,
        ratings: doctor.ratings,
        isAvailable: doctor.isAvailable,
        specialties: doctor.specialties,
        education: doctor.education,
        contact: {
            phone: doctor.contact.phone,
            email: doctor.contact.email,
        },
        socialLinks: doctor.socialLinks,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.contact) {
            setFormData((prev) => ({
                ...prev,
                contact: {
                    ...prev.contact,
                    [name]: value,
                },
            }));
        } else if (name === 'isAvailable') {
            setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 flex flex-col md:flex-row">
            <img
                src={doctor.profilePhoto}
                alt={doctor.name}
                className="w-full md:w-1/3 h-72 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    {isEditing ? (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                />
                            </h2>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4"
                                placeholder="Bio"
                            />
                        </div>
                    ) : (
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
                    )}

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <FaStar className="text-yellow-500" />
                        {isEditing ? (
                            <input
                                type="number"
                                name="ratings"
                                value={formData.ratings}
                                onChange={handleChange}
                                className="ml-2 text-lg text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-16"
                                min="0"
                                max="5"
                            />
                        ) : (
                            <span className="ml-2 text-lg text-gray-700">{doctor.ratings} / 5</span>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="flex items-center mb-4">
                        <FaClock className="text-green-500 mr-2" />
                        {isEditing ? (
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isAvailable"
                                    checked={formData.isAvailable}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span>Available Now</span>
                            </label>
                        ) : (
                            <span className={`text-lg ${doctor.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                {doctor.isAvailable ? 'Available Now' : 'Currently Unavailable'}
                            </span>
                        )}
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Specialties:</h3>
                        {isEditing ? (
                            <textarea
                                name="specialties"
                                value={formData.specialties.join(', ')}
                                onChange={(e) => setFormData({ ...formData, specialties: e.target.value.split(', ') })}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4"
                                placeholder="Comma separated specialties"
                            />
                        ) : (
                            <ul className="list-disc list-inside text-gray-700">
                                {doctor.specialties.map((specialty, index) => (
                                    <li key={index}>{specialty}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Education:</h3>
                        {isEditing ? (
                            <textarea
                                name="education"
                                value={formData.education.map(edu => `${edu.degree} — ${edu.institution} (${edu.year})`).join('\n')}
                                onChange={(e) => {
                                    const eduArray = e.target.value.split('\n').map(item => {
                                        const parts = item.split(' — ');
                                        return { degree: parts[0], institution: parts[1].split(' (')[0], year: parts[1].split(' (')[1]?.replace(')', '') || '' };
                                    });
                                    setFormData({ ...formData, education: eduArray });
                                }}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4"
                                placeholder="Enter education details line by line"
                            />
                        ) : (
                            <ul className="list-none text-gray-700">
                                {doctor.education.map((edu, index) => (
                                    <li key={index}>
                                        <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
                        <div className="flex items-center mb-2">
                            <FaPhoneAlt className="text-blue-500 mr-2" />
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.contact.phone}
                                    onChange={handleChange}
                                    className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="Phone Number"
                                />
                            ) : (
                                <span>{doctor.contact.phone}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-2" />
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.contact.email}
                                    onChange={handleChange}
                                    className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="Email"
                                />
                            ) : (
                                <span>{doctor.contact.email}</span>
                            )}
                        </div>
                    </div>

                    {/* Save and Edit Buttons */}
                    <div className="mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition mr-2">
                                    Save Changes
                                </button>
                                <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                                <FaEdit className="inline mr-1" />
                                Edit Information
                            </button>
                        )}
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
