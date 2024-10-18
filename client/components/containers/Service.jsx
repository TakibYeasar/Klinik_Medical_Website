"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Service = () => {

    const [IsLoading, setIsLoading] = useState(true);
    const [servicedata, setServicedata] = useState([]);

    useEffect(() => {
        axios.all([
            axios.get('http://127.0.0.1:8000/api/core/service/'),
        ]).then(axios.spread((res) => {
            setServicedata(res.data)
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
        <div className="container">
            <div className="text-center items-center mb-12">
                <p className="border border-primary-color rounded-full px-4 py-2 w-60 text-center text-xl font-medium">Services</p>
                <h1 className='main-title text-font-color'>Health Care Solutions</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {servicedata.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="p-12 rounded-md bg-secondary-color">
                            <div className="p-4 bg-bg-color rounded-full w-16">
                                <img className="text-primary-color text-4xl font-medium" src={item?.icon} alt="Icon" />
                            </div>
                            <h4 className="text-xl font-semibold my-4">{item?.title}</h4>
                            <p className="text-xl font-normal my-2">{item?.description}</p>
                            <a
                                className="flex text-xl font-normal my-4 items-center bg-bg-color p-4 no-wrap overflow-hidden transition duration-500 rounded-full"
                                href=""
                            >
                                <FaPlus className="text-primary-color mr-4 block group-hover:w-[10rem]" />Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Service