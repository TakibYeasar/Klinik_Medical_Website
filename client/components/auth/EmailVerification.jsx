import React, { useState } from 'react';

const EmailVerification = ({ onClose }) => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        // Implement the OTP verification logic here
        if (otp === '123456') { // Example OTP check
            setMessage('Email verified successfully!');
            // Add logic to redirect or close modal
            setTimeout(onClose, 2000); // Close after 2 seconds
        } else {
            setMessage('Invalid OTP. Please try again.');
        }
    };

    return (
        <div>
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
                >
                    Verify
                </button>

                {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
            </form>

            <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-800">
                Cancel
            </button>
        </div>
    );
};

export default EmailVerification;
