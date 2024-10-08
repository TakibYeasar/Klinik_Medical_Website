'use client';

import React from 'react';
import Link from 'next/link';

const ForgotPassword = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
                    &#x2715; {/* Close button */}
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Forgot Password</h2>
                <p className="text-center text-gray-600 mb-4">
                    Enter your email address below, and we’ll send you a link to reset your password.
                </p>

                <form className="space-y-6" role="form">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                        Remember your password? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
