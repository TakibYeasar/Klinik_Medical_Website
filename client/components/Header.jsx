'use client'
import axios from 'axios';
import axiosInstance from '../axios';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaClock, FaFacebook, FaHospital, FaInstagram, FaLinkedin, FaMapMarker, FaPhone, FaTwitter } from "react-icons/fa";

const Header = () => {

  const [IsLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.all([
      axiosInstance.get('/api/core/contactinfo/'),
    ]).then(axios.spread((res) => {
      setInfo(res.data)
      setIsLoading(false)
      // console.log(res.data);
    })).catch(err => {
      console.log(err);
    })
  }, [])

  if (IsLoading) {
    return <h3>loading ...</h3>
  }

  return (
    <div className="">
      {info?.map((item, i) => (
        <div className="flex justify-between px-8 py-4 bg-secondary-color" key={i}>
          <div className="flex">
            <div className="items-center flex ml-3 mr-3">
              <FaMapMarker className='text-primary-color text-lg ml-2 mr-2' />
              <small className='text-font-color text-base'>{item?.address}</small>
            </div>
            <div className="items-center flex contact">
              <FaClock className='text-primary-color text-lg ml-2 mr-2' />
              <small className='text-font-color text-base'>{item?.time}</small>
            </div>
          </div>

          <div className="items-center flex">

            <div className="items-center flex contact">
              <FaPhone className='text-primary-color text-lg ml-2 mr-2' />
              <small className='text-font-color text-base'>{item?.phone}</small>
            </div>

            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.facebook_link}><FaFacebook className='text-xl text-primary-color' /></a>
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.twitter_link}><FaTwitter className='text-xl text-primary-color' /></a>
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.linkedin_link}><FaLinkedin className='text-xl text-primary-color' /></a>
            <a className="h-8 w-8 items-center justify-center mx-2 p-2 bg-font-light rounded-full" href={item?.instagram_link}><FaInstagram className='text-xl text-primary-color' /></a>
          </div>
        </div>
      ))}

      <nav className="bg-bg-color flex justify-between items-center">
        <a href="/" className=" items-center pl-8">
          <h1 className='flex text-4xl font-bold'><FaHospital className='mr-2' />Klinik</h1>
        </a>

        <div className="flex items-center">
          <a href="/" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase outline-none no-underline active hover:text-primary-color">Home</a>
          <a href="/aboutus" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase outline-none no-underline hover:text-primary-color">About</a>
          <a href="/contact" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase outline-none no-underline hover:text-primary-color">Contact</a>
          <a href="/sign-in" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase outline-none no-underline hover:text-primary-color">Sign in</a>
          <a href="/registration" className="mt-2 mb-2 ml-4 mr-4 text-font-color text-base font-medium uppercase outline-none no-underline hover:text-primary-color">Registration</a>
          <a href="/appointment" className="flex bg-primary-color text-font-light text-lg font-medium outline-none no-underline p-6 items-center">Appointment <FaArrowRight className='pl-2 text-2xl font-bold' /></a>
        </div>

      </nav>
    </div>
  )
}

export default Header