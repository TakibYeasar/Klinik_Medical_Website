'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { verifyEmail } from '../../../../redux/features/auth/authApi'; // Adjust the path as per your file structure

const EmailVerification = () => {
    const [otp, setOtp] = useState(''); // State for storing OTP input
    const dispatch = useDispatch(); // Initialize dispatch for Redux
    const router = useRouter(); // Initialize useRouter
    const { loading, error } = useSelector((state) => state.auth); // Access loading and error from the auth slice
    const [message, setMessage] = useState(''); // State for messages

    const handleOtpChange = (e) => {
        setOtp(e.target.value); // Update OTP state on change
    };

    const handleVerify = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Dispatch the verifyEmail action and handle the success/failure
        dispatch(verifyEmail(otp))
            .unwrap() // Unwrap to handle the response directly
            .then((response) => {
                setMessage(response.message); // Set success message from response
                setTimeout(handleClose, 2000); // Close modal after 2 seconds
            })
            .catch((err) => {
                // Handle error messages based on backend response
                const errorMessage = err.response?.data?.message || 'Invalid OTP. Please try again.';
                setMessage(errorMessage); // Set error message
            });
    };

    const handleClose = () => {
        // Close the pop-up and redirect to the homepage
        router.push('/'); // Redirect to homepage
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify Your Email</h2>
                <form onSubmit={handleVerify}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter OTP <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            placeholder="Enter the OTP sent to your email"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition duration-300"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Verifying...' : 'Verify'} {/* Change button text based on loading state */}
                    </button>

                    {message && <p className={`mt-2 text-sm ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                    {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>} {/* Display error from Redux state */}
                </form>

                <button onClick={handleClose} className="mt-4 text-gray-600 hover:text-gray-800">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
