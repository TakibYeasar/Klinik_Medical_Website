"use client";

import React, { useState } from "react";
import { MyAppointments, PetLeftSidebar, RegisterForm } from "../../../../components";

const MyProfile = () => {
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

  const handleEditProfile = () => {
    setSelectedItem("register");
  };

  const renderProfileInfo = () => (
    <div className="w-full lg:w-3/4 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Profile Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="font-medium capitalize text-gray-600">
              {key.replace(/_/g, " ")}
            </label>
            <p className="text-gray-800">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="w-full lg:w-3/4 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Medical History</h2>
      <MyAppointments />
    </div>
  );

  const renderRegisterForm = () => (
    <div className="w-full lg:w-3/4 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Edit Profile</h2>
      <RegisterForm userData={userData} setUserData={setUserData} />
    </div>
  );

  const renderContent = () => {
    switch (selectedItem) {
      case "profile":
        return renderProfileInfo();
      case "appointments":
        return renderAppointments();
      case "register":
        return renderRegisterForm();
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <PetLeftSidebar
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        className="w-1/4 bg-gray-800 text-white min-h-screen p-5"
      />

      {/* Main Content */}
      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-xl font-semibold">My Profile</h1>
        </header>

        <main className="flex flex-col space-y-14">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MyProfile;
