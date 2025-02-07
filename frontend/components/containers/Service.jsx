"use client";

import { FaPlus } from 'react-icons/fa';
import { useFetchServicesQuery } from '@/store/features/core/coreApi';

const Service = () => {
    const { data: servicedata = [], isLoading } = useFetchServicesQuery();

    return (
        <div className="container">
            <div className="text-center items-center mb-12">
                <p className="border border-primary-color rounded-full px-4 py-2 w-60 text-center text-xl font-medium">Services</p>
                <h1 className='main-title text-font-color'>Health Care Solutions</h1>
            </div>

            {isLoading ? (
                <p className="text-center text-xl">Loading...</p>
            ) : (
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
                                    href="#"
                                >
                                    <FaPlus className="text-primary-color mr-4 block group-hover:w-[10rem]" />Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Service;
