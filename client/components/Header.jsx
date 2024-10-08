'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  FaTwitter
} from "react-icons/fa";

const Header = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);

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

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // Added empty dependency array to prevent infinite calls

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
              {path === '/' ? 'Home' : path.slice(1)}
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
