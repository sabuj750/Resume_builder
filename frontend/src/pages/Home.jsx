import React from 'react'
import Banner from "../components/home/Banner.jsx"
import Hero from "../components/home/Hero.jsx"
import Features from "../components/home/Features.jsx"
import Testimonials from '../components/home/Testimonials.jsx'
import Cta from "../components/home/Cta.jsx"
import Footer from '../components/home/Footer.jsx'
const Home = () => {
  return (
    <div>
      <Banner/>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Cta/>
      <Footer/>
    </div>
  )
}

export default Home
