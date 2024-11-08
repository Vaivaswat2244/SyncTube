import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const LoginForm = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState( {
    email:"" , password:""
  }) 

  const navigate = useNavigate()

  const [showPassword, setShowPassword] =useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  } 
  
  async function submitHandler(event) {
    event.preventDefault();
    
    try {
        // Step 1: Login Request
        const loginResponse = await axios.post('https://synctube-backend-final.onrender.com/api/auth/signin', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (loginResponse.status === 202) {
            const { token, user: { email, role, user_id } } = loginResponse.data;
            
            // Store data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('role', role);
            localStorage.setItem('user_id', user_id);
            
            setIsLoggedIn(true);
            toast.success("Logged in successfully");

            // Step 2: Check Profile Status
            try {
                const profileResponse = await axios.get('https://synctube-backend-final.onrender.com/api/profile/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(profileResponse)

                // Determine redirect based on role and profile completion
                if (role === "youtuber") {
                    if (profileResponse.data.user.channelName) {
                        // Profile exists, redirect to projects
                        navigate("/myprojectsyoutuber");
                    } else {
                        // Profile incomplete, redirect to create profile
                        navigate("/createAccountYoutuber");
                    }
                } else if (role === "editor") {
                    if (profileResponse.data.user.image) {
                        // Profile exists, redirect to projects
                        navigate("/allprojects");
                    } else {
                        // Profile incomplete, redirect to create profile
                        navigate("/createAccountEditor");
                    }
                } else {
                    toast.error("Invalid role");
                    navigate("/login");
                }
            } catch (profileError) {
                // If profile doesn't exist or there's an error, redirect to create profile
                if (profileError.response?.status === 404) {
                    // Profile doesn't exist
                    if (role === "youtuber") {
                        navigate("/createAccountYoutuber");
                    } else if (role === "editor") {
                        navigate("/createAccountEditor");
                    }
                } else {
                    console.error('Profile check error:', profileError);
                    toast.error("Error checking profile status");
                    // Still redirect to create profile as fallback
                    if (role === "youtuber") {
                        navigate("/createAccountYoutuber");
                    } else if (role === "editor") {
                        navigate("/createAccountEditor");
                    }
                }
            }
        } else {
            toast.error("Failed to Login");
            navigate("/login");
        }
    } catch (loginError) {
        console.error('Login error:', loginError);
        toast.error(loginError.response?.data?.message || "Failed to login");
        navigate("/login");
    }
}

  return (
   <form
   className="flex flex-col w-full gap-y-4  mt-[9vh] "
   onSubmit={submitHandler} >
         <label className='w-full'>
              <p className='text-[0.875rem]
               text-richblack-5 mb-1 
              leading-[1.375rem]' >
                Email Address <sup className='text-pink-200'>*</sup>
              </p>
              <input type="email"
              required 
              value={formData.email}
              name='email'
              onChange={changeHandler}
              placeholder='Enter Email ID'
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
              />

          </label>
      
         <label className='w-full relative'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password <sup className='text-pink-200'>*</sup>
              </p>
              <input type={showPassword ? ("text") : ("password") }
              required 
              name='password'
              value={formData.password}
              onChange={changeHandler}
              placeholder='Enter Password'
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
             />
              
               <span   className='absolute right-3 top-[38px] cursor-pointer' 
               onClick={() => setShowPassword((prev) => !prev ) } >
                   {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> ) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'  />)  }
               </span>

             <Link to='#' >
               <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                  Forgot Password
               </p>
             </Link>
          </label>

          
          <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6' >
           Sign In
          </button>

 
    </form>
  )
}

export default LoginForm
