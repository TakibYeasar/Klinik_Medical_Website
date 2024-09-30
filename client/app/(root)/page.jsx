import { Aboutus, Banner, Doctors, Feature, Service, PatientOnboarding, Testimonial } from '../../components'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Banner />
      <PatientOnboarding />
      <Aboutus />
      <Service />
      <Feature />
      <Doctors />
      <Testimonial />
    </>
  )
}
