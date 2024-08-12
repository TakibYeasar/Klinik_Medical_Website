'use client'
import axios from 'axios';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import { FaCheck, FaCommentMedical, FaHeadphones, FaUser } from "react-icons/fa";

const Feature = () => {

    const [IsLoading, setIsLoading] = useState(true);
    const [featuresdata, setFeaturesdata] = useState([]);

    useEffect(() => {
        axios.all([
            axiosInstance.get('/api/core/whychoose/'),
        ]).then(axios.spread((res) => {
            setFeaturesdata(res.data)
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
        <div>
            {featuresdata?.map((item, i) => (
                <div className="flex bg-primary-color" key={i}>
                    <div className="container p-8 items-center justify-end">
                        <p className="border border-font-light rounded-full px-4 py-2 w-60 text-center text-xl font-medium text-font-light">Features</p>
                        <h1 className="main-title text-font-light">Why Choose Us</h1>
                        <p className="my-4 text-xl font-normal text-font-light">{item?.description}</p>
                        <div className="items-center">
                            <div className="flex items-center">
                                <div className="items-center flex m-6">
                                    <div className="bg-bg-color p-4 rounded-full flex items-center">
                                        <FaUser className='text-primary-color font-4xl' />
                                    </div>
                                    <div className="ms-4">
                                        <p className="text-xl font-normal text-font-light">Experience</p>
                                        <h5 className="text-xl font-medium text-font-light">Doctors</h5>
                                    </div>
                                </div>
                                <div className="items-center flex m-6">
                                    <div className="bg-bg-color p-4 rounded-full flex items-center">
                                        <FaCheck className='text-primary-color font-4xl' />
                                    </div>
                                    <div className="ms-4">
                                        <p className="text-xl font-normal text-font-light">Quality</p>
                                        <h5 className="text-xl font-medium text-font-light">Services</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="items-center flex m-6">
                                    <div className="bg-bg-color p-4 rounded-full flex items-center">
                                        <FaCommentMedical className='text-primary-color font-4xl' />
                                    </div>
                                    <div className="ms-4">
                                        <p className="text-xl font-normal text-font-light">Positive</p>
                                        <h5 className="text-xl font-medium text-font-light">Consultation</h5>
                                    </div>
                                </div>
                                <div className="items-center flex m-6">
                                    <div className="bg-bg-color p-4 rounded-full flex items-center">
                                        <FaHeadphones className='text-primary-color font-4xl' />
                                    </div>
                                    <div className="ms-4">
                                        <p className="text-xl font-normal text-font-light">24 Hours</p>
                                        <h5 className="text-xl font-medium text-font-light">Support</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="">
                        <div className="relative">
                            <img className='h-[60vh] w-[50vw]' src={item?.image} alt="" />
                        </div>
                    </div></div>
            ))}
        </div>
    )
}

export default Feature