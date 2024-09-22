'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { FaArrowRight, FaClock, FaFacebook, FaHospital, FaInstagram, FaLinkedin, FaMapMarker, FaPhone, FaTwitter } from "react-icons/fa";
import Signin from '../app/(auth)/sign-in/page';
import SignUp from '../app/(auth)/sign-up/page';

const SignInModal = ({ closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Signin />
      <button onClick={closeModal} className="mt-4 text-gray-500 hover:text-black">Close</button>
    </div>
  </div>
);

const SignUpModal = ({ closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <SignUp />
      <button onClick={closeModal} className="mt-4 text-gray-500 hover:text-black">Close</button>
    </div>
  </div>
);

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
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }

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
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.facebook_link}><FaFacebook className="text-xl text-primary-color" /></a>
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.twitter_link}><FaTwitter className="text-xl text-primary-color" /></a>
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.linkedin_link}><FaLinkedin className="text-xl text-primary-color" /></a>
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.instagram_link}><FaInstagram className="text-xl text-primary-color" /></a>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <nav className="bg-bg-color flex justify-between items-center">
        <a href="/" className="items-center pl-8">
          <h1 className="flex text-4xl font-bold"><FaHospital className="mr-2" />Klinik</h1>
        </a>
        <div className="flex items-center">
          <a href="/" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Home</a>
          <a href="/aboutus" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">About</a>
          <a href="/contact" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Contact</a>

          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <a href="/dashboard" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Dashboard</a>
                  <button className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase" onClick={() => {/* Handle logout logic */ }}>Logout</button>
                </>
              ) : (
                <>
                  <a href="/appointment" className="flex bg-primary-color text-font-light text-lg font-medium outline-none no-underline p-6 items-center">Appointment <FaArrowRight className="pl-2 text-2xl font-bold" /></a>
                  <a href="/profile" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Profile</a>
                  <button className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase" onClick={() => {/* Handle logout logic */ }}>Logout</button>
                </>
              )}
            </>
          ) : (
            <>
              <button onClick={() => setShowSignIn(true)} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Sign In</button>
              <button onClick={() => setShowSignUp(true)} className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase">Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {/* Modal Components */}
      {showSignIn && <SignInModal closeModal={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpModal closeModal={() => setShowSignUp(false)} />}
    </div>
  );
};

export default Header;
