import React from 'react'
import { useLocation } from 'react-router-dom';
import videos from '../assets/videos';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ProjectEditorPage.css'

const ProjectEditorPage = () => {
    const location = useLocation();
    const profileId = +location.pathname.split("/").pop().replace("id=", ""); // Convert to number
    console.log(profileId);

    const video = videos.find((video) => video.id === profileId);
    console.log("Video object:", video);

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        const truncated = words.slice(0, limit).join(' ');
        return truncated + (words.length > limit ? '...' : ''); // Append ellipsis if text is truncated
    };


    return (
        <div className='backgroung h-[100vh]  '>
            <Navbar />
            <div className='flex mt-[10vh] ' >
                {/* Dashboard */}
                <div className=''>
                    <div className="Rectangle fixed flex flex-col w-[20rem] h-[120vh] bg-violet-950 bg-opacity-75">

                        <img src="https://aeccc.targettechnology.in/static/media/PranayGupta.f3c530b7630ba8efb2ab.jpg" className="Ellipse1 mx-auto mt-9  w-44 h-44 bg-slate-400 rounded-full" >
                        </img>

                        <div className="YoutuberName w-80 h-24  mt-9 text-center text-white text-4xl font-normal font-['Inter']">
                            Pranay Gupta
                        </div>

                        <div className="Group2 w-80 h-48 relative">
                            <div className="Rectangle10 w-80 h-14 left-0 top-0 absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
                            <div className="Rectangle12 w-80 h-14 left-0 top-[4.1875rem] absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
                            <Link to='/youtuberprofiles'>
                                <button className="Projects w-80 h-14 left-[0.12rem] top-[0.225rem] absolute text-center text-black text-xl font-normal font-['Inter']">Youtubers</button>

                            </Link>
                            <Link to='/myprojectseditor'>
                                <button className="Editors w-36 h-14 left-[5.5rem] top-[4.075rem] absolute text-center text-black text-xl font-normal font-['Inter']">My Projects</button>
                            </Link>

                        </div>

                    </div>
                </div>

                {/*    <div className=' text-white'>
                        Click Here to get the video
                   </div>
                   <button className='text-white'>
                    Download 
                   </button> */}


                {/* Project Card Section */}
                <div className='ml-[25vw]  mt-[3vh] flex-col  '>
                    <div style={{ backgroundColor: 'rgba(120, 102, 136, 0.25)' }} className="Rectangle13 flex-col mx-auto w-[64vw] h-object-fit bg-slate-400 rounded-3xl">
                        <div className="Vlog54ByCarryminati w-full flex mx-auto flex-col h-52 text-center  ">
                            <span className="text-purple-400 text-5xl font-medium font-['front']">{video.title}</span>
                            <span className="text-black text-3xl font-medium font-['front']">by {video.youtuber_name}</span>
                        </div>

                        <div className='flex ml-[1.3vw] mr-[1vw] flex-col mt-[4vh]'>
                            <div className="DescriptionLoremIpsunEkfbWekfubnBdjwkbfe w-full mx-auto -mt-[15vh] h-80">
                                <span className="text-white text-3xl font-medium font-front">Description:  </span>
                                <p className="text-white text-3xl font-medium font-front">
                                    {truncateText(video.description, 35)}
                                </p>
                            </div>

                            <div className="DescriptionLoremIpsunEkfbWekfubnBdjwkbfe w-full -mt-[20vh] h-80">
                                <span className="text-white text-3xl font-medium font-Inter">Specifications:</span>
                                <p className="text-white text-3xl font-medium font-Inter">
                                    {truncateText(video.specifications, 35)}
                                </p>
                            </div>


                        </div>

                    </div>


                    <div className=''>
                        <button className='btn-pink mt-[5vh] ml-[26vw] '>
                            Upload Video
                        </button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ProjectEditorPage
