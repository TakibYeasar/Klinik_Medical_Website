"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const Doctors = () => {
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const speciality = searchParams.get('speciality'); // Fetching speciality from query params

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get('/api/core/doctor/');
                const doctors = res.data;

                if (speciality) {
                    setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
                } else {
                    setFilterDoc(doctors);
                }

                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching doctors:", err);
                setIsLoading(false);
            }
        };

        fetchDoctors();
    }, [speciality]);

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen text-gray-600'>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <p className='text-gray-600 text-center mb-4'>Browse through the doctors by speciality.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mb-5'>
                <button
                    className={`py-2 px-4 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : "text-gray-700"}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Filters
                </button>
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
                    {/* Filter Links */}
                    {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialityOption, index) => (
                        <p
                            key={index}
                            onClick={() => router.push(speciality === specialityOption ? '/doctors' : `/doctors?speciality=${specialityOption}`)}
                            className={`w-full sm:w-auto pl-3 py-2 pr-4 border rounded cursor-pointer transition-all duration-300 ${speciality === specialityOption ? "bg-indigo-300 text-black" : "hover:bg-gray-200"}`}
                        >
                            {specialityOption}
                        </p>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filterDoc.map((item, index) => (
                    <div
                        onClick={() => router.push(`/appointment/${item._id}`)}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1'
                        key={index}
                    >
                        <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-300'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-semibold mt-1'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;
