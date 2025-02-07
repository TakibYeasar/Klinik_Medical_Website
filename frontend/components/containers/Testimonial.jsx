"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const Testimonial = () => {
    const [IsLoading, setIsLoading] = useState(true);
    const [testdata, setTestdata] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/core/testimonials/')
            .then(res => {
                setTestdata(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testdata.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testdata.length - 1 : prevIndex - 1
        );
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextTestimonial,
        onSwipedRight: prevTestimonial,
        preventScrollOnSwipe: true,
        trackMouse: true // Enable swipe with mouse as well
    });

    if (IsLoading) {
        return <h3 className="text-center text-xl">Loading...</h3>;
    }

    return (
        <div className="container my-20 px-4">
            <div className="text-center mb-8">
                <p className="border border-primary-color rounded-full px-6 py-2 text-xl font-semibold">Testimonial</p>
                <h1 className='text-3xl font-bold mt-4'>What Say Our Patients!</h1>
            </div>

            {/* Testimonial section with swipeable and hover effect */}
            <div
                className="relative group w-full"
                {...swipeHandlers}
            >
                <AnimatePresence mode="wait">
                    {testdata.length > 0 && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <div className="my-8 text-center items-center">
                                <img className="h-20 w-20 rounded-full border-4 border-primary-color m-4" src={testdata[currentIndex]?.image} alt='' />
                                <div className="bg-primary-color w-[90%] md:w-[40vw] p-6 rounded-md shadow-lg">
                                    <p className='text-lg font-normal text-font-light mb-4'>{testdata[currentIndex]?.description}</p>
                                    <h5 className="text-lg font-semibold text-font-light">{testdata[currentIndex]?.name}</h5>
                                    <span className="text-lg font-normal text-font-light">{testdata[currentIndex]?.profession}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Slider Controls - hidden by default, shown on hover */}
                <button
                    className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 bg-primary-color text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={prevTestimonial}
                >
                    {"<"}
                </button>
                <button
                    className="absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2 bg-primary-color text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={nextTestimonial}
                >
                    {">"}
                </button>
            </div>

            {/* Dots for navigation */}
            <div className="flex justify-center mt-4">
                {testdata.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-4 h-4 mx-2 rounded-full transition duration-300 ${currentIndex === i ? 'bg-primary-color' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
