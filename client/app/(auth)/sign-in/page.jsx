import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import Image from 'next/image';

const Signin = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
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
                        <li>Authentication</li>
                    </ul>
                </div>
            </div>

            {/* Sign-in Form */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg mt-12 p-8">
                <h4 className="text-center text-2xl font-semibold text-primary-color border-b pb-4 mb-6">Sign in</h4>
                <p className="text-center text-gray-600 text-lg mb-8">Hello, Welcome to your account.</p>

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

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-lg mb-2">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="text-primary-color hover:underline">Forgot your password?</a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary-color text-white p-4 rounded-lg text-lg font-medium hover:bg-primary-dark transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Social Sign-in */}
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
