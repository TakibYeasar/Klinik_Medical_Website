"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFetchBannersQuery } from "@/store/features/core/coreApi";

const Banner = () => {
    const { data: banners = [], isLoading } = useFetchBannersQuery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        if (banners.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, 3000);
            return () => clearInterval(intervalId);
        }
    }, [banners.length]);

    useEffect(() => {
        const countUp = (target, setCount) => {
            let startValue = 0;
            const duration = 3000;
            const startTime = Date.now();

            const updateCount = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                setCount(Math.floor(progress * target));
                if (progress < 1) requestAnimationFrame(updateCount);
            };
            updateCount();
        };

        countUp(123, setDoctorCount);
        countUp(1234, setStaffCount);
        countUp(12345, setPatientCount);
    }, []);

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="bg-primary-color grid grid-cols-2 h-screen items-center">
            <div className="p-8">
                <h1 className="text-7xl font-bold m-8 p-8 text-font-light">
                    Good Health Is The Root Of All Happiness
                </h1>
                <div className="flex justify-between px-8">
                    {[{ count: doctorCount, label: "Expert Doctors" }, { count: staffCount, label: "Medical Staff" }, { count: patientCount, label: "Total Patients" }].map((item, index) => (
                        <div key={index} className="m-4 text-center">
                            <h2 className="mb-1 text-4xl font-semibold text-font-light">{item.count}</h2>
                            <p className="text-xl font-medium text-font-light">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative flex justify-center items-center">
                {banners.length > 0 && (
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-screen relative"
                    >
                        <img className="w-full h-full object-cover" src={banners[currentIndex].image} alt={banners[currentIndex].title} />
                        <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-font-light text-7xl font-bold shadow-sm shadow-font-color">
                            {banners[currentIndex].title}
                        </h1>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Banner;
