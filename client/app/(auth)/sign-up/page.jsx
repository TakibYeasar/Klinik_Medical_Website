import Image from 'next/image';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

const SignUp = () => {
    return (
        <div className="bg-gray-100 flex flex-col items-center justify-start">
            {/* Header Image */}
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

            {/* Sign-Up Form */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg mt-12 p-8">
                <h4 className="text-center text-2xl font-semibold text-primary-color border-b pb-4 mb-6">Create a new account</h4>

                <form className="space-y-6">
                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Username Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Username <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Confirm Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary-color text-white p-4 rounded-lg text-lg font-medium hover:bg-primary-dark transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Social Sign Up */}
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
