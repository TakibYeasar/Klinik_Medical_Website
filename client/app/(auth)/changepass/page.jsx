import React from 'react';
import Link from 'next/link';

const ChangePassword = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Change Your Password</h2>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                            id="currentPassword"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Enter current password"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Change Password
                    </button>
                </form>

                <div className="text-center mt-6">
                    {/* Use Link for Next.js navigation */}
                    <Link href="/profile" className="text-sm text-primary hover:text-secondary transition duration-300">
                            Back to Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
