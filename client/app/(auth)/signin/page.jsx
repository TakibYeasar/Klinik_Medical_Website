'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Next.js 13 requires next/navigation
import { loginUser } from '../../../redux/features/auth/authApi';
import { resetAuthState } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Signin = () => {
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth); // Access auth state
    const router = useRouter(); // Initialize router

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('Login successful!'); // Display success toast
            router.push('/'); // Redirect to homepage on successful login
        }

        if (error) {
            toast.error(error.message || 'Login failed!'); // Show error message
        }

        return () => {
            dispatch(resetAuthState()); // Reset auth state on unmount
        };
    }, [isAuthenticated, error, dispatch, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })); // Dispatch login action
    };

    const handleClose = () => {
        // Close the pop-up and redirect to the homepage
        router.push('/');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    &#x2715; {/* Close button */}
                </button>
                <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Welcome to Klinik</h2>
                <p className="text-gray-600 text-center mb-8">Please sign in to access your medical information.</p>

                <form role="form" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Set email state
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Set password state
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <label className="inline-flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-500 transition duration-300"
                            />
                            <span className="ml-2 text-sm">Remember me</span>
                        </label>
                        <Link
                            href="/forgotpass"
                            className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg font-medium hover:bg-blue-700 transition duration-300"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Logging in...' : 'Login'} {/* Show loading state */}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?
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
