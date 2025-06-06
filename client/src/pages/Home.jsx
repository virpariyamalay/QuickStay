import React from 'react'
import Hero from '../components/Hero'
import FeacturedDestination from '../components/FeacturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
      <Hero/>
      <FeacturedDestination/>
      <ExclusiveOffers/>
      <Testimonial/>
      <NewsLetter/>
    </>
  )
}

export default Home