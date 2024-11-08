import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import users from '../assets/user';
import './EditorProfile.css'
import gsap from 'gsap';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Loading from '../assets/Loading';

const EditorProfile = () => {


  //consuming the app context data
  const { users, loading } = useContext(AppContext);

  const location = useLocation();
  const profileId = location.pathname.split("/").pop().replace("id=", "");
  console.log(profileId);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const user = users.find((user) => user._id === profileId);

  const activateMagneto = () => {
    let magnetoStrength = 60; // Adjust the strength for more or less movement

    let moveX = (mousePosition.x - window.innerWidth / 2) / window.innerWidth * magnetoStrength;
    let moveY = (mousePosition.y - window.innerHeight / 2) / window.innerHeight * magnetoStrength;

    gsap.to('.magneto', { x: moveX, y: moveY, duration: 0.1, ease: 'power2.out' });
    gsap.to('.magneto .text', { x: moveX * 1.5, y: moveY * 1.5, duration: 0.1, ease: 'power2.out' });
  };

  const resetMagneto = () => {
    gsap.to('.magneto', { x: 0, y: 0, duration: 0.1, ease: 'power2.out' });
    gsap.to('.magneto .text', { x: 0, y: 0, duration: 0.1, ease: 'power2.out' });
  };

  return (

    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='backgorung'>
          <Navbar />

          <div className='flex backgroung w-full h-full  ' >


            {/* 1st div for image and achievements */}
            <div className='flex flex-col ml-16  mt-[15vh] '>
              <div className="w-[276.24px] h-[261.37px] ml-10 rounded-full shadow border border-white">
                <img className="w-[276.24px] h-[261.37px] bg-[#0e2a43] rounded-full shadow border border-white" src={user.editor_Image} />
              </div>
              <div className="w-[339.10px] mt-6 h-[650.96px] bg-[rgba(14, 42, 67, 0.5)] rounded-[10px] border border-white">
                <div className="w-[276.24px] mt-8 mx-auto h-[55.89px] text-white text-3xl font-normal font-['Inter']">
                  {user.name}
                </div>
                <div className="w-[276.24px] mt-2 mx-auto h-[31.23px] text-white text-md font-normal font-['Inter']">
                  name@mail.com
                </div>
              </div>
            </div>


            {/* 2nd div for jp description containers and resume portfolio */}

            <div className='flex flex-col w-[1136.74px] h-[965px] ml-16 space-y-18 mt-[16vh] overflow-x-hidden mr-12 ' >

              <div className="w-[1000.74px] h-[200.99px] mb-8">
                <div className="w-[1028.67px] h-[246.76px] bg-none rounded-[10px] border mr-12 border-black" style={{ backgroundColor: "rgba(2, 0, 36, 0.3)" }}>
                  <div className="p-4 text-white">
                    {user.past_xp}
                  </div>
                </div>
              </div>


              <div className="w-[1000.74px] h-[200.99px] mt-16 mb-8">
                <div className="w-[1028.67px] h-[246.76px] bg-[#0e2a43] rounded-[10px] border mr-12 border-black" style={{ backgroundColor: "rgba(14, 42, 67, 0.5)" }}>
                  <div className="p-4 text-white">
                    {user.past_xp}
                  </div>
                </div>
              </div>

              <div className="w-[1000.74px] flex mx-auto   h-[60.99px] mt-32  ">


                <div className='space-x-16'>
                  <button className='bg-sky-300 text-lg w-[1000.74px] ml-60 rounded-lg  btn-pink  py-[8px] px-[12px] border border-richblack-700'>
                    Resume
                  </button>
                  <button className='bg-blue-500 text-lg w-[1000.74px] btn-pink rounded-lg  text-richblack-100 py-[8px] px-[12px] border border-richblack-700'>
                    Portfolio
                  </button>
                </div>


              </div>


              <div className="w-[1000.74px] flex mx-auto h-[60.99px] mt-16 ml-80 -mr-60"
                onMouseMove={activateMagneto}
                onMouseLeave={resetMagneto}
              >
                <button className="magneto text-white rounded-full bg-green-800 w-48 h-20 ">
                  <span className="text">Hire Me</span>
                </button>
              </div>



            </div>


          </div>
        </div>

      )}

    </div>

  );
};

export default EditorProfile;
