import React, { useState } from 'react';
import Signin from './SignIn'; // Adjust the import path if necessary

const ResetPassword = () => {
    const [showSignIn, setShowSignIn] = useState(false);

    const handleSignInClick = () => {
        setShowSignIn(true);
    };

    const closeModal = () => {
        setShowSignIn(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Reset Your Password</h2>
                <p className="text-center text-gray-600 mb-4">
                    Please enter your new password below.
                </p>

                <form className="space-y-6" role="form">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-secondary transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={handleSignInClick}
                        className="text-sm text-primary hover:text-secondary transition duration-300"
                    >
                        Back to Sign In
                    </button>
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

export default ResetPassword;
