"use client";

import { useState } from 'react';

const MyProfile = () => {
    // Dummy profile data
    const initialProfileData = {
        first_name: "Edward",
        last_name: "Vincent",
        email: "mirajhowlader@gmail.com",
        phone: "+88 0123 654 458",
        birth_date: "2012-03-21",
        gender: "Male",
        address: "456th Cross Richard, Circle Church Road London",
        occupation: "Software Developer",
        marital_status: "Single",
        blood_type: "O+",
        nationality: "British",
        languages_spoken: "English, French",
        emergency_contact_name: "John Doe",
        emergency_contact_number: "+88 0123 654 999",
        emergency_contact_relationship: "Brother",
        insurance_provider: "ABC Insurance",
        insurance_policy_number: "123456789",
        allergies: "None",
        current_medication: "None",
    };

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(initialProfileData);

    // Handle input change when editing the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to the backend to update the profile
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {/* Toggle between Edit Mode and View Mode */}
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={profileData.first_name}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={profileData.last_name}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Birth Date */}
                    <div>
                        <label className="block">Birth Date</label>
                        <input
                            type="date"
                            name="birth_date"
                            value={profileData.birth_date}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={profileData.gender}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block">Address</label>
                        <textarea
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Occupation */}
                    <div>
                        <label className="block">Occupation</label>
                        <input
                            type="text"
                            name="occupation"
                            value={profileData.occupation}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className="block">Marital Status</label>
                        <input
                            type="text"
                            name="marital_status"
                            value={profileData.marital_status}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Blood Type */}
                    <div>
                        <label className="block">Blood Type</label>
                        <input
                            type="text"
                            name="blood_type"
                            value={profileData.blood_type}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Nationality */}
                    <div>
                        <label className="block">Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            value={profileData.nationality}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Languages Spoken */}
                    <div>
                        <label className="block">Languages Spoken</label>
                        <input
                            type="text"
                            name="languages_spoken"
                            value={profileData.languages_spoken}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Emergency Contact */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block">Emergency Contact Name</label>
                            <input
                                type="text"
                                name="emergency_contact_name"
                                value={profileData.emergency_contact_name}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block">Emergency Contact Number</label>
                            <input
                                type="text"
                                name="emergency_contact_number"
                                value={profileData.emergency_contact_number}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    {/* Insurance Details */}
                    <div>
                        <label className="block">Insurance Provider</label>
                        <input
                            type="text"
                            name="insurance_provider"
                            value={profileData.insurance_provider}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <label className="block">Insurance Policy Number</label>
                        <input
                            type="text"
                            name="insurance_policy_number"
                            value={profileData.insurance_policy_number}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Allergies */}
                    <div>
                        <label className="block">Allergies</label>
                        <input
                            type="text"
                            name="allergies"
                            value={profileData.allergies}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Current Medication */}
                    <div>
                        <label className="block">Current Medication</label>
                        <input
                            type="text"
                            name="current_medication"
                            value={profileData.current_medication}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    <div>
                        <strong>Name:</strong> {profileData.first_name} {profileData.last_name}
                    </div>
                    <div>
                        <strong>Email:</strong> {profileData.email}
                    </div>
                    <div>
                        <strong>Phone:</strong> {profileData.phone}
                    </div>
                    <div>
                        <strong>Birth Date:</strong> {profileData.birth_date}
                    </div>
                    <div>
                        <strong>Gender:</strong> {profileData.gender}
                    </div>
                    <div>
                        <strong>Address:</strong> {profileData.address}
                    </div>
                    <div>
                        <strong>Occupation:</strong> {profileData.occupation}
                    </div>
                    <div>
                        <strong>Marital Status:</strong> {profileData.marital_status}
                    </div>
                    <div>
                        <strong>Blood Type:</strong> {profileData.blood_type}
                    </div>
                    <div>
                        <strong>Nationality:</strong> {profileData.nationality}
                    </div>
                    <div>
                        <strong>Languages Spoken:</strong> {profileData.languages_spoken}
                    </div>
                    <div>
                        <strong>Emergency Contact Name:</strong> {profileData.emergency_contact_name}
                    </div>
                    <div>
                        <strong>Emergency Contact Number:</strong> {profileData.emergency_contact_number}
                    </div>
                    <div>
                        <strong>Insurance Provider:</strong> {profileData.insurance_provider}
                    </div>
                    <div>
                        <strong>Insurance Policy Number:</strong> {profileData.insurance_policy_number}
                    </div>
                    <div>
                        <strong>Allergies:</strong> {profileData.allergies}
                    </div>
                    <div>
                        <strong>Current Medication:</strong> {profileData.current_medication}
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
