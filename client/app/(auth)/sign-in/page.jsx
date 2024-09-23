import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('/api/auth/login/', formData); // Use your Django login endpoint here
            setSuccessMessage('Login successful');
            // Optionally, you can store tokens or handle successful login
            // localStorage.setItem('access_token', response.data.access_token);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Invalid credentials, please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100">
            <div className="relative w-full h-80">
                <Image
                    src="/assets/header-page.jpg"
                    alt="Header Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                    <h1 className="text-white text-6xl font-semibold">About Us</h1>
                    <ul className="flex space-x-4 text-white mt-4">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Pages</a></li>
                        <li>Authentication</li>
                    </ul>
                </div>
            </div>

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg mt-12 p-10 mx-4">
                <h4 className="text-center text-3xl font-semibold text-primary-color border-b pb-6 mb-8">Sign in</h4>
                <p className="text-center text-gray-600 text-lg mb-8">Hello, Welcome to your account.</p>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-lg text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-lg text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary-color text-white p-4 rounded-lg text-lg font-medium hover:bg-primary-dark transition duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 mb-4">Or sign in with</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-xl text-facebook hover:text-facebook-dark">
                            <FaFacebook />
                        </a>
                        <a href="#" className="text-xl text-twitter hover:text-twitter-dark">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-xl text-google hover:text-google-dark">
                            <FaGoogle />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
