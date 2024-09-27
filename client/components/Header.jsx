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

// Dynamically import Signin and SignUp to prevent SSR issues
const Signin = dynamic(() => import('./auth/SignIn'));
const SignUp = dynamic(() => import('./auth/SignUp'));

const Header = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    axiosInstance.get('/api/core/contactinfo/')
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    const handleBodyScroll = () => {
      if (showSignIn || showSignUp) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
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
      {info?.map((item, i) => (
        <div className="flex justify-between px-8 py-4 bg-secondary-color" key={i}>
          <div className="flex">
            <div className="items-center flex ml-3 mr-3">
              <FaMapMarker className="text-primary-color text-lg ml-2 mr-2" />
              <small className="text-font-color text-base">{item?.address}</small>
            </div>
            <div className="items-center flex contact">
              <FaClock className="text-primary-color text-lg ml-2 mr-2" />
              <small className="text-font-color text-base">{item?.time}</small>
            </div>
          </div>
          <div className="items-center flex">
            <div className="items-center flex contact">
              <FaPhone className="text-primary-color text-lg ml-2 mr-2" />
              <small className="text-font-color text-base">{item?.phone}</small>
            </div>
            {item?.facebook_link && (
              <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.facebook_link}>
                <FaFacebook className="text-xl text-primary-color" />
              </a>
            )}
            {item?.twitter_link && (
              <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.twitter_link}>
                <FaTwitter className="text-xl text-primary-color" />
              </a>
            )}
            {item?.linkedin_link && (
              <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.linkedin_link}>
                <FaLinkedin className="text-xl text-primary-color" />
              </a>
            )}
            {item?.instagram_link && (
              <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.instagram_link}>
                <FaInstagram className="text-xl text-primary-color" />
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Navigation */}
      <nav className="bg-bg-color flex justify-between items-center">
        <Link href="/" className="items-center pl-8">
          <h1 className="flex text-4xl font-bold">
            <FaHospital className="mr-2" />
            Klinik
          </h1>
        </Link>
        <div className="flex items-center">
          <Link href="/" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Home</Link>
          <Link href="/about" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">About</Link>
          <Link href="/doctors" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Doctors</Link>

          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link href="/dashboard" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                    Logout
                  </button>
                </>
              ) : user.role === 'doctor' ? (
                <>
                  <Link href="/doctor-portal" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                    Doctor Portal
                  </Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/appointment" className="flex bg-primary-color text-font-light text-lg font-medium outline-none no-underline p-6 items-center">
                    Appointment <FaArrowRight className="pl-2 text-2xl font-bold" />
                  </Link>
                  <Link href="/profile" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                    Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button onClick={() => setShowSignIn(true)} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                Sign In
              </button>
              <button onClick={() => setShowSignUp(true)} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">
                Sign Up
              </button>
            </>
          )}

        </div>
      </nav>

      {/* Modal Components */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <Signin />
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <SignUp />
            <button
              onClick={() => setShowSignUp(false)}
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
