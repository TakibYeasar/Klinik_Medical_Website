import { FaEnvelopeOpen, FaPhone } from "react-icons/fa";
import Image from 'next/image';
import bg from "../../../assets/header-page.jpg";

const Appointment = () => {
    return (
        <div className="">
            <div className="relative">
                <Image className='h-[20vw]' src={bg} alt='' />
                <div className="container">
                    <div className="grid absolute top-20">
                        <h1 className="text-7xl text-font-light mt-4 mb-4">About Us</h1>
                        <ul className="uppercase mb-0 flex items-center">
                            <li className="list-none text-primary-color text-base font-medium"><a className="no-underline text-font-light text-base font-medium m-4" href="#">Home</a></li>
                            <li className="list-none text-primary-color text-base font-medium"><a className="no-underline text-font-light text-base font-medium m-4" href="#">Pages</a></li>
                            <li className="list-none text-primary-color text-base font-medium m-4">Appointment</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container my-20">
                <div className="grid grid-flow-col gap-4">
                    <div className="col-span-6">
                        <p className="border border-primary-color rounded-full px-4 py-2 w-32 text-center text-xl font-medium">Appointment</p>
                        <h1 className="my-4 main-title font-bold">Make An Appointment To Visit Our Doctor</h1>
                        <p className="mb-4 text-xl font-normal">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>

                        <div className="flex items-center bg-secondary-color my-4 p-12 rounded-md">
                            <div className="flex" >
                                <FaPhone className='h-[3rem] w-[3rem] bg-bg-color rounded-full text-4xl p-2 text-primary-color' />
                            </div>
                            <div className="ms-4">
                                <p className="mb-2">Call Us Now</p>
                                <h5 className="mb-0 text-xl font-semibold">+012 345 6789</h5>
                            </div>
                        </div>
                        <div className="flex items-center bg-secondary-color my-4 p-12 rounded-md">
                            <div className="flex" >
                                <FaEnvelopeOpen className='h-[3rem] w-[3rem] bg-bg-color rounded-full text-4xl p-2 text-primary-color' />
                            </div>
                            <div className="ms-4">
                                <p className="mb-2">Mail Us Now</p>
                                <h5 className="mb-0 text-xl font-semibold">info@example.com</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <div className="flex items-center">
                            <form className='bg-secondary-color rounded-lg p-12'>
                                <div className="grid">
                                    <div className="col-span-6 m-2">
                                        <input type="text" className="mt-4 mb-4 p-4 border-0 w-full rounded-md" placeholder="Your Name" />
                                    </div>
                                    <div className="col-span-6 m-2">
                                        <input type="email" className="mt-4 mb-4 p-4 border-0 w-full rounded-md" placeholder="Your Email" />
                                    </div>
                                    <div className="col-span-6 m-2">
                                        <input type="text" className="mt-4 mb-4 p-4 border-0 w-full rounded-md" placeholder="Your Mobile" />
                                    </div>
                                    <div className="col-span-6 m-2">
                                        <select className="mt-4 mb-4 p-4 border-0 w-full rounded-md">
                                            <option selected>Choose Doctor</option>
                                            <option value="1">Doctor 1</option>
                                            <option value="2">Doctor 2</option>
                                            <option value="3">Doctor 3</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="date">
                                            <input type="text" className="mt-4 mb-4 p-4 border-0 w-full rounded-md" placeholder="Choose Date" data-toggle="datetimepicker" />
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="time">
                                            <input type="text"
                                                className="mt-4 mb-4 p-4 border-0 w-full rounded-md"
                                                placeholder="Choose Date" data-toggle="datetimepicker" />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <textarea className="mt-4 mb-4 p-4 border-0 w-full rounded-md" rows={5} placeholder="Describe your problem"></textarea>
                                    </div>
                                    <div className="col-span-12">
                                        <button className="text-xl font-normal p-4 rounded-md transition duration-300 ease-in no-underline bg-primary-color text-font-light" type="submit">Book Appointment</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment