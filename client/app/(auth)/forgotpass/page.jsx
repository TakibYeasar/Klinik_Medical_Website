'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { passwordReset } from '../../../redux/features/auth/authApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loading, error } = useSelector((state) => state.auth);

    // Extract uid and token from URL parameters if available
    const uidb64 = searchParams.get('uidb64');
    const token = searchParams.get('token');

    const handleClose = () => {
        router.push('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch passwordReset with necessary data
            const resultAction = await dispatch(passwordReset({ email, uidb64, token }));
            if (passwordReset.fulfilled.match(resultAction)) {
                toast.success('Reset link sent to your email!');
            } else {
                // Display error message if dispatch fails
                const errorMessage = typeof resultAction.payload === 'object'
                    ? JSON.stringify(resultAction.payload)
                    : resultAction.payload || 'Failed to send reset link.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
                <button onClick={handleClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
                    &#x2715;
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Forgot Password</h2>
                <p className="text-center text-gray-600 mb-4">
                    Enter your email address below, and we’ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white py-3 rounded-md font-medium transition duration-300 ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'}`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-sm text-center mt-2">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </p>
                )}

                <div className="text-center mt-6">
                    <Link href="/signin" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                        Remember your password? Sign in
                    </Link>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default ForgotPassword;
