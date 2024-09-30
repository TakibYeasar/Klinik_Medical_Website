"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaUserMd, FaUserInjured, FaTrashAlt, FaPlus, FaSearch, FaEye, FaEdit
} from "react-icons/fa";
import { isEmail } from "validator"; // Import validator for form validation

const ManageUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Patient", profileUrl: "/profile/john" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Doctor", profileUrl: "/profile/jane" },
        { id: 3, name: "Michael Johnson", email: "michael@example.com", role: "Patient", profileUrl: "/profile/michael" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Patient" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Items per page for pagination

    const handleRoleChange = (id, newRole) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    };

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUser.name && isEmail(newUser.email)) {
            const newId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
            setUsers([...users, { id: newId, ...newUser, profileUrl: `/profile/${newUser.name.toLowerCase().replace(" ", "-")}` }]);
            setNewUser({ name: "", email: "", role: "Patient" });
            setIsModalOpen(false);
        } else {
            alert("Please fill in valid details.");
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Admin Dashboard - Manage Users</h2>

            {/* Search Bar and Add User Button */}
            <div className="flex items-center justify-between mb-6">
                <div className="relative w-1/2">
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full pl-10 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white rounded-lg p-3 flex items-center hover:bg-blue-700"
                >
                    <FaPlus className="mr-2" /> Add New User
                </button>
            </div>

            {/* User Management Table */}
            <motion.div
                className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600">
                            <th className="px-4 py-2 text-left font-semibold">Name</th>
                            <th className="px-4 py-2 text-left font-semibold">Email</th>
                            <th className="px-4 py-2 text-left font-semibold">Role</th>
                            <th className="px-4 py-2 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <motion.tr
                                key={user.id}
                                className="border-b text-gray-800"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <td className="px-4 py-3 flex items-center">
                                    {user.role === "Doctor" ? <FaUserMd className="text-blue-600 mr-2" /> : <FaUserInjured className="text-red-600 mr-2" />}
                                    {user.name}
                                </td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2 text-gray-600"
                                    >
                                        <option value="Patient">Patient</option>
                                        <option value="Doctor">Doctor</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3 flex space-x-2">
                                    <a href={user.profileUrl} className="bg-green-500 text-white rounded-lg p-2 hover:bg-green-600">
                                        <FaEye /> View
                                    </a>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal for Adding User */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-2xl font-bold mb-4">Add New User</h3>
                        <form onSubmit={handleAddUser}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="border border-gray-300 rounded-lg p-3 w-full"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="border border-gray-300 rounded-lg p-3 w-full"
                                    required
                                />
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    className="border border-gray-300 rounded-lg p-3 w-full"
                                >
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white rounded-lg p-3 hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700">
                                    Add User
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
