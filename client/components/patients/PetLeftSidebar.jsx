import React from "react";

const PetLeftSidebar = ({ selectedItem, onSelect }) => {
    return (
        <div className="w-1/4 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-5">Profile Menu</h2>
            <ul className="space-y-4">
                <li>
                    <button
                        className={`${selectedItem === "profile" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("profile")}
                    >
                        My Profile
                    </button>
                </li>
                <li>
                    <button
                        className={`${selectedItem === "appointments" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("appointments")}
                    >
                        Appointments
                    </button>
                </li>
                <li>
                    <button
                        className={`${selectedItem === "register" ? "font-bold" : ""} text-lg`}
                        onClick={() => onSelect("register")}
                    >
                        Register
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default PetLeftSidebar;
