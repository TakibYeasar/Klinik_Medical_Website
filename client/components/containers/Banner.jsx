"use client";

import axiosInstance from "../../axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Banner = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        axiosInstance
            .get("/api/core/banner/")
            .then((res) => {
                setBanners(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Banner slider - changes banner every 3 seconds
        const intervalId = setInterval(() => {
            const nextIndex = (currentIndex + 1) % banners.length;
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentIndex, banners.length]);

    useEffect(() => {
        // Number count animation - runs only once when component mounts
        const countUp = (target, setCount) => {
            let startValue = 0;
            const duration = 3000; // 3 seconds
            const startTime = Date.now();

            const updateCount = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                setCount(Math.floor(progress * target));

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
        };

        countUp(123, setDoctorCount);
        countUp(1234, setStaffCount);
        countUp(12345, setPatientCount);
    }, []); // Empty dependency array ensures this effect runs only once

    if (isLoading) {
        return <h3>loading ...</h3>;
    }

    return (
        <div>
            <div className="bg-primary-color grid grid-flow-col grid-cols-2 h-screen justify-between items-center">
                <div className="items-center p-8">
                    <h1 className="text-7xl font-bold m-8 p-8 text-font-light">
                        Good Health Is The Root Of All Happiness
                    </h1>
                    <div className="flex justify-between px-8">
                        <div className="items-center m-4">
                            <h2 className="mb-1 text-4xl font-semibold text-font-light">
                                {doctorCount}
                            </h2>
                            <p className="mb-0 text-xl font-medium text-font-light">
                                Expert Doctors
                            </p>
                        </div>
                        <div className="items-center m-4">
                            <h2 className="mb-1 text-4xl font-semibold text-font-light">
                                {staffCount}
                            </h2>
                            <p className="mb-0 text-xl font-medium text-font-light">
                                Medical Staff
                            </p>
                        </div>
                        <div className="items-center m-4">
                            <h2 className="mb-1 text-4xl font-semibold text-font-light">
                                {patientCount}
                            </h2>
                            <p className="mb-0 text-xl font-medium text-font-light">
                                Total Patients
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative items-center justify-center flex">
                    {banners.length > 0 && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-screen relative"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src={banners[currentIndex].image}
                                alt={banners[currentIndex].title}
                            />
                            <h1 className="absolute top-0 flex items-center justify-center text-font-light text-7xl font-bold mb-0 shadow-sm shadow-font-color">
                                {banners[currentIndex].title}
                            </h1>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;
