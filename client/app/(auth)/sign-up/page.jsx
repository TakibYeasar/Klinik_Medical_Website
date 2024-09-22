import Image from 'next/image';
import bg from "../../../../assets/header-page.jpg";
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';


const SignUp = () => {

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
                            <li className="list-none text-primary-color text-base font-medium m-4">Registration</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="mt-4 mb-4 bg-card-bg p-8">
                    <h4 className="border border-primary-color rounded-full px-4 py-2 w-60 text-center text-xl font-medium">Create a new account</h4>
                    <div className="flex">
                        <a href="#" className="flex m-4 items-center text-xl font-normal p-4 rounded-md transition duration-300 ease-in no-underline bg-amber-400 text-font-light"><FaGoogle className='mr-2' /> Sign In with Google</a>
                        <a href="#" className="flex m-4 items-center text-xl font-normal p-4 rounded-md transition duration-300 ease-in no-underline bg-blue-600 text-font-light"><FaFacebook className='mr-2' /> Sign In with Facebook</a>
                        <a href="#" className="flex m-4 items-center text-xl font-normal p-4 rounded-md transition duration-300 ease-in no-underline bg-blue-400 text-font-light"><FaTwitter className='mr-2' /> Sign In with Twitter</a>
                    </div>
                    <div className="text-xl font-normal my-4">Or,</div>
                    <form className="">
                        <div className="grid mt-2 mb-2">
                            <label className="text-base mt-2 mb-2">Email Address <span>*</span></label>
                            <input type="email" className="p-4 mt-4 mb-4" placeholder="email" />
                        </div>
                        <div className="grid mt-2 mb-2">
                            <label className="text-base mt-2 mb-2">Username <span>*</span></label>
                            <input type="email" className="p-4 mt-4 mb-4" placeholder="username" />
                        </div>
                        <div className="grid mt-2 mb-2">
                            <label className="text-base mt-2 mb-2">Password <span>*</span></label>
                            <input type="email" className="p-4 mt-4 mb-4" placeholder="password" />
                        </div>
                        <div className="grid mt-2 mb-2">
                            <label className="text-base mt-2 mb-2">Confirm Password <span>*</span></label>
                            <input type="email" className="p-4 mt-4 mb-4" placeholder="confirm_password" />
                        </div>
                        <button type="submit" className="text-xl font-normal p-4 rounded-md transition duration-300 ease-in no-underline bg-primary-color text-font-light">Sign Up</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignUp