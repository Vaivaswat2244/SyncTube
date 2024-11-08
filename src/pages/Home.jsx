import React, { useState, useEffect } from 'react';
import FrontPageLoader from './FrontPageLoader';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/Navbar';
import Landing from '../assets/LandingPage.jpeg';
import Meeting from '../assets/Meeting.jpeg'
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); // Adjust the delay time as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className=" h-auto body flex flex-col items-center justify-center">
      {loading ? (
        // Show FrontPageLoader while loading is true
        <FrontPageLoader />
      ) : (
        // Show Home content once loading is false
        <div className='w-[100vw] flex flex-col min-h-screen '>
          <div>
            <Navbar />
          </div>

          <div className="Rectangle5 flex w-[72vw] mx-auto h-[90vh] mt-[15vh] ">
            <div className='w-[42vw] ml-[3vw] space-y-8'>
              <div className="Frame9 w-[8vw] h-14  bg-teal-700 mt-[2vh] rounded-2xl justify-start items-start gap-2.5 inline-flex">
                <div className="DigitalMarketingAgency ml-[1.5vw] mt-[1.2vh] text-white text-xl p-auto font-medium font-['Roboto']">About Us</div>
              </div>

              <div className="AdvancedAnalyticsToGrowYourBusiness  text-richblack-100 text-4xl font-semibold font-['Roboto']">
                Elevate Your Content: Hire Professional Editors, Unleash Your Vision.
              </div>

              <div className="iet w-96 text-blue-100 text-xl font-light font-['Roboto'] leading-normal">
                SyncTube is more than a platform; it's a creative ecosystem. We connect YouTubers with a network of talented editors, ensuring a seamless collaboration that results in stunning videos. Say goodbye to the hassle of finding the right editor; our platform streamlines the process, letting you concentrate on what you do best – creating incredible content for your audience.
              </div>

              <div className='flex felx-col'>
                <Link to="/login">
                  <button className='bg-blue-500  btn-pink rounded-xl text-richblack-100 py-[8px] px-[12px] border border-richblack-700'>
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className='bg-richblack-800 ml-[3vw] rounded-xl btn-pink text-richblack-100 py-[8px] px-[12px] border border-richblack-700'>
                    SignUp
                  </button>
                </Link>

              </div>
            </div>

            <div className='mt-[4vh]'>
              <img className="Rectangle6 w-[24vw] h-[60vh] rounded-3xl" src={Landing} alt="Landing Page" />
            </div>
          </div>



          <div className="flex min-w-screen bg-[#000814] space-x-12 min-h-[50vh] mt-[12vh]">
            <img className="Rectangle18 ml-[6vw]  w-[35vw] h-[55vh] mb-[2vh]  rounded-3xl mt-[25vh]" src={Meeting} />
            <div className='flex flex-col mt-[25vh]'>
              <div className=" w-[40vw] h-24 text-blue-100  text-3xl font-semibold font-['Roboto']">
              SyncTube: Where Creativity Meets Editing Excellence!               </div>
              <div className=" w-[35vw] h-[35vh] text-justify text-richblack-100 text-lg font-light font-['Roboto'] leading-normal">

                Introducing SyncTube, the revolutionary platform that bridges the gap between content creators and skilled video editors! Are you a YouTuber looking to elevate your content to new heights? Or perhaps you're a talented editor searching for exciting projects? Look no further! SyncTube seamlessly connects YouTubers with a network of professional editors, ensuring a perfect match for your creative needs.       </div>

              <div className=" w-[35vw] -mt-[12vh] text-justify text-richblack-100 text-lg font-light font-['Roboto'] leading-normal tracking-tight">
                Say goodbye to the hassle of finding the right editor or the stress of managing the editing process. With SyncTube, collaboration becomes effortless, allowing you to focus on what you do best – creating outstanding content. For editors, SyncTube opens the door to a world of opportunities, offering a platform where your skills are recognized and rewarded.         </div>
            </div>
          </div>
          <div>
          <Testimonials />
        </div>

       <div>
         <Footer/>

       </div>
        </div>
   
              
      )}
      
    </div>
  );
};

export default Home;


