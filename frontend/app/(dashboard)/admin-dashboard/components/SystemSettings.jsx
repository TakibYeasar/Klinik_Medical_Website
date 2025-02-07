"use client";

import React, { useState } from 'react';

// Dummy data for user roles
const dummyRoles = [
    { id: 1, roleName: 'Admin', permissions: ['Manage Users', 'View Reports', 'Edit Settings'] },
    { id: 2, roleName: 'Doctor', permissions: ['View Patients', 'Manage Appointments'] },
    { id: 3, roleName: 'Receptionist', permissions: ['Schedule Appointments', 'View Billing'] },
];

// Preset permissions for common roles
const rolePresets = {
    Admin: ['Manage Users', 'View Reports', 'Edit Settings', 'View Billing', 'Manage Appointments'],
    Doctor: ['View Patients', 'Manage Appointments'],
    Receptionist: ['Schedule Appointments', 'View Billing'],
    Nurse: ['View Patients', 'Manage Appointments'],
};

const SystemSettings = () => {
    const [roles, setRoles] = useState(dummyRoles);
    const [newRole, setNewRole] = useState({ roleName: '', permissions: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [dashboardSettings, setDashboardSettings] = useState({
        showAppointments: true,
        showAnalytics: true,
        showBilling: true,
        showPatientRecords: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddRole = () => {
        if (!newRole.roleName) return alert("Role name can't be empty");
        setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
        setNewRole({ roleName: '', permissions: [] });
    };

    const handlePermissionChange = (permission) => {
        setNewRole((prev) => {
            const permissions = prev.permissions.includes(permission)
                ? prev.permissions.filter((p) => p !== permission)
                : [...prev.permissions, permission];
            return { ...prev, permissions };
        });
    };

    const handlePresetChange = (presetRole) => {
        setNewRole((prev) => ({
            ...prev,
            permissions: rolePresets[presetRole] || [],
        }));
    };

    const handleToggleDashboardSetting = (setting) => {
        setDashboardSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
    };

    const filteredRoles = roles.filter((role) =>
        role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">System Settings and Customization</h2>

            {/* Search for Roles */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">User Roles Management</h3>
                <input
                    type="text"
                    placeholder="Search roles..."
                    className="border rounded p-2 mb-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Displaying User Roles */}
                <table className="min-w-full table-auto mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Role Name</th>
                            <th className="px-4 py-2 text-left">Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoles.length ? (
                            filteredRoles.map((role) => (
                                <tr key={role.id} className="border-b">
                                    <td className="px-4 py-2">{role.roleName}</td>
                                    <td className="px-4 py-2">{role.permissions.join(', ')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2" colSpan="2">
                                    No roles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Add New Role Section */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">Add New Role</h4>
                    <div className="flex items-center mb-2">
                        <input
                            type="text"
                            name="roleName"
                            value={newRole.roleName}
                            onChange={handleInputChange}
                            placeholder="Role Name"
                            className="border rounded p-2 w-full mr-4"
                        />
                        <select
                            className="border rounded p-2"
                            onChange={(e) => handlePresetChange(e.target.value)}
                        >
                            <option value="">Select Preset</option>
                            {Object.keys(rolePresets).map((preset) => (
                                <option key={preset} value={preset}>
                                    {preset}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        {['Manage Users', 'View Reports', 'Edit Settings', 'View Patients', 'Manage Appointments', 'Schedule Appointments', 'View Billing'].map((permission) => (
                            <label key={permission} className="mr-4">
                                <input
                                    type="checkbox"
                                    checked={newRole.permissions.includes(permission)}
                                    onChange={() => handlePermissionChange(permission)}
                                />
                                {permission}
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={handleAddRole}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                        Add Role
                    </button>
                </div>
            </div>

            {/* Dashboard Customization Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Dashboard Customization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(dashboardSettings).map((setting) => (
                        <label className="flex items-center" key={setting}>
                            <input
                                type="checkbox"
                                checked={dashboardSettings[setting]}
                                onChange={() => handleToggleDashboardSetting(setting)}
                                className="mr-2"
                            />
                            {setting
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
