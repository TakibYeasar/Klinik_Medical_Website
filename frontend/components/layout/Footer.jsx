'use client';

import { FaEnvelope, FaFacebook, FaLinkedin, FaMapMarker, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import { useFetchContactInfoQuery } from '@/store/features/core/coreApi';

const Footer = () => {
  // Fetch contact info using Redux query
  const { data: info, isLoading, isError } = useFetchContactInfoQuery();

  // Display loading state while data is being fetched
  if (isLoading) {
    return <div className="bg-font-color pt-20 pb-20 text-center text-font-light">Loading...</div>;
  }

  // Display error state if fetching fails
  if (isError) {
    return <div className="bg-font-color pt-20 pb-20 text-center text-font-light">Error loading contact information.</div>;
  }

  return (
    <div className="bg-font-color pt-20 pb-20">
      <div className="container grid grid-cols-4 justify-between">

        {/* Contact Information */}
        {info?.map((item, i) => (
          <div key={i}>
            <h5 className="main-title text-font-light my-6">Address</h5>
            <p className="flex mb-2 text-font-light">
              <FaMapMarker className='mr-4' />{item?.address}
            </p>
            <p className="flex mb-2 text-font-light">
              <FaPhone className='mr-4' />{item?.phone}
            </p>
            <p className="flex mb-2 text-font-light">
              <FaEnvelope className='mr-4' />{item?.email}
            </p>
            <div className="flex pt-2">
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.twitter_link}>
                <FaTwitter className='icon' />
              </a>
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.facebook_link}>
                <FaFacebook className='icon' />
              </a>
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.youtube_link}>
                <FaYoutube className='icon' />
              </a>
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.linkedin_link}>
                <FaLinkedin className='icon' />
              </a>
            </div>
          </div>
        ))}

        {/* Services Section */}
        <div className="grid">
          <h5 className="main-title text-font-light no-underline my-6">Services</h5>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Cardiology</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Pulmonary</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Neurology</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Orthopedics</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Laboratory</a>
        </div>

        {/* Quick Links Section */}
        <div className="grid">
          <h5 className="main-title text-font-light no-underline my-6">Quick Links</h5>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">About Us</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Contact Us</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Our Services</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Terms & Condition</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Support</a>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h5 className="text-2xl font-semibold text-gray-800 mb-4">Newsletter</h5>
          <p className="text-gray-600 text-lg mb-6">
            Dolor amet sit justo amet elitr clita ipsum elitr est.
          </p>
          <div className="relative flex items-center">
            <input
              className="p-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Your email"
            />
            <button
              type="button"
              className="bg-blue-600 text-white rounded-md py-2 px-4 absolute right-2 hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="pt-6 pb-6 text-base border border-solid border-font-color">
        <div className="grid">
          <div className="md:col-span-6 text-center text-font-light">
            &copy; <a className="text-font-light no-underline hover:text-primary-color" href="#">Your Site Name</a>, All Right Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;