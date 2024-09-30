"use client";

import { FaSearch, FaUserCheck, FaCalendarAlt, FaCommentMedical } from "react-icons/fa";

const PatientOnboarding = () => {
    const steps = [
        {
            icon: <FaUserCheck size={32} className="text-blue-500" />,
            title: "Create Your Account",
            description: "Sign up with your email and personal details to start your healthcare journey.",
        },
        {
            icon: <FaSearch size={32} className="text-blue-500" />,
            title: "Find the Right Doctor",
            description: "Use our advanced search to find specialists, general practitioners, or healthcare facilities near you.",
        },
        {
            icon: <FaCalendarAlt size={32} className="text-blue-500" />,
            title: "Book an Appointment",
            description: "Easily schedule appointments online based on the doctor’s availability and your convenience.",
        },
        {
            icon: <FaCommentMedical size={32} className="text-blue-500" />,
            title: "Consult with a Doctor",
            description: "Join your appointment online or in-person and get expert medical advice for your health needs.",
        },
    ];

    return (
        <div className="container mx-auto py-12 px-6 lg:px-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Your Healthcare Journey
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Whether it's your first time on the platform or you need a refresher, here's a simple guide to help you navigate our services and get the care you need.
                </p>
            </div>

            {/* Steps Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-center mb-4">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 text-center">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Call-to-Action Section */}
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ready to Get Started?
                </h2>
                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                    Follow the steps above to easily navigate through our platform. Your health is our priority.
                </p>
                <button className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300">
                    Create Your Account
                </button>
            </div>
        </div>
    );
};

export default PatientOnboarding;
