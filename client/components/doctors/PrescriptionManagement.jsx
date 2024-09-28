"use client";

import React, { useState } from 'react';

const PrescriptionManagement = ({ prescriptions, addPrescription, updatePrescription, deletePrescription }) => {
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [refills, setRefills] = useState(0);
    const [history, setHistory] = useState(prescriptions || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    const handleAddPrescription = () => {
        if (medication && dosage) {
            const newPrescription = { medication, dosage, refills, date: new Date().toLocaleDateString() };
            addPrescription(newPrescription);
            setHistory([...history, newPrescription]);
            clearForm();
        }
    };

    const handleEditPrescription = (prescription) => {
        setMedication(prescription.medication);
        setDosage(prescription.dosage);
        setRefills(prescription.refills);
        setSelectedPrescription(prescription);
    };

    const handleUpdatePrescription = () => {
        if (selectedPrescription) {
            const updatedPrescription = { ...selectedPrescription, medication, dosage, refills };
            updatePrescription(updatedPrescription);
            const updatedHistory = history.map(prescription =>
                prescription === selectedPrescription ? updatedPrescription : prescription
            );
            setHistory(updatedHistory);
            clearForm();
        }
    };

    const handleDeletePrescription = (prescription) => {
        deletePrescription(prescription);
        setHistory(history.filter(p => p !== prescription));
    };

    const clearForm = () => {
        setMedication('');
        setDosage('');
        setRefills(0);
        setSelectedPrescription(null);
    };

    const filteredHistory = history.filter(prescription =>
        prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="prescription-management" className='mt-6'>
            <h3 className='font-semibold text-lg text-gray-900'>Prescription Management</h3>

            {/* Prescription Search */}
            <div className='mt-4'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Medication Name"
                    className='border border-gray-300 rounded p-2 w-full mb-3'
                />
            </div>

            {/* Prescription Form */}
            <div className='mt-4 bg-white p-5 rounded shadow-sm'>
                <h4 className='font-medium text-md text-gray-800'>{selectedPrescription ? 'Edit Prescription' : 'Create New Prescription'}</h4>
                <div className='mt-3'>
                    <input
                        type="text"
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                        placeholder="Medication Name"
                        className='border border-gray-300 rounded p-2 w-full mb-3'
                    />
                    <input
                        type="text"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        placeholder="Dosage"
                        className='border border-gray-300 rounded p-2 w-full mb-3'
                    />
                    <input
                        type="number"
                        value={refills}
                        onChange={(e) => setRefills(e.target.value)}
                        placeholder="Number of Refills"
                        className='border border-gray-300 rounded p-2 w-full mb-3'
                    />
                    <button
                        onClick={selectedPrescription ? handleUpdatePrescription : handleAddPrescription}
                        className='bg-primary text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-primary-dark transition duration-200'
                    >
                        {selectedPrescription ? 'Update Prescription' : 'Add Prescription'}
                    </button>
                    {selectedPrescription && (
                        <button
                            onClick={clearForm}
                            className='bg-red-500 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-red-600 transition duration-200 ml-2'
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Prescription History Section */}
            <div className='mt-6'>
                <h4 className='font-medium text-md text-gray-800'>Prescription History</h4>
                <ul className='mt-2 space-y-2'>
                    {filteredHistory.length > 0 ? filteredHistory.map((prescription, index) => (
                        <li key={index} className='border p-4 rounded shadow-sm bg-white flex justify-between items-center'>
                            <div>
                                <p className='font-semibold'>Medication: {prescription.medication}</p>
                                <p className='text-sm text-gray-600'>Dosage: {prescription.dosage}</p>
                                <p className='text-sm text-gray-600'>Refills: {prescription.refills}</p>
                                <p className='text-sm text-gray-600'>Date: {prescription.date}</p>
                            </div>
                            <div className='flex space-x-2'>
                                <button
                                    onClick={() => handleEditPrescription(prescription)}
                                    className='bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePrescription(prescription)}
                                    className='bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600'
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    )) : (
                        <p className='text-gray-500'>No prescription history available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PrescriptionManagement;
