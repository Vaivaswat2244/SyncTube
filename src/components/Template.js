import React from 'react'
import frameImage from "../assets/frame.png"
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import {FcGoogle} from "react-icons/fc"
import './Template.css'

const Template = ({title,desc1,desc2,image,formtype,setIsLoggedIn}) => {
  return (
    <div  className='flex flex-wrap lg:justify-between justify-center mt-[9vh] w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0' >
        
      <div className='w-11/12 max-w-[450px] lg:order-1 order-2 mx-0 ' >
          <h1 
             className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'  >{title}</h1>
          <p  className='text-[1.225rem] leading[1.625rem] mt-4' >
          <span  className='text-richblack-100'> {desc1} </span>
          <br /> 
          <span  className='text-blue-100 italic'> {desc2} </span>
          </p>

        {formtype==="signup" ?
         (<SignupForm  setIsLoggedIn={setIsLoggedIn} />) :
         (<LoginForm setIsLoggedIn={setIsLoggedIn} />) }
          
            <div className='flex w-full items-center my-4 gap-x-2' >
                  <div  className='w-full h-[1px] bg-richblack-700'></div>
                  <p className='text-richblack-700 font-medium leading[1.375rem]' >OR</p>
                  <div className='w-full h-[1px] bg-richblack-700' ></div>
            
            </div>

          
 

        </div>  
        
         <div className='relative w-11/12 max-w-[450px] lg:order-1' >
            <div className='imaage '
              alt='Pattern image'
             width={558} height={504} loading='lazy'   />
             
            <img className='absolute -top-4 right-4 imaage' 
            src={image} alt='Student image'
             width={558} height={490} loading='lazy'     />
              
             
         </div>


    </div>
  )
}

export default Template
