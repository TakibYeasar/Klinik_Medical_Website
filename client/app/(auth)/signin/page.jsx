'use client';

import Link from 'next/link';
import React from 'react';

const Signin = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
                    &#x2715; {/* Close button */}
                </button>
                <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Welcome to Klinik</h2>
                <p className="text-gray-600 text-center mb-8">Please sign in to access your medical information.</p>

                <form role="form">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <label className="inline-flex items-center text-gray-700">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 transition duration-300" />
                            <span className="ml-2 text-sm">Remember me</span>
                        </label>
                        <Link href="/forgotpass" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <Link href="/signup" className="text-blue-600 font-medium ml-1 hover:text-blue-800 transition duration-300">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
