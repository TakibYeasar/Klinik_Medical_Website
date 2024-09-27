"use client";

import { useEffect, useState } from 'react';
import {
    DocLeftSidebar,
    DoctorDetails,
    PatientManagement,
    AppointmentScheduling,
    PrescriptionManagement,
} from '../../../../../components';

const DoctorDashboard = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
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

    const dummyDocInfo = {
        id: 1,
        name: "Dr. John Doe",
        profilePhoto: "/path/to/profile-photo.jpg",
        bio: "Experienced cardiologist with over 10 years of practice. Passionate about providing the best care to patients and dedicated to continuous education.",
        specialties: ["Cardiology", "Hypertension", "Heart Failure"],
        education: [
            { degree: "MD", institution: "Harvard Medical School", year: 2012 },
            { degree: "BS in Biology", institution: "Stanford University", year: 2008 },
        ],
        ratings: 4.8,
        schedule: [
            { day: "Monday", time: "9:00 AM - 5:00 PM" },
            { day: "Tuesday", time: "10:00 AM - 4:00 PM" },
            { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
            { day: "Thursday", time: "10:00 AM - 4:00 PM" },
            { day: "Friday", time: "9:00 AM - 5:00 PM" },
        ],
        contact: {
            phone: "+1 (555) 123-4567",
            email: "johndoe@healthcare.com",
        },
        reviews: [
            { patient: "Jane Smith", review: "Dr. Doe is amazing! He took the time to explain everything and really listened.", rating: 5 },
            { patient: "John Appleseed", review: "Great doctor, very knowledgeable and friendly.", rating: 4 },
        ],
        socialLinks: {
            facebook: "https://facebook.com/doctorjohndoe",
            twitter: "https://twitter.com/doctorjohndoe",
            linkedin: "https://linkedin.com/in/doctorjohndoe",
        },
    };

    useEffect(() => {
        // Simulate fetching data
        setPatients(dummyPatients);
        setAppointments(dummyAppointments);
        setDocInfo(dummyDocInfo);
    }, []);

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'profile':
                return <DoctorDetails doctor={dummyDocInfo} />;
            case 'editProfile':
                return <EditProfile docInfo={docInfo} setDocInfo={setDocInfo} />;
            case 'patients':
                return <PatientManagement patients={patients} />;
            case 'appointments':
                return <AppointmentScheduling appointments={appointments} availableSlots={[]} selectedDate={""} setSelectedDate={() => { }} selectedTime={""} setSelectedTime={() => { }} />;
            case 'prescriptions':
                return <PrescriptionManagement />;
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
