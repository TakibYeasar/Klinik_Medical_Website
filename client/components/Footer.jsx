'use client'
import axios from 'axios';
import axiosInstance from '../axios';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebook, FaLinkedin, FaMapMarker, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

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
    <div className="bg-font-color pt-20 pb-20">
      <div className="container grid grid-cols-4 justify-between">

        {info?.map((item, i) => (
          <div className="" key={i}>
            <h5 className="main-title text-font-light my-6">Address</h5>
            <p className="flex mb-2 text-font-light"><FaMapMarker className='mr-4' />{item?.address}</p>
            <p className="flex mb-2 text-font-light"><FaPhone className='mr-4' />{item?.phone}</p>
            <p className="flex mb-2 text-font-light"><FaEnvelope className='mr-4' />{item?.email}</p>
            <div className="flex pt-2">
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.twitter_link}><FaTwitter className='icon' /></a>
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.facebook_link}><FaFacebook className='icon' /></a>
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.youtube_link}><FaYoutube className='icon' /></a>
              <a className="mr-1 h-[2rem] w-[2rem] flex items-center justify-center text-font-light outline outline-1 outline-font-light transition duration-300 ease-in-out hover:text-primary-color" href={item?.linkedin_link}><FaLinkedin className='icon' /></a>
            </div>
          </div>
        ))}

        <div className=" grid">
          <h5 className="main-title text-font-light no-underline my-6">Services</h5>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Cardiology</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Pulmonary</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Neurology</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Orthopedics</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Laboratory</a>
        </div>

        <div className=" grid">
          <h5 className="main-title text-font-light no-underline my-6">Quick Links</h5>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">About Us</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Contact Us</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Our</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Terms & Condition</a>
          <a className="block mb-1 p-0 float-left text-font-light text-base font-medium capitalize transition duration-300 ease-in-out before:relative before:font-black before:mr-2 hover:text-primary-color hover:tracking-widest hover:shadow-lg" href="">Support</a>
        </div>

        <div className="">
          <h5 className="main-title text-font-light no-underline my-6">Newsletter</h5>
          <p className='text-font-light text-xl font-normal my-4'>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <div className="relative flex items-center">
            <input className="p-4 w-full rounded" type="text" placeholder="Your email" />
            <button type="button" className="primary-btn rounded-md absolute left-[70%] py-2 items-center">SignUp</button>
          </div>
        </div>

      </div>

      <div className="pt-6 pb-6 text-base border border-solid border-font-color">
        <div className="grid">
          <div className="md:col-span-6 text-center text-font-light">
            &copy; <a className="text-font-light no-underline hover:text-primary-color" href="#">Your Site Name</a>, All Right Reserved.
          </div>
        </div>
      </div>


    </div>
  )
}

export default Footer