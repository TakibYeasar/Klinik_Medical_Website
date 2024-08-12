import { FaEnvelopeOpen, FaMapMarker, FaPhone } from "react-icons/fa";
import Image from 'next/image';
import bg from "../../../assets/header-page.jpg";

const Contact = () => {
    return (
        <div className="">
            <div className="relative">
                <Image className='h-[20vw]' src={bg} alt='' />
                <div className="container">
                    <div className="grid absolute top-20">
                        <h1 className="text-7xl text-font-light my-4">About Us</h1>
                        <ul className="uppercase mb-0 flex items-center">
                            <li className="list-none text-primary-color text-base font-medium"><a className="no-underline text-font-light text-base font-medium m-4" href="#">Home</a></li>
                            <li className="list-none text-primary-color text-base font-medium"><a className="no-underline text-font-light text-base font-medium m-4" href="#">Pages</a></li>
                            <li className="list-none text-primary-color text-base font-medium m-4">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container my-20">
                <div className="grid grid-flow-col">
                    <div className="col-span-4 bg-secondary-color my-4 mx-4 ml-0 p-8 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <FaMapMarker className='h-[3rem] w-[3rem] bg-bg-color rounded-full font-4xl p-2' />
                            </div>
                            <div className="ms-4">
                                <p className="mb-2">Address</p>
                                <h5 className="mb-0 text-xl font-semibold">123 Street, New York, USA</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 bg-secondary-color my-4 mx-4 p-8 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex items-center" >
                                <FaPhone className='h-[3rem] w-[3rem] bg-bg-color rounded-full font-4xl p-2' />
                            </div>
                            <div className="ms-4">
                                <p className="mb-2">Call Us Now</p>
                                <h5 className="mb-0 text-xl font-semibold">+012 345 6789</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 bg-secondary-color my-4 mx-4 mr-0 p-8 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex items-center" >
                                <FaEnvelopeOpen className='h-[3rem] w-[3rem] bg-bg-color rounded-full font-4xl p-2' />
                            </div>
                            <div className="ms-4">
                                <p className="mb-2">Mail Us Now</p>
                                <h5 className="mb-0 text-xl font-semibold">info@example.com</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-flow-col gap-4">
                    <div className="col-span-6 bg-secondary-color p-8 rounded-lg">
                        <p className="border border-primary-color rounded-full px-4 py-2 w-32 text-center text-xl font-medium">Contact Us</p>
                        <h1 className="my-4 main-title text-font-color font-semibold">Have Any Query? Please Contact Us!</h1>
                        <p className="my-4 text-xl font-normal">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                        <form className="" role="form">
                            <div className="grid grid-flow-col">
                                <div className="mr-8 col-span-6">
                                    <input type="text" className="p-4 my-4 w-full rounded-md" placeholder='Your Name' />
                                </div>
                                <div className="mr-8 col-span-6">
                                    <input type="email" className="p-4 my-4 w-full rounded-md" placeholder='Your Email' />
                                </div>
                            </div>
                            <div className="mr-8">
                                <input type="text" className="p-4 my-4 w-full rounded-md" placeholder='Your Subject' />
                            </div>
                            <div className="mr-8">
                                <input type="text" className="p-4 my-4 w-full rounded-md" placeholder='Your Message' />
                            </div>
                            <button type="submit" className="text-xl font-normal p-4 rounded-md transition duration-300 ease-in no-underline bg-primary-color text-font-light">Send Message</button>
                        </form>
                    </div>

                    <div className="col-span-6">
                        <iframe className='w-full h-[40vh]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0080692193424!2d80.29172299999996!3d13.098675000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f446a1c3187%3A0x298011b0b0d14d47!2sTransvelo!5e0!3m2!1sen!2sin!4v1412844527190"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact