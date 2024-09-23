import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: ''
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
            const response = await axios.post('/api/auth/register/', formData); // Use your Django registration endpoint here
            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex flex-col justify-between py-12">
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
                        <li>Registration</li>
                    </ul>
                </div>
            </div>

            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-12 p-8">
                <h4 className="text-center text-2xl font-semibold text-primary-color border-b pb-4 mb-6">Create a new account</h4>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Email Address <span className="text-red-500">*</span></label>
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
                        <label className="text-gray-700 text-lg mb-2">Username <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">First Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Last Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Password <span className="text-red-500">*</span></label>
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

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Confirm Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary-color text-white p-4 rounded-lg text-lg font-medium hover:bg-primary-dark transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 mb-4">Or sign up with</p>
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

export default SignUp;
