"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Animations
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'; // Icons for search/sorting
import {Pagination} from '../../components'; // Pagination Component (custom or a library)

const ManageMedicalRecords = () => {
    // Dummy medical records data
    const dummyMedicalRecords = [
        {
            id: 1,
            patientName: 'John Doe',
            recordDate: '2024-09-20',
            diagnosis: 'Hypertension',
            medications: 'Amlodipine 5mg daily',
            doctor: 'Dr. Smith',
        },
        {
            id: 2,
            patientName: 'Jane Doe',
            recordDate: '2024-09-18',
            diagnosis: 'Diabetes Type 2',
            medications: 'Metformin 500mg daily',
            doctor: 'Dr. Adams',
        },
        {
            id: 3,
            patientName: 'Michael Johnson',
            recordDate: '2024-09-15',
            diagnosis: 'Asthma',
            medications: 'Salbutamol inhaler as needed',
            doctor: 'Dr. Brown',
        },
        // Additional records...
    ];

    const [medicalRecords, setMedicalRecords] = useState(dummyMedicalRecords);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc' for sorting
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5; // Number of records per page

    // Dummy analytics data for chart or statistics
    const dummyAnalytics = {
        totalAppointments: 150,
        totalPatients: 80,
        averageEngagement: 75, // Percentage
        appointmentStats: [
            { status: 'Scheduled', count: 100 },
            { status: 'Completed', count: 40 },
            { status: 'Cancelled', count: 10 },
        ],
    };

    // Filtered records based on search term
    const filteredRecords = medicalRecords.filter(record =>
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting records by patient name or date
    const sortedRecords = [...filteredRecords].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.patientName.localeCompare(b.patientName);
        } else {
            return b.patientName.localeCompare(a.patientName);
        }
    });

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Toggle sort order between 'asc' and 'desc'
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Medical Records & Analytics</h2>

            {/* Overview Section */}
            <motion.div
                className="bg-white shadow-md rounded-lg p-6 mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} // Animation transition
            >
                <h3 className="text-2xl font-semibold mb-4">Platform Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h4 className="font-bold">Total Appointments</h4>
                        <p className="text-2xl">{dummyAnalytics.totalAppointments}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h4 className="font-bold">Total Patients</h4>
                        <p className="text-2xl">{dummyAnalytics.totalPatients}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h4 className="font-bold">Average Engagement</h4>
                        <p className="text-2xl">{dummyAnalytics.averageEngagement}%</p>
                    </div>
                </div>
            </motion.div>

            {/* Search and Sort */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by patient name..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>
                <button
                    onClick={toggleSortOrder}
                    className="flex items-center bg-gray-200 px-4 py-2 rounded-lg"
                >
                    {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                    <span className="ml-2">Sort by Name</span>
                </button>
            </div>

            {/* Medical Records Table */}
            <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} // Animation transition
            >
                <h3 className="text-2xl font-semibold mb-4">Patient Medical Records</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Patient</th>
                            <th className="px-4 py-2 text-left">Doctor</th>
                            <th className="px-4 py-2 text-left">Diagnosis</th>
                            <th className="px-4 py-2 text-left">Medications</th>
                            <th className="px-4 py-2 text-left">Record Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record) => (
                            <motion.tr
                                key={record.id}
                                className="border-b"
                                initial={{ opacity: 0, x: -20 }} // Initial position for the row
                                animate={{ opacity: 1, x: 0 }} // Final position for the row
                                transition={{ duration: 0.2 }} // Animation duration for the row
                            >
                                <td className="px-4 py-2">{record.patientName}</td>
                                <td className="px-4 py-2">{record.doctor}</td>
                                <td className="px-4 py-2">{record.diagnosis}</td>
                                <td className="px-4 py-2">{record.medications}</td>
                                <td className="px-4 py-2">{record.recordDate}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            <Pagination
                recordsPerPage={recordsPerPage}
                totalRecords={sortedRecords.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default ManageMedicalRecords;
