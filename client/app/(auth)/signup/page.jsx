'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

const SignUp = ({ onClose }) => {
    const [selectedRole, setSelectedRole] = useState('patient');

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        // Handle sign-up logic here
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-y-auto max-h-[80vh]" style={{ paddingTop: '10vh', paddingBottom: '10vh' }}>
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
                    &#x2715; {/* Close button */}
                </button>

                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Account</h2>

                {/* Role Selection Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Your Role <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => setSelectedRole('patient')}
                            className={`flex-1 p-4 border rounded-md text-center ${selectedRole === 'patient' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                        >
                            Patient
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedRole('doctor')}
                            className={`flex-1 p-4 border rounded-md text-center ${selectedRole === 'doctor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                        >
                            Doctor
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <form className="space-y-6" onSubmit={handleSignUpSubmit} role="form">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 mb-4">Or sign up using</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" className="text-red-500 hover:text-red-700 transition duration-300">
                            <FaGoogle size={24} />
                        </a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 transition duration-300">
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link href="/signin" className="text-blue-600 font-medium ml-1 hover:text-blue-800 transition duration-300">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
