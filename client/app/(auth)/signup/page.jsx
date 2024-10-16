'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { registerUser } from '../../../redux/features/auth/authApi';

const SignUp = () => {
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize useRouter
    const { loading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });

    const [selectedRole, setSelectedRole] = useState('patient');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.confirm_password) {
            const result = await dispatch(registerUser({ ...formData, role: selectedRole }));

            if (result?.payload?.success) {
                // Redirect to the /verifyemail page upon successful signup and pass message in query parameters
                const message = encodeURIComponent(result.payload.message);
                router.push(`/verifyemail?message=${message}`);
            } else {
                alert('Sign up failed! Please try again.');
            }
        } else {
            alert("Passwords do not match!");
        }
    };

    const handleClose = () => {
        // Close the pop-up and redirect to the homepage
        router.push('/');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-y-auto max-h-[80vh]" style={{ paddingTop: '10vh', paddingBottom: '10vh' }}>
                <button onClick={handleClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
                    &#x2715; {/* Close button */}
                </button>

                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Account</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

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
                            name="email"
                            required
                            onChange={handleChange}
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
                            name="username"
                            required
                            onChange={handleChange}
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
                            name="first_name"
                            required
                            onChange={handleChange}
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
                            name="last_name"
                            required
                            onChange={handleChange}
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
                            name="password"
                            required
                            onChange={handleChange}
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
                            name="confirm_password"
                            required
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white py-3 rounded-md shadow-lg font-medium hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
