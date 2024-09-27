import { About, Banner, Doctors, Feature, HealthcareProviderSearch, Service, Testimonial } from '../../components'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Banner />
      <HealthcareProviderSearch />
      <About />
      <Service />
      <Doctors />
      <Feature />
      <Testimonial />
    </>
  )
}
