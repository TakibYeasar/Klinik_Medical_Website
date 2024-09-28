import React from "react";

const PetLeftSidebar = ({ selectedItem, onSelect }) => {
    return (
        <div className="w-1/4 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-5">Profile Menu</h2>
            <ul className="space-y-4">
                <li>
                    <button
                        className={`${selectedItem === "myProfile" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("myProfile")}
                    >
                        My Profile
                    </button>
                </li>
                <li>
                    <button
                        className={`${selectedItem === "medicalHistory" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("medicalHistory")}
                    >
                        My Appointments
                    </button>
                </li>
                <li>
                    <button
                        className={`${selectedItem === "medicalRecordsAccess" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("medicalRecordsAccess")}
                    >
                        Medical Records Access
                    </button>
                </li>
                <li>
                    <button
                        className={`${selectedItem === "healthTracking" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("healthTracking")}
                    >
                        Health Tracking
                    </button>
                </li>
                <li>
                    <button
                        className={`${selectedItem === "paymentHistory" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("paymentHistory")}
                    >
                        Payment History
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default PetLeftSidebar;
