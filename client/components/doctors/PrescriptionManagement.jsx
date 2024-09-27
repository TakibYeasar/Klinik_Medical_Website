import React, { useState } from 'react';

const PrescriptionManagement = ({ prescriptions, addPrescription }) => {
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [refills, setRefills] = useState(0);
    const [history, setHistory] = useState(prescriptions || []);

    const handleAddPrescription = () => {
        if (medication && dosage) {
            const newPrescription = { medication, dosage, refills, date: new Date().toLocaleDateString() };
            addPrescription(newPrescription);
            setHistory([...history, newPrescription]);
            setMedication('');
            setDosage('');
            setRefills(0);
        }
    };

    return (
        <div id="prescription-management" className='mt-6'>
            <h3 className='font-semibold text-lg text-gray-900'>Prescription Management</h3>

            {/* Prescription Form */}
            <div className='mt-4 bg-white p-5 rounded shadow-sm'>
                <h4 className='font-medium text-md text-gray-800'>Create New Prescription</h4>
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
                        onClick={handleAddPrescription}
                        className='bg-primary text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-primary-dark transition duration-200'
                    >
                        Add Prescription
                    </button>
                </div>
            </div>

            {/* Prescription History Section */}
            <div className='mt-6'>
                <h4 className='font-medium text-md text-gray-800'>Prescription History</h4>
                <ul className='mt-2 space-y-2'>
                    {history.length > 0 ? history.map((prescription, index) => (
                        <li key={index} className='border p-4 rounded shadow-sm bg-white'>
                            <p className='font-semibold'>Medication: {prescription.medication}</p>
                            <p className='text-sm text-gray-600'>Dosage: {prescription.dosage}</p>
                            <p className='text-sm text-gray-600'>Refills: {prescription.refills}</p>
                            <p className='text-sm text-gray-600'>Date: {prescription.date}</p>
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
