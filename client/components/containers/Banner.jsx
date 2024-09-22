"use client";

import axios from 'axios';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';

const Banner = () => {

    const [IsLoading, setIsLoading] = useState(true);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        axios.all([
            axiosInstance.get('/api/core/banner/'),
        ]).then(axios.spread((res) => {
            setBanners(res.data)
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
            {banners.map((item, i) => (
                <div className="bg-primary-color grid grid-flow-col grid-cols-2 h-screen justify-between items-center" key={i}>
                    <div className="items-center p-8">
                        <h1 className="text-7xl font-bold m-8 p-8 text-font-light">{item?.banner_title}</h1>
                        <div className="flex justify-between px-8">
                            <div className="items-center m-4">
                                <h2 className="mb-1 text-4xl font-semibold text-font-light">{item?.doctor}</h2>
                                <p className="mb-0 text-xl font-medium text-font-light">Expert Doctors</p>
                            </div>
                            <div className="items-center m-4">
                                <h2 className="mb-1 text-4xl font-semibold text-font-light">{item?.stuff}</h2>
                                <p className="mb-0 text-xl font-medium text-font-light">Medical Stuff</p>
                            </div>
                            <div className="items-center m-4">
                                <h2 className="mb-1 text-4xl font-semibold text-font-light">{item?.patient}</h2>
                                <p className="mb-0 text-xl font-medium text-font-light">Total Patients</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative items-center justify-center flex">
                        {/* Use the map function to render multiple images */}
                        {item.slider.map((sliderItem, j) => (
                            <div key={j} className="w-full h-screen">
                                <img className="w-full h-full object-cover" src={sliderItem.image} alt={sliderItem.title} />
                                <h1 className="absolute top-0 flex items-center justify-center text-font-light text-7xl font-bold mb-0 shadow-sm shadow-font-color">{sliderItem.title}</h1>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Banner