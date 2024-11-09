import React from 'react'
import Sync from "../assets/Sync.png"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  return (
    <div className='fixed top-0 left-0 right-0  shadow-md z-50'>

    <div className='flex justify-between fixed z-10 items-center  w-[95vw] py-4 mx-auto '>
            <Link to="/">
               <img src={Sync} alt='Logo' className='ml-12'  width={160} height={32} loading="lazy" />   
 
           </Link>
          <nav>
               <ul className='flex gap-3 gap-x-6 text-richblack-100 '>
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/about" >About</Link>
                    </li>
                    <li>
                        <Link to="/contact" >Contact</Link>
                    </li>
                
                </ul>
          
          </nav>

          <div className='flex items-center gap-x-6  ' >
             { !token &&
               <Link to="/login">
                <button className='bg-richblack-800  text-richblack-100 py-[8px] px-[12px] border border-richblack-700   '>
                   Login
                </button>
               </Link>

             }
             { !token &&
               <Link to="/signup">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] border border-richblack-700   ' >
                   SignUp
                </button>
               </Link>
             }
             { token &&
               
                <button  
                className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] border border-richblack-700   '
                onClick={() => {
                  localStorage.clear();
                  toast.success("Logged Out ");
                  navigate('/login')
                } }>
                   LogOut
                </button>
               
 
             }
             { token &&
               
                <button className='bg-richblack-800 text-white py-[8px] px-[12px] border border-richblack-700   '
                onClick={() => {
              
                  if (localStorage.getItem('role')=="editor"){
                    navigate("/allprojects");
                  }
                  else{
                    navigate("/addprojectyoutuber");
                  }
                  
                } } >
                   Dashboard
                </button>
               

             }
          
          </div>
          


    </div>
    </div>
  )
}
 
export default Navbar
