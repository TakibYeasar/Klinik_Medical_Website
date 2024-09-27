"use client";

import React, { useState } from 'react';

// Dummy data for user roles
const dummyRoles = [
    { id: 1, roleName: 'Admin', permissions: ['Manage Users', 'View Reports', 'Edit Settings'] },
    { id: 2, roleName: 'Doctor', permissions: ['View Patients', 'Manage Appointments'] },
    { id: 3, roleName: 'Receptionist', permissions: ['Schedule Appointments', 'View Billing'] },
];

const SystemSettings = () => {
    const [roles, setRoles] = useState(dummyRoles);
    const [newRole, setNewRole] = useState({ roleName: '', permissions: [] });
    const [dashboardSettings, setDashboardSettings] = useState({
        showAppointments: true,
        showAnalytics: true,
        showBilling: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddRole = () => {
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

    const handleToggleDashboardSetting = (setting) => {
        setDashboardSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">System Settings and Customization</h2>

            {/* User Roles Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">User Roles Management</h3>
                <table className="min-w-full table-auto mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Role Name</th>
                            <th className="px-4 py-2 text-left">Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id} className="border-b">
                                <td className="px-4 py-2">{role.roleName}</td>
                                <td className="px-4 py-2">{role.permissions.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add New Role Section */}
                <h4 className="text-xl font-semibold mb-2">Add New Role</h4>
                <input
                    type="text"
                    name="roleName"
                    value={newRole.roleName}
                    onChange={handleInputChange}
                    placeholder="Role Name"
                    className="border rounded p-2 mb-2 w-full"
                />
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

            {/* Dashboard Customization Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Dashboard Customization</h3>
                <div className="flex flex-col mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={dashboardSettings.showAppointments}
                            onChange={() => handleToggleDashboardSetting('showAppointments')}
                            className="mr-2"
                        />
                        Show Appointments
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={dashboardSettings.showAnalytics}
                            onChange={() => handleToggleDashboardSetting('showAnalytics')}
                            className="mr-2"
                        />
                        Show Analytics
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={dashboardSettings.showBilling}
                            onChange={() => handleToggleDashboardSetting('showBilling')}
                            className="mr-2"
                        />
                        Show Billing
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
