import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SideDashboard = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('https://synctube-backend-final.onrender.com/api/profile/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setProfileData(response.data);
                
                setLoading(false);
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return (
            <div className="Rectangle relative flex flex-col w-80 h-screen">
                <div className="flex items-center justify-center h-full">
                    <div className="text-white">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="Rectangle relative flex flex-col w-80 h-screen ">
                <div className="flex items-center justify-center h-full">
                    <div className="text-white">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="Rectangle relative flex flex-col w-80 h-screen ">
                <img 
                    src={profileData.user.image} 
                    alt="Profile"
                    className="Ellipse1 mx-auto mt-9 w-44 h-44 bg-slate-400 rounded-full object-cover"
                />

                <div className="YoutuberName w-80 h-24 mt-9 text-center text-white text-4xl font-normal font-['Inter']">
                    {profileData.user.name}
                </div>

                <div className="Group2 w-80 h-48 relative">
                    <div className="Rectangle10 w-80 h-14 left-0 top-0 absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
                    <div className="Rectangle12 w-80 h-14 left-0 top-[4.1875rem] absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
                    <div className="Rectangle11 w-80 h-14 left-0 top-[8.375rem] absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
                    
                    <Link to='/myprojectsyoutuber'>
                        <button className="Projects w-80 h-14 left-[0.12rem] top-[0.225rem] absolute text-center text-black text-xl font-normal font-['Inter']">
                            Projects
                        </button>
                    </Link>
                    
                    <Link to='/homeyoutuber'>
                        <button className="Editors w-36 h-14 left-[5.5rem] top-[4.075rem] absolute text-center text-black text-xl font-normal font-['Inter']">
                            Editors
                        </button>
                    </Link>
                    
                    <Link to='/addprojectyoutuber'>
                        <button className="Home w-32 h-14 left-[5.875rem] top-[8.025rem] absolute text-center text-black text-xl font-normal font-['Inter']">
                            Add Project
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideDashboard;