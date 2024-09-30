"use client";

// components/DoctorDetails.jsx
import React, { useState } from "react";
import {
    FaStar,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaClock,
    FaEdit,
    FaUpload,
} from "react-icons/fa";
import { isEmail, isNumeric } from "validator";

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
        profilePhoto: doctor.profilePhoto,
    });

    const [errors, setErrors] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

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
        } else if (name === "isAvailable") {
            setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            onUpdate(formData);
            setIsEditing(false);
        } else {
            setErrors(newErrors);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!isEmail(formData.contact.email))
            newErrors.email = "Invalid email address";
        if (!isNumeric(formData.contact.phone))
            newErrors.phone = "Phone number must be numeric";
        if (formData.ratings < 0 || formData.ratings > 5)
            newErrors.ratings = "Ratings must be between 0 and 5";

        return newErrors;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, profilePhoto: file }));
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3">
                    <img
                        src={selectedImage || doctor.profilePhoto}
                        alt={doctor.name}
                        className="w-full h-72 object-cover"
                    />
                    {isEditing && (
                        <label
                            htmlFor="profile-upload"
                            className="absolute bottom-4 left-4 bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700 transition"
                        >
                            <FaUpload className="mr-1 inline" /> Change Photo
                            <input
                                type="file"
                                id="profile-upload"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="text-3xl font-bold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full mb-2"
                                    placeholder="Doctor's Name"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm">{errors.name}</p>
                                )}
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4"
                                    placeholder="Doctor's Bio"
                                />
                            </div>
                        ) : (
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {doctor.name}
                            </h2>
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
                                    className="ml-2 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-16"
                                    min="0"
                                    max="5"
                                />
                            ) : (
                                <span className="ml-2 text-lg text-gray-700">
                                    {doctor.ratings} / 5
                                </span>
                            )}
                            {errors.ratings && (
                                <p className="text-red-600 text-sm ml-2">{errors.ratings}</p>
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
                                <span
                                    className={`text-lg ${doctor.isAvailable ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {doctor.isAvailable ? "Available Now" : "Unavailable"}
                                </span>
                            )}
                        </div>

                        {/* Specialties */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Specialties</h3>
                            {isEditing ? (
                                formData.specialties.map((specialty, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={specialty.name}
                                            onChange={(e) => {
                                                const updatedSpecialties = [...formData.specialties];
                                                updatedSpecialties[index].name = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    specialties: updatedSpecialties,
                                                }));
                                            }}
                                            className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 flex-1 mr-2"
                                            placeholder="Specialty"
                                        />
                                        <input
                                            type="number"
                                            value={specialty.level}
                                            onChange={(e) => {
                                                const updatedSpecialties = [...formData.specialties];
                                                updatedSpecialties[index].level = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    specialties: updatedSpecialties,
                                                }));
                                            }}
                                            className="w-16 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                            placeholder="Level"
                                            min="1"
                                            max="10"
                                        />
                                    </div>
                                ))
                            ) : (
                                <ul className="list-disc list-inside text-gray-700">
                                    {doctor.specialties.map((specialty, index) => (
                                        <li key={index}>
                                            {specialty.name} (Level {specialty.level})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Education */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Education</h3>
                            {isEditing ? (
                                <textarea
                                    name="education"
                                    value={formData.education
                                        .map(
                                            (edu) => `${edu.degree} — ${edu.institution} (${edu.year})`
                                        )
                                        .join("\n")}
                                    onChange={(e) => {
                                        const updatedEducation = e.target.value
                                            .split("\n")
                                            .map((eduLine) => {
                                                const [degree, institutionYear] = eduLine.split(" — ");
                                                const [institution, year] = institutionYear
                                                    ? institutionYear.match(/(.+)\s\((\d+)\)/).slice(1)
                                                    : ["", ""];
                                                return { degree, institution, year };
                                            });
                                        setFormData((prev) => ({
                                            ...prev,
                                            education: updatedEducation,
                                        }));
                                    }}
                                    className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4"
                                    placeholder="Doctor's Education"
                                />
                            ) : (
                                <ul className="list-disc list-inside text-gray-700">
                                    {doctor.education.map((edu, index) => (
                                        <li key={index}>
                                            {edu.degree} — {edu.institution} ({edu.year})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Contact</h3>
                            {isEditing ? (
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.contact.phone}
                                        onChange={handleChange}
                                        className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="Phone Number"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-sm">{errors.phone}</p>
                                    )}
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.contact.email}
                                        onChange={handleChange}
                                        className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm">{errors.email}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <span className="flex items-center">
                                        <FaPhoneAlt className="mr-2 text-gray-700" />{" "}
                                        {doctor.contact.phone}
                                    </span>
                                    <span className="flex items-center">
                                        <FaEnvelope className="mr-2 text-gray-700" />{" "}
                                        {doctor.contact.email}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Social Links</h3>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="facebook"
                                        value={formData.socialLinks.facebook}
                                        onChange={handleChange}
                                        className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="Facebook"
                                    />
                                    <input
                                        type="text"
                                        name="twitter"
                                        value={formData.socialLinks.twitter}
                                        onChange={handleChange}
                                        className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="Twitter"
                                    />
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData.socialLinks.linkedin}
                                        onChange={handleChange}
                                        className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="LinkedIn"
                                    />
                                </div>
                            ) : (
                                <div className="flex gap-4 text-gray-700">
                                    <a href={doctor.socialLinks.facebook}>
                                        <FaFacebook className="text-blue-600" />
                                    </a>
                                    <a href={doctor.socialLinks.twitter}>
                                        <FaTwitter className="text-blue-400" />
                                    </a>
                                    <a href={doctor.socialLinks.linkedin}>
                                        <FaLinkedin className="text-blue-800" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="mt-4 flex gap-2 justify-end">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            <FaEdit className="inline mr-1" /> Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
