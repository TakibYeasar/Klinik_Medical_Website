"use client";

import { useEffect, useState } from 'react';
import { DocLeftSidebar, PatientList, AppointmentCalendar, FeedbackSection, DoctorProfile } from '../../../../../components';

const DoctorDashboard = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [docInfo, setDocInfo] = useState(null);

    // Dummy data
    const dummyPatients = [
        { id: 1, name: "Alice Smith", age: 30, lastVisit: "2024-09-20", history: "Heart check-up" },
        { id: 2, name: "Bob Johnson", age: 45, lastVisit: "2024-09-18", history: "Routine check-up" },
    ];

    const dummyAppointments = [
        { id: 1, date: "2024-09-30", time: "10:00 AM", patient: "Alice Smith" },
        { id: 2, date: "2024-10-01", time: "2:00 PM", patient: "Bob Johnson" },
    ];

    const dummyFeedbacks = [
        { patient: "Alice Smith", feedback: "Great doctor!" },
        { patient: "Bob Johnson", feedback: "Very professional." },
    ];

    const dummyDocInfo = {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        biography: "Experienced in treating heart conditions with compassion and care.",
        qualifications: "MD, PhD",
        achievements: "Board certified in cardiology.",
        languages_spoken: "English, Spanish",
        consultation_fees: 150,
        contact_number: "123-456-7890",
        email: "john.doe@example.com",
    };

    useEffect(() => {
        // Simulate fetching data
        setPatients(dummyPatients);
        setAppointments(dummyAppointments);
        setFeedbacks(dummyFeedbacks);
        setDocInfo(dummyDocInfo);
    }, []);

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <>
                        <DoctorProfile docInfo={docInfo} />
                        <button
                            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                            onClick={() => setActiveSection('editProfile')}
                        >
                            Edit Profile
                        </button>
                    </>
                );
            case 'editProfile':
                return <EditProfile docInfo={docInfo} setDocInfo={setDocInfo} />;
            case 'patients':
                return <PatientList patients={patients} />;
            case 'appointments':
                return <AppointmentCalendar appointments={appointments} />;
            case 'feedback':
                return <FeedbackSection feedbacks={feedbacks} />;
            default:
                return null;
        }
    };

    const EditProfile = ({ docInfo, setDocInfo }) => {
        const [formData, setFormData] = useState({ ...docInfo });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Here, you would typically send the updated data to your backend.
            setDocInfo(formData); // Update docInfo with the edited data
            alert("Profile updated successfully!");
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block">Specialty</label>
                    <input
                        type="text"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block">Biography</label>
                    <textarea
                        name="biography"
                        value={formData.biography}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block">Contact Number</label>
                    <input
                        type="text"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                    Save Changes
                </button>
            </form>
        );
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
                <h2 className="text-2xl font-bold mb-5">Doctor Dashboard</h2>
                <DocLeftSidebar setActiveSection={setActiveSection} />
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
                <header className="flex justify-between items-center py-6">
                    <h1 className="text-xl font-semibold">Welcome, {docInfo?.name}</h1>
                </header>

                <main className="flex flex-col space-y-14">
                    {renderActiveSection()}
                </main>
            </div>
        </div>
    );
};

export default DoctorDashboard;
