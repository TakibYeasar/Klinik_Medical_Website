"use client";

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useRouter } from 'next/router';
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const RelatedDoctors = ({ docId, speciality }) => {
  const [relDoc, setRelDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedDoctors = async () => {
      try {
        const response = await axiosInstance.get('/api/core/doctor/');
        const filteredDoctors = response.data.filter(doc => doc.speciality === speciality && doc._id !== docId);
        setRelDocs(filteredDoctors);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRelatedDoctors();
  }, [speciality, docId]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const navigateTo = (url) => {
    router.push(url);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container my-20 text-center">
      <p className="border border-primary-color rounded-full px-4 py-2 w-60 text-center text-xl font-medium">Related Doctors</p>
      <h1 className='main-title'>Explore Similar Doctors</h1>

      <div className="grid grid-flow-col grid-cols-3 gap-4">
        {relDoc.slice(0, 5).map((item, index) => (
          <div key={index} className="my-8 cursor-pointer transition-all duration-500 hover:translate-y-[-10px]" onClick={() => navigateTo(`/appointment/${item._id}`)}>
            <img className="top-0 transition duration-500 group-hover/item:t-[-30px]" src={item?.image} alt={item?.name} />
            <div className="transition duration-500 h-28 bg-secondary-color p-4 items-center">
              <h5 className='text-xl font-medium'>{item?.name}</h5>
              <p className="text-xl font-normal text-primary-color">{item?.speciality}</p>
              <div className="flex transition duration-500 text-center">
                {item?.linkedin_link && <a className="bg-bg-color p-2 rounded-full m-2" href={item?.linkedin_link}><FaLinkedin className='inline-flex text-primary-color text-3xl' /></a>}
                {item?.twitter_link && <a className="bg-bg-color p-2 rounded-full m-2" href={item?.twitter_link}><FaTwitter className='inline-flex text-primary-color text-3xl' /></a>}
                {item?.instagram_link && <a className="bg-bg-color p-2 rounded-full m-2" href={item?.instagram_link}><FaInstagram className='inline-flex text-primary-color text-3xl' /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigateTo('/doctors')} className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10'>
        More Doctors
      </button>
    </div>
  );
};

export default RelatedDoctors;
