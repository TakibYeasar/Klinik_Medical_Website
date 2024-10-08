'use client';

import React from 'react';
import Link from 'next/link';

const ResetPassword = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
                    &#x2715; {/* Close button */}
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Reset Your Password</h2>
                <p className="text-center text-gray-600 mb-4">
                    Please enter your new password below.
                </p>

                <form className="space-y-6" role="form">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link href="/signin" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
