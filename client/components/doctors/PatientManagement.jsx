import React, { useState } from 'react';

const PatientManagement = () => {
    // Dummy patient data
    const dummyPatients = [
        {
            id: 1,
            name: 'John Doe',
            medicalHistory: 'Hypertension, Allergies',
            treatmentPlan: 'Regular check-ups, medication for hypertension',
        },
        {
            id: 2,
            name: 'Jane Smith',
            medicalHistory: 'Diabetes, Asthma',
            treatmentPlan: 'Insulin therapy, asthma inhaler',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            medicalHistory: 'No significant medical history',
            treatmentPlan: 'Annual health check-up',
        },
    ];

    const [patients] = useState(dummyPatients);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [notes, setNotes] = useState('');
    const [prescription, setPrescription] = useState('');
    const [treatmentUpdate, setTreatmentUpdate] = useState('');

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setNotes('');
        setPrescription('');
        setTreatmentUpdate('');
    };

    const handleAddNote = () => {
        if (selectedPatient) {
            console.log(`Added note for ${selectedPatient.name}: ${notes}`);
            setNotes('');
        }
    };

    const handleAddPrescription = () => {
        if (selectedPatient) {
            console.log(`Added prescription for ${selectedPatient.name}: ${prescription}`);
            setPrescription('');
        }
    };

    const handleUpdateTreatment = () => {
        if (selectedPatient) {
            console.log(`Updated treatment for ${selectedPatient.name}: ${treatmentUpdate}`);
            setTreatmentUpdate('');
        }
    };

    return (
        <div className="p-5 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Patient Management</h2>

            <div className="flex space-x-4">
                <div className="w-1/4">
                    <h3 className="text-xl font-semibold mb-2">Patient List</h3>
                    <ul className="space-y-2">
                        {patients.map((patient) => (
                            <li key={patient.id}>
                                <button
                                    className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
                                    onClick={() => handlePatientSelect(patient)}
                                >
                                    {patient.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedPatient && (
                    <div className="w-3/4">
                        <h3 className="text-xl font-semibold mb-2">{selectedPatient.name}'s Profile</h3>
                        <p><strong>Medical History:</strong> {selectedPatient.medicalHistory}</p>
                        <p><strong>Treatment Plan:</strong> {selectedPatient.treatmentPlan}</p>

                        <div className="mt-5">
                            <h4 className="text-lg font-semibold mb-2">Add Note</h4>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add a note..."
                            />
                            <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={handleAddNote}>
                                Add Note
                            </button>
                        </div>

                        <div className="mt-5">
                            <h4 className="text-lg font-semibold mb-2">Add Prescription</h4>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={prescription}
                                onChange={(e) => setPrescription(e.target.value)}
                                placeholder="Add a prescription..."
                            />
                            <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={handleAddPrescription}>
                                Add Prescription
                            </button>
                        </div>

                        <div className="mt-5">
                            <h4 className="text-lg font-semibold mb-2">Update Treatment</h4>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={treatmentUpdate}
                                onChange={(e) => setTreatmentUpdate(e.target.value)}
                                placeholder="Update treatment..."
                            />
                            <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={handleUpdateTreatment}>
                                Update Treatment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientManagement;
