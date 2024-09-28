"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCheckCircle, FiXCircle, FiEye, FiTrash2 } from "react-icons/fi";
import ReactPaginate from "react-paginate";

// Dummy data for providers
const dummyProviders = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiology", email: "john.doe@example.com", experience: 12, isApproved: false },
    { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrics", email: "jane.smith@example.com", experience: 8, isApproved: true },
    { id: 3, name: "Dr. Emily Johnson", specialty: "Dermatology", email: "emily.johnson@example.com", experience: 15, isApproved: true },
    { id: 4, name: "Dr. Mark Spencer", specialty: "Neurology", email: "mark.spencer@example.com", experience: 10, isApproved: false },
    { id: 5, name: "Dr. Alex Moore", specialty: "Orthopedics", email: "alex.moore@example.com", experience: 7, isApproved: true },
    { id: 6, name: "Dr. Susan White", specialty: "Oncology", email: "susan.white@example.com", experience: 20, isApproved: false },
];

const ManageDoctors = () => {
    const [providers, setProviders] = useState([]);
    const [viewProfile, setViewProfile] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSpecialty, setFilterSpecialty] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const providersPerPage = 3; // Pagination: Number of providers per page

    useEffect(() => {
        // Load dummy data
        setProviders(dummyProviders);
    }, []);

    // Approve provider
    const handleApproveProvider = (id) => {
        setProviders(providers.map((provider) =>
            provider.id === id ? { ...provider, isApproved: true } : provider
        ));
    };

    // Reject provider
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

    // Filter providers by search and specialty
    const filteredProviders = providers
        .filter((provider) =>
            provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterSpecialty ? provider.specialty === filterSpecialty : true)
        );

    // Pagination logic
    const pageCount = Math.ceil(filteredProviders.length / providersPerPage);
    const displayedProviders = filteredProviders.slice(
        currentPage * providersPerPage,
        (currentPage + 1) * providersPerPage
    );

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-8">Manage Healthcare Providers</h2>

            {/* Search and Filter Bar */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FiSearch className="absolute top-3 left-3 text-gray-500" />
                </div>
                <div>
                    <select
                        value={filterSpecialty}
                        onChange={(e) => setFilterSpecialty(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Specialties</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Oncology">Oncology</option>
                    </select>
                </div>
            </div>

            {/* Providers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProviders.map((provider) => (
                    <div key={provider.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
                            <p className="text-gray-600">Specialty: {provider.specialty}</p>
                            <p className="text-gray-600">Experience: {provider.experience} years</p>
                            <p className="text-gray-600">Email: {provider.email}</p>
                            <div className="mt-4 flex justify-between items-center space-x-2">
                                {!provider.isApproved ? (
                                    <>
                                        <button
                                            onClick={() => handleApproveProvider(provider.id)}
                                            className="text-sm flex items-center bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition"
                                        >
                                            <FiCheckCircle className="mr-2" /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleRejectProvider(provider.id)}
                                            className="text-sm flex items-center bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                                        >
                                            <FiXCircle className="mr-2" /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleViewProfile(provider)}
                                            className="text-sm flex items-center bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            <FiEye className="mr-2" /> View Profile
                                        </button>
                                        <button
                                            onClick={() => handleRemoveProvider(provider.id)}
                                            className="text-sm flex items-center bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                                        >
                                            <FiTrash2 className="mr-2" /> Remove
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination flex justify-center items-center space-x-2"}
                    activeClassName={"active bg-blue-500 text-white rounded-full px-4 py-2"}
                    previousClassName={"bg-gray-200 rounded-full px-4 py-2"}
                    nextClassName={"bg-gray-200 rounded-full px-4 py-2"}
                    pageClassName={"bg-gray-100 rounded-full px-4 py-2"}
                />
            </div>

            {/* View Provider Profile Modal */}
            {viewProfile && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
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
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
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
