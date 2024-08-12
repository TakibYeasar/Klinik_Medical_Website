'use client'
import axios from 'axios';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';

const Testimonial = () => {

    const [IsLoading, setIsLoading] = useState(true);
    const [testdata, setTestdata] = useState([]);

    useEffect(() => {
        axios.all([
            axiosInstance.get('/api/core/testimonial/'),
        ]).then(axios.spread((res) => {
            setTestdata(res.data)
            setIsLoading(false)
            // console.log(res.data);
        })).catch(err => {
            console.log(err);
        })
    }, [])

    if (IsLoading) {
        return <h3>loading ...</h3>
    }

    return (
        <div className="container my-20">
            <div className="text-center">
                <p className="border border-primary-color rounded-full px-4 py-2 w-60 text-center text-xl font-medium">Testimonial</p>
                <h1 className='main-title'>What Say Our Patients!</h1>
            </div>
            {testdata?.map((item, i) => (
                <div className="flex" key={i}>
                    <div className="my-8 text-center items-center">
                        <img className="h-8 w-8 rounded-full border border-primary-color m-4" src={item?.image} alt='' />
                        <div className="bg-primary-color w-[40vw] p-6 rounded-md">
                            <p className='text-xl font-normal text-font-light mb-4'>{item?.description}.</p>
                            <h5 className="text-xl font-medium text-font-light">{item?.name}</h5>
                            <span className="text-xl font-normal text-font-light">{item?.profession}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Testimonial