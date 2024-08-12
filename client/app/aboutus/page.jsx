import { About, Doctors, Feature } from '@/containers';
import Image from 'next/image';
import bg from "../../../assets/header-page.jpg";

const Aboutus = () => {
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
                            <li className="list-none text-primary-color text-base font-medium m-4">About Us</li>
                        </ul>
                    </div>
                </div>
            </div>


            <About />

            <Feature />

            <Doctors />
        </div>
    )
}

export default Aboutus