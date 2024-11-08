import React from 'react'
import Navbar from '../components/Navbar'
import VideoCard from '../components/VideoCard'
import videos from '../assets/videos'
import { Link } from 'react-router-dom'
import SideDashboard from '../components/SideDashboard'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
          const url = 'https://synctube-backend-final.onrender.com/api/project/getallproject'
          
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
          });
          console.log(response.data.projects)
          setProjects(response.data.projects);
          
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchProjects();
    }, []);
    return (
        <div className='backgroung'>
           <div className=''>
           <Navbar />
           </div>
            <div className='flex' >
                
                <SideDashboard/>

                {/* Project Card Section */}
                <div className='ml-[8vw] flex-grow'>
                    {/* Adjust the ml-[20rem] to match the width of your dashboard */}
                    <VideoCard videos={projects} />
                </div>


            </div>


        </div>
    )
}

export default AllProjects
