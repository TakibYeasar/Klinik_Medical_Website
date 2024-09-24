"use client";

import React, { useState } from "react";
import { MyAppointments, PetLeftSidebar, RegisterForm } from "../../../../components";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState("profile");
  const [userData, setUserData] = useState({
    first_name: "Edward",
    last_name: "Vincent",
    email: "mirajhowlader@gmail.com",
    phone: "+88 0123 654 458",
    birth_date: "2012-03-21",
    gender: "Male",
    address: "456th Cross Richard, Circle Church Road London",
    occupation: "Software Developer",
    marital_status: "Single",
    blood_type: "O+",
    nationality: "British",
    languages_spoken: "English, French",
    emergency_contact_name: "John Doe",
    emergency_contact_number: "+88 0123 654 999",
    emergency_contact_relationship: "Brother",
    insurance_provider: "ABC Insurance",
    insurance_policy_number: "123456789",
    allergies: "None",
    current_medication: "None",
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "profile":
        return (
          <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="flex flex-col gap-4 text-sm">
              {Object.entries(userData).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                  <label className="font-medium capitalize">{key.replace("_", " ")}</label>
                  {isEdit ? (
                    <input
                      type="text"
                      className="border p-2"
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              {isEdit ? (
                <button
                  className="border border-primary px-4 py-2 rounded-lg"
                  onClick={() => setIsEdit(false)}
                >
                  Save Information
                </button>
              ) : (
                <button
                  className="border border-primary px-4 py-2 rounded-lg"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        );
      case "appointments":
        return (
          <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold mb-4">Appointments</h2>
            <MyAppointments />
          </div>
        );
      case "register":
        return (
          <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <RegisterForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <PetLeftSidebar selectedItem={selectedItem} onSelect={setSelectedItem} />
      {renderContent()}
    </div>
  );
};

export default MyProfile;
