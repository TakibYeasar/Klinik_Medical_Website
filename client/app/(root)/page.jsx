import { Aboutus, Banner, Doctors, Feature, Service, Testimonial } from '../../components'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Banner />
      <Aboutus />
      <Service />
      <Doctors />
      <Feature />
      <Testimonial />
    </>
  )
}
