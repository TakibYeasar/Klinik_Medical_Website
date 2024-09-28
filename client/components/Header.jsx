'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';  // Import Link for client-side navigation
import axiosInstance from '../axios';
import {
  FaArrowRight,
  FaClock,
  FaFacebook,
  FaHospital,
  FaInstagram,
  FaLinkedin,
  FaMapMarker,
  FaPhone,
  FaTimes,
  FaTwitter
} from "react-icons/fa";
import dynamic from 'next/dynamic';

// Dynamically import SignIn and SignUp to prevent SSR issues
const Signin = dynamic(() => import('./auth/SignIn'));
const SignUp = dynamic(() => import('./auth/SignUp'));

const Header = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/core/contactinfo/');
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();

    const handleBodyScroll = () => {
      document.body.style.overflow = showSignIn || showSignUp ? 'hidden' : 'auto';
    };

    handleBodyScroll();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSignIn, showSignUp]);

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }

  const handleLogout = () => {
    // Implement logout logic
  };

  return (
    <div>
      {/* Contact Info Section */}
      {info.map((item, i) => (
        <div className="flex justify-between px-8 py-4 bg-secondary-color" key={i}>
          <div className="flex">
            <div className="flex items-center mx-3">
              <FaMapMarker className="text-primary-color text-lg" />
              <small className="text-font-color text-base">{item.address}</small>
            </div>
            <div className="flex items-center mx-3">
              <FaClock className="text-primary-color text-lg" />
              <small className="text-font-color text-base">{item.time}</small>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mx-3">
              <FaPhone className="text-primary-color text-lg" />
              <small className="text-font-color text-base">{item.phone}</small>
            </div>
            {item.facebook_link && (
              <a href={item.facebook_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full">
                <FaFacebook className="text-xl text-primary-color" />
              </a>
            )}
            {item.twitter_link && (
              <a href={item.twitter_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full">
                <FaTwitter className="text-xl text-primary-color" />
              </a>
            )}
            {item.linkedin_link && (
              <a href={item.linkedin_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full">
                <FaLinkedin className="text-xl text-primary-color" />
              </a>
            )}
            {item.instagram_link && (
              <a href={item.instagram_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full">
                <FaInstagram className="text-xl text-primary-color" />
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Navigation */}
      <nav className="bg-bg-color flex justify-between items-center">
        <Link href="/" className="pl-8">
          <h1 className="flex text-4xl font-bold">
            <FaHospital className="mr-2" />
            Klinik
          </h1>
        </Link>
        <div className="flex items-center">
          {['/', '/about', '/doctors'].map((path, index) => (
            <Link key={index} href={path} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">
              {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          ))}
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link href="/dashboard" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Dashboard</Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Logout</button>
                </>
              ) : user.role === 'doctor' ? (
                <>
                  <Link href="/doctor-portal" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Doctor Portal</Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/appointment" className="flex bg-primary-color text-font-light text-lg font-medium outline-none no-underline p-6 items-center">
                    Appointment <FaArrowRight className="pl-2 text-2xl font-bold" />
                  </Link>
                  <Link href="/profile" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Profile</Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Logout</button>
                </>
              )}
            </>
          ) : (
            <>
              <button onClick={() => setShowSignIn(true)} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Sign In</button>
              <button onClick={() => setShowSignUp(true)} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {/* Modal Components */}
      {(showSignIn || showSignUp) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Conditionally render the SignIn or SignUp component */}
            {showSignIn ? <Signin /> : <SignUp />}

            {/* Close Button */}
            <button
              onClick={() => { setShowSignIn(false); setShowSignUp(false); }}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>
        </div>

      )}
    </div>
  );
};

export default Header;
