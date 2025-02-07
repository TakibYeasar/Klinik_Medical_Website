import React from 'react';
import { Aboutus, Feature, Contact } from "../../../components";
import Image from 'next/image';

const About = () => {
    return (
        <div>

            <div className="relative">
                <Image
                    className='h-[20vw] object-cover rounded-b-lg'
                    src="/assets/images/header-page.jpg"
                    alt="Header Image"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-font-light bg-black bg-opacity-50">
                    <h1 className="text-6xl md:text-7xl font-bold my-4">About Us</h1>
                    <ul className="uppercase mb-0 flex justify-center space-x-4">
                        <li className="text-primary-color text-base font-medium">
                            <a className="no-underline text-font-light" href="#">Home</a>
                        </li>
                        <li className="text-primary-color text-base font-medium">
                            <a className="no-underline text-font-light" href="#">About Us</a>
                        </li>
                    </ul>
                </div>
            </div>
            <Aboutus />
            <Feature />
            <Contact />
        </div>
    )
}

export default About