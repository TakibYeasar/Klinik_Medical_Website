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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors by speciality.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <button
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}
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
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all duration-300 cursor-pointer ${speciality === specialityOption ? "bg-indigo-300 text-black" : ""
                                }`}
                        >
                            {specialityOption}
                        </p>
                    ))}
                </div>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => router.push(`/appointment/${item._id}`)}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300'
                            key={index}
                        >
                            <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.name} />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-green-300'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                    <p>Available</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
