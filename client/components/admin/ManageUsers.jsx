"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

const ManageUsers = () => {
    // Dummy data for users
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Patient' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Doctor' },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'Patient' },
    ]);

    const handleRoleChange = (id, newRole) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">User Management</h2>

            {/* User Management Table */}
            <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} // Animation transition
            >
                <h3 className="text-2xl font-semibold mb-4">Manage Users</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <motion.tr
                                key={user.id}
                                className="border-b"
                                initial={{ opacity: 0, x: -20 }} // Initial position for the row
                                animate={{ opacity: 1, x: 0 }} // Final position for the row
                                transition={{ duration: 0.2 }} // Animation duration for the row
                            >
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="border border-gray-300 rounded-lg p-1"
                                    >
                                        <option value="Patient">Patient</option>
                                        <option value="Doctor">Doctor</option>
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ManageUsers;
