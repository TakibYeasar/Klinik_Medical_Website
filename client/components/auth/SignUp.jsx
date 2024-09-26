import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // For dynamically loading SignIn component in modals
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

// Dynamically load SignIn component for better performance
const Signin = dynamic(() => import('./SignIn'), { ssr: false });

const SignUp = () => {
    const [showSignIn, setShowSignIn] = useState(false);

    const handleSignInClick = () => {
        setShowSignIn(true);
    };

    const closeModal = () => {
        setShowSignIn(false);
    };

    return (
        <div className="container flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Account</h2>

                {/* Form Section */}
                <form className="space-y-6" role="form">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Username Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Choose a username"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-md shadow-lg font-medium hover:bg-secondary transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Social Sign-Up Section */}
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

                {/* Sign In Link */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <button
                            type="button"
                            onClick={handleSignInClick}
                            className="text-primary font-medium ml-1 hover:text-secondary transition duration-300"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>

            {/* Sign In Modal */}
            {showSignIn && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 w-1/3">
                        <Signin onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
