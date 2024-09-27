"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Dummy data for providers
const dummyProviders = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiology", email: "john.doe@example.com", experience: 12, isApproved: false },
    { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrics", email: "jane.smith@example.com", experience: 8, isApproved: true },
    { id: 3, name: "Dr. Emily Johnson", specialty: "Dermatology", email: "emily.johnson@example.com", experience: 15, isApproved: true },
    { id: 4, name: "Dr. Mark Spencer", specialty: "Neurology", email: "mark.spencer@example.com", experience: 10, isApproved: false },
];

const ManageDoctors = () => {
    const [providers, setProviders] = useState([]);
    const [viewProfile, setViewProfile] = useState(null);

    useEffect(() => {
        // Set dummy data
        setProviders(dummyProviders);
    }, []);

    // Approve or reject provider
    const handleApproveProvider = (id) => {
        setProviders(
            providers.map((provider) =>
                provider.id === id ? { ...provider, isApproved: true } : provider
            )
        );
    };

    const handleRejectProvider = (id) => {
        setProviders(providers.filter((provider) => provider.id !== id));
    };

    // View provider profile
    const handleViewProfile = (provider) => {
        setViewProfile(provider);
    };

    // Remove provider
    const handleRemoveProvider = (id) => {
        setProviders(providers.filter((provider) => provider.id !== id));
    };

    // Close modal
    const closeModal = () => {
        setViewProfile(null);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Providers</h2>

            {/* Unapproved Providers List */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Pending Approval</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers
                        .filter((provider) => !provider.isApproved)
                        .map((provider) => (
                            <div
                                key={provider.id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
                            >
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
                                    <p className="text-gray-600">Specialty: {provider.specialty}</p>
                                    <p className="text-gray-600">Experience: {provider.experience} years</p>
                                    <p className="text-gray-600">Email: {provider.email}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            onClick={() => handleApproveProvider(provider.id)}
                                            className="text-sm bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRejectProvider(provider.id)}
                                            className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Approved Providers List */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">Registered Providers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers
                        .filter((provider) => provider.isApproved)
                        .map((provider) => (
                            <div
                                key={provider.id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
                            >
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
                                    <p className="text-gray-600">Specialty: {provider.specialty}</p>
                                    <p className="text-gray-600">Experience: {provider.experience} years</p>
                                    <p className="text-gray-600">Email: {provider.email}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            onClick={() => handleViewProfile(provider)}
                                            className="text-sm bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => handleRemoveProvider(provider.id)}
                                            className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* View Provider Profile Modal */}
            {viewProfile && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">Provider Profile</h3>
                        <p className="text-xl font-semibold">Name: {viewProfile.name}</p>
                        <p className="text-gray-600">Specialty: {viewProfile.specialty}</p>
                        <p className="text-gray-600">Experience: {viewProfile.experience} years</p>
                        <p className="text-gray-600">Email: {viewProfile.email}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default ManageDoctors;
