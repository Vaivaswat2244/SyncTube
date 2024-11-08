import React from 'react'
import Test from './Test'
import reviews from './data'

const Testimonials = () => {
  return (
    <div className="flex flex-col w-[100vw] overflow-y-hidden min-h-screen justify-center items-center bg-[#000814]">
    <div className="text-center ">
      <h1 className="text-4xl font-bold mb-[3vh] py-4 text-richblack-100">Our Testimonials</h1>
      <Test reviews={reviews} />
    </div>
  </div>
  
  )
}

export default Testimonials
