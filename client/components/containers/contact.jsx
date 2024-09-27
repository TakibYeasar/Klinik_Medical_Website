import { FaEnvelopeOpen, FaMapMarker, FaPhone } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto my-20">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-secondary-color p-8 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <FaMapMarker className='h-12 w-12 bg-bg-color rounded-full p-3 text-primary-color' />
                            <div className="ml-4">
                                <p className="mb-1 text-gray-600">Address</p>
                                <h5 className="text-xl font-semibold">123 Street, New York, USA</h5>
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary-color p-8 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <FaPhone className='h-12 w-12 bg-bg-color rounded-full p-3 text-primary-color' />
                            <div className="ml-4">
                                <p className="mb-1 text-gray-600">Call Us Now</p>
                                <h5 className="text-xl font-semibold">+012 345 6789</h5>
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary-color p-8 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <FaEnvelopeOpen className='h-12 w-12 bg-bg-color rounded-full p-3 text-primary-color' />
                            <div className="ml-4">
                                <p className="mb-1 text-gray-600">Mail Us Now</p>
                                <h5 className="text-xl font-semibold">info@example.com</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-6">
                    <div className="bg-secondary-color p-8 rounded-lg shadow-lg">
                        <p className="border border-primary-color rounded-full px-4 py-2 w-32 text-center text-xl font-medium">Contact Us</p>
                        <h1 className="my-4 text-2xl font-semibold text-font-color">Have Any Query? Please Contact Us!</h1>
                        <p className="my-4 text-lg font-normal text-gray-700">
                            The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done.
                            <a className="text-primary-color hover:underline" href="https://htmlcodex.com/contact-form"> Download Now</a>.
                        </p>
                        <form className="" role="form">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" className="p-4 border border-gray-300 rounded-md" placeholder='Your Name' />
                                <input type="email" className="p-4 border border-gray-300 rounded-md" placeholder='Your Email' />
                            </div>
                            <input type="text" className="p-4 border border-gray-300 rounded-md my-4" placeholder='Your Subject' />
                            <textarea className="p-4 border border-gray-300 rounded-md my-4" placeholder='Your Message' rows="4"></textarea>
                            <button type="submit" className="w-full text-xl font-normal p-4 rounded-md transition duration-300 ease-in bg-primary-color text-font-light hover:bg-primary-dark">Send Message</button>
                        </form>
                    </div>

                    <div className="relative">
                        <iframe className='w-full h-[40vh] rounded-lg shadow-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0080692193424!2d80.29172299999996!3d13.098675000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f446a1c3187%3A0x298011b0b0d14d47!2sTransvelo!5e0!3m2!1sen!2sin!4v1412844527190" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
