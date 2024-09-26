"use client";

import { useEffect, useState } from 'react';
import { DocLeftSidebar, PatientList, AppointmentCalendar, FeedbackSection, DoctorProfile } from '../../../../components';

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
                return <DoctorProfile docInfo={docInfo} />;
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
