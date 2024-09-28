"use client";

import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiEye, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";

// Dummy data for appointments and doctors
const dummyAppointments = [
    { id: 1, patientName: "John Doe", date: "2024-09-30", time: "10:30 AM", status: "Pending", doctor: "Dr. Smith", telemedicineAvailable: true },
    { id: 2, patientName: "Jane Doe", date: "2024-09-29", time: "11:00 AM", status: "Scheduled", doctor: "Dr. Adams", telemedicineAvailable: false },
    { id: 3, patientName: "Michael Johnson", date: "2024-09-28", time: "12:00 PM", status: "Cancelled", doctor: "Dr. Brown", telemedicineAvailable: true },
];

const dummyDoctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiology", email: "smith@example.com", status: "Active" },
    { id: 2, name: "Dr. Adams", specialty: "Neurology", email: "adams@example.com", status: "Pending" },
    { id: 3, name: "Dr. Brown", specialty: "Dermatology", email: "brown@example.com", status: "Active" },
];

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Set pagination limit

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchDoctor, setSearchDoctor] = useState("");

    useEffect(() => {
        setAppointments(dummyAppointments);
        setDoctors(dummyDoctors);
        setFilteredDoctors(dummyDoctors);
    }, []);

    const handleSearchDoctor = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchDoctor(searchValue);
        setFilteredDoctors(doctors.filter((doctor) => doctor.name.toLowerCase().includes(searchValue)));
    };

    const handleApproveDoctor = (id) => {
        setDoctors(doctors.map((doctor) => (doctor.id === id ? { ...doctor, status: "Active" } : doctor)));
    };

    const handleDeleteDoctor = (id) => {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
    };

    const handleViewProfile = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const displayedDoctors = filteredDoctors.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Healthcare Admin Dashboard</h2>

            {/* Search and Filter Section */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search doctor by name..."
                    value={searchDoctor}
                    onChange={handleSearchDoctor}
                    className="border rounded-lg px-3 py-2 w-1/3"
                />
            </div>

            {/* Doctor Management Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Manage Doctors</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Doctor Name</th>
                            <th className="px-4 py-2 text-left">Specialty</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedDoctors.map((doctor) => (
                            <tr key={doctor.id} className="border-b">
                                <td className="px-4 py-2">{doctor.name}</td>
                                <td className="px-4 py-2">{doctor.specialty}</td>
                                <td className="px-4 py-2">{doctor.email}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`inline-block px-2 py-1 text-sm rounded ${doctor.status === "Active" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                                            }`}
                                    >
                                        {doctor.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 flex space-x-2">
                                    {doctor.status === "Pending" && (
                                        <button
                                            onClick={() => handleApproveDoctor(doctor.id)}
                                            className="text-sm bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleViewProfile(doctor)}
                                        className="text-sm bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDoctor(doctor.id)}
                                        className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4">
                    <ReactPaginate
                        pageCount={Math.ceil(filteredDoctors.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName="pagination flex justify-center space-x-2"
                        activeClassName="bg-blue-500 text-white rounded px-3 py-1"
                        previousLabel="Previous"
                        nextLabel="Next"
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>

            {/* Selected Doctor Modal */}
            {selectedDoctor && (
                <motion.div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-8 w-96"
                        initial={{ y: "-50%", opacity: 0 }}
                        animate={{ y: "0", opacity: 1 }}
                        exit={{ y: "-50%", opacity: 0 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">{selectedDoctor.name}'s Profile</h3>
                        <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                        <p><strong>Email:</strong> {selectedDoctor.email}</p>
                        <p><strong>Status:</strong> {selectedDoctor.status}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setSelectedDoctor(null)}
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

export default ManageAppointments;
