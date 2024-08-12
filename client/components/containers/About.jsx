'use client'
import axios from 'axios';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
    const [IsLoading, setIsLoading] = useState(true);
    const [aboutdata, setAboutdata] = useState([]);

    useEffect(() => {
        axios.all([
            axiosInstance.get('/api/core/about/'),
        ]).then(axios.spread((res) => {
            setAboutdata(res.data)
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
            {aboutdata?.map((item, i) => (
                <div className="grid grid-cols-2 grid-flow-col gap-4" key={i}>
                    <div className="flex relative">
                        <img src={item?.main_image} className='h-[55vh] w-[25vw]' alt="" />
                        <img src={item?.image} className='absolute bg-bg-color p-4 h-[30vh] w-[15vw]' alt="" />
                    </div>
                    <div className="p-8">
                        <p className="border border-primary-color rounded-full px-4 py-2 text-center text-xl font-medium">About Us</p>
                        <h1 className="main-title">{item?.title}</h1>
                        <p className="mb-4 text-xl font-normal">{item?.description}</p>
                        {item.points.map((pointItem, j) => (
                            <p className='text-lg flex my-4' key={j}><FaCheckCircle className='mr-2 text-primary-color' />{pointItem?.title}</p>
                        ))}
                        <a className="primary-btn my-4" href="">Read More</a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default About