"use client";

import React, { useState } from "react";

const PatientManagement = () => {
    // Dummy patient data
    const dummyPatients = [
        {
            id: 1,
            name: "John Doe",
            medicalHistory: "Hypertension, Allergies",
            treatmentPlan: "Regular check-ups, medication for hypertension",
        },
        {
            id: 2,
            name: "Jane Smith",
            medicalHistory: "Diabetes, Asthma",
            treatmentPlan: "Insulin therapy, asthma inhaler",
        },
        {
            id: 3,
            name: "Alice Johnson",
            medicalHistory: "No significant medical history",
            treatmentPlan: "Annual health check-up",
        },
    ];

    const [patients] = useState(dummyPatients);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [notes, setNotes] = useState("");
    const [prescription, setPrescription] = useState("");
    const [treatmentUpdate, setTreatmentUpdate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setNotes("");
        setPrescription("");
        setTreatmentUpdate("");
    };

    const handleAddNote = () => {
        if (selectedPatient) {
            console.log(`Added note for ${selectedPatient.name}: ${notes}`);
            setNotes("");
        }
    };

    const handleAddPrescription = () => {
        if (selectedPatient) {
            console.log(`Added prescription for ${selectedPatient.name}: ${prescription}`);
            setPrescription("");
        }
    };

    const handleUpdateTreatment = () => {
        if (selectedPatient) {
            console.log(`Updated treatment for ${selectedPatient.name}: ${treatmentUpdate}`);
            setTreatmentUpdate("");
        }
    };

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Patient Management System
                </h2>
                <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Patient List */}
                    <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Patient List</h3>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 mb-4"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ul className="space-y-3">
                            {filteredPatients.map((patient) => (
                                <li key={patient.id}>
                                    <button
                                        className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedPatient?.id === patient.id
                                                ? "bg-blue-100 border-blue-300"
                                                : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                                            }`}
                                        onClick={() => handlePatientSelect(patient)}
                                    >
                                        {patient.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Patient Profile */}
                    {selectedPatient && (
                        <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                {selectedPatient.name}'s Profile
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-lg text-gray-700">
                                        <strong>Medical History:</strong> {selectedPatient.medicalHistory}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-700">
                                        <strong>Treatment Plan:</strong> {selectedPatient.treatmentPlan}
                                    </p>
                                </div>
                            </div>

                            {/* Add Note */}
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Add Note</h4>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                    rows="4"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Enter patient notes..."
                                />
                                <button
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={handleAddNote}
                                >
                                    Add Note
                                </button>
                            </div>

                            {/* Add Prescription */}
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Add Prescription</h4>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                    rows="4"
                                    value={prescription}
                                    onChange={(e) => setPrescription(e.target.value)}
                                    placeholder="Enter prescription details..."
                                />
                                <button
                                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    onClick={handleAddPrescription}
                                >
                                    Add Prescription
                                </button>
                            </div>

                            {/* Update Treatment Plan */}
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Update Treatment Plan</h4>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                    rows="4"
                                    value={treatmentUpdate}
                                    onChange={(e) => setTreatmentUpdate(e.target.value)}
                                    placeholder="Update treatment plan..."
                                />
                                <button
                                    className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                    onClick={handleUpdateTreatment}
                                >
                                    Update Treatment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientManagement;
