'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  FaArrowRight, FaClock, FaFacebook, FaHospital,
  FaInstagram, FaLinkedin, FaMapMarker, FaPhone, FaTwitter
} from 'react-icons/fa';
import { useCurrentUserQuery, useLogoutMutation } from '../../store/features/auth/authApi';
import { useFetchContactInfoQuery } from '@/store/features/core/coreApi';

const Header = () => {
  const router = useRouter();
  const { data: user } = useCurrentUserQuery();
  const { data: info } = useFetchContactInfoQuery();
  const [logout] = useLogoutMutation();

  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  

  return (
    <header>
      {info && info.length > 0 && (
        <div className="bg-secondary-color px-8 py-4">
          {info.map((item, index) => (
            <div className="flex justify-between" key={index}>
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
                {/* Social Links */}
                {item.facebook_link && (
                  <a href={item.facebook_link} className="h-8 w-8 mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-xl text-primary-color" />
                  </a>
                )}
                {item.twitter_link && (
                  <a href={item.twitter_link} className="h-8 w-8 mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-xl text-primary-color" />
                  </a>
                )}
                {item.linkedin_link && (
                  <a href={item.linkedin_link} className="h-8 w-8 mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-xl text-primary-color" />
                  </a>
                )}
                {item.instagram_link && (
                  <a href={item.instagram_link} className="h-8 w-8 mx-2 p-2 bg-font-light rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-xl text-primary-color" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <nav className="bg-bg-color flex justify-between items-center px-8 py-4">
        <Link href="/">
          <p className="flex items-center text-4xl font-bold">
            <FaHospital className="mr-2" />
            Klinik
          </p>
        </Link>
        <div className="flex items-center">
          <Link href="/" className="mx-4 text-font-color text-base font-medium uppercase">Home</Link>
          <Link href="/about" className="mx-4 text-font-color text-base font-medium uppercase">About</Link>
          <Link href="/doctors" className="mx-4 text-font-color text-base font-medium uppercase">Doctors</Link>

          {/* Conditional Links based on Role */}
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link href="/dashboard" className="mx-4 text-font-color text-base font-medium uppercase">Dashboard</Link>
              )}
              {user?.role === 'doctor' && (
                <Link href="/doctors/aadf/dashboard" className="mx-4 text-font-color text-base font-medium uppercase">Doctor Portal</Link>
              )}
              {user?.role === 'patient' && (
                <>
                  <Link href="/profile" className="mx-4 text-font-color text-base font-medium uppercase">Profile</Link>
                  <Link href="/appointment" className="bg-primary-color text-font-light text-lg font-medium px-6 py-2 flex items-center">
                    Appointment <FaArrowRight className="pl-2 text-2xl font-bold" />
                  </Link>
                </>
              )}
              <span onClick={handleLogout} className="mx-4 text-font-color text-base font-medium uppercase cursor-pointer">
                Logout
              </span>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="mx-4 text-font-color text-base font-medium uppercase">Sign In</Link>
              <Link href="/sign-up" className="mx-4 text-font-color text-base font-medium uppercase">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;