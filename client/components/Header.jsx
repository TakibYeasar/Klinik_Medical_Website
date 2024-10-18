'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, logoutUser } from '../redux/features/auth/authApi'; // Adjust the import path accordingly
import axios from 'axios';
import {
  FaArrowRight,
  FaClock,
  FaFacebook,
  FaHospital,
  FaInstagram,
  FaLinkedin,
  FaMapMarker,
  FaPhone,
  FaTwitter
} from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/core/contactinfo/');
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch current user and contact info on component mount
    dispatch(fetchCurrentUser());
    fetchContactInfo();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  return (
    <div>
      {/* Contact Info Section */}
      {info.map((item, index) => (
        <div className="flex justify-between px-8 py-4 bg-secondary-color" key={index}>
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
              <a href={item.facebook_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-xl text-primary-color" />
              </a>
            )}
            {item.twitter_link && (
              <a href={item.twitter_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl text-primary-color" />
              </a>
            )}
            {item.linkedin_link && (
              <a href={item.linkedin_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl text-primary-color" />
              </a>
            )}
            {item.instagram_link && (
              <a href={item.instagram_link} className="h-8 w-8 flex items-center justify-center mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
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
              {path === '/' ? 'Home' : path.slice(1)}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              {user && user.role === 'admin' && (  // Check if user is defined
                <>
                  <Link href="/dashboard" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Dashboard</Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Logout</button>
                </>
              )}
              {user && user.role === 'doctor' && (  // Check if user is defined
                <>
                  <Link href="/doctor-portal" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Doctor Portal</Link>
                  <button onClick={handleLogout} className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Logout</button>
                </>
              )}
              {user && user.role === 'patient' && (  // Check if user is defined
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
              <Link href="/signin" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Sign In</Link>
              <Link href="/signup" className="mt-2 mb-2 mx-4 text-font-color text-base font-medium uppercase">Sign Up</Link>
            </>
          )}

        </div>
      </nav>
    </div>
  );
};

export default Header;
