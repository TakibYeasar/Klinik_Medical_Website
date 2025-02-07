import React from "react";

const AdminLeftSidebar = ({ setActiveSection }) => {
    return (
        <ul className="space-y-4">
            <li>
                <button
                    onClick={() => setActiveSection("users")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Manage Users
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("doctors")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Manage Doctors
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("patients")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Manage Patients
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("appointments")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Manage Appointments
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("medicalRecords")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Medical Records
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("finance")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Finance Management
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("settings")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    System Settings
                </button>
            </li>
            <li>
                <button
                    onClick={() => setActiveSection("changepass")}
                    className="w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Change Password
                </button>
            </li>
        </ul>
    );
};

export default AdminLeftSidebar;
