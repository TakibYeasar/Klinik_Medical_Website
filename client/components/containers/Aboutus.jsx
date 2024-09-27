"use client";

import { FaCheckCircle } from "react-icons/fa";

const Aboutus = () => {

    return (
        <div className="container my-20">
            <div className="grid grid-cols-2 grid-flow-col gap-4">
                <div className="flex relative">
                    <img src={"/assets/images/about-1.jpg"} className='h-[55vh] w-[25vw]' alt="" />
                    <img src={"/assets/images/about-2.jpg"} className='absolute bg-bg-color p-4 h-[30vh] w-[15vw]' alt="" />
                </div>
                <div className="p-8">
                    <p className="border border-primary-color rounded-full px-4 py-2 text-center text-xl font-medium">About Us</p>
                    <h1 className="main-title">Why You Should Trust Us? Get Know About Us!</h1>
                    <p className="mb-4 text-xl font-normal">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                    <p className="mb-4 text-xl font-normal">Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.</p>
                    <p className='text-lg flex my-4'><FaCheckCircle className='mr-2 text-primary-color' />Quality health care</p>
                    <p className='text-lg flex my-4'><FaCheckCircle className='mr-2 text-primary-color' />Only Qualified Doctors</p>
                    <p className='text-lg flex my-4'><FaCheckCircle className='mr-2 text-primary-color' />Medical Research Professionals</p>
                    <a className="primary-btn my-4" href="">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Aboutus