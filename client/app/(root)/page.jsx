import { About, Banner, Doctors, Feature, Service, Testimonial } from '../../components'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Banner />
      <About />
      <Service />
      <Doctors />
      <Feature />
      <Testimonial />
    </>
  )
}
