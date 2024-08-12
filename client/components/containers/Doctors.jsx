'use client'
import axios from 'axios';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Doctors = () => {

    const [IsLoading, setIsLoading] = useState(true);
    const [doctordata, setDoctordata] = useState([]);

    useEffect(() => {
        axios.all([
            axiosInstance.get('/api/core/doctor/'),
        ]).then(axios.spread((res) => {
            setDoctordata(res.data)
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
        <div className="container my-20">
            <div className="text-center">
                <p className="border border-primary-color rounded-full px-4 py-2 w-60 text-center text-xl font-medium">Doctors</p>
                <h1 className='main-title'>Our Experience Doctors</h1>
            </div>

            <div className="grid grid-flow-col grid-cols-3 gap-4">
                {doctordata.map((item, i) => (
                    <div className="my-8" key={i}>
                            <img className="top-0 transition duration-500 group-hover/item:t-[-30px]" src={item?.image} alt="" />
                            <div className="transition duration-500 h-28 bg-secondary-color p-4 items-center">
                                <h5 className='text-xl font-medium'>{item?.name}</h5>
                                <p className="text-xl font-normal text-primary-color">{item?.dept}</p>
                                <div className="flex transition duration-500 text-center">
                                    <a className="bg-bg-color p-2 rounded-full m-2" href={item?.facebook_link}><FaFacebook className='inline-flex text-primary-color text-3xl' /></a>
                                <a className="bg-bg-color p-2 rounded-full m-2" href={item?.twitter_link}><FaTwitter className='inline-flex text-primary-color text-3xl' /></a>
                                <a className="bg-bg-color p-2 rounded-full m-2" href={item?.instagram_link}><FaInstagram className='inline-flex text-primary-color text-3xl' /></a>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Doctors