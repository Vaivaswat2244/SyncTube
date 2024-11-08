import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './About.css';
import Profile from '../assets/profile.png';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const About = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        console.log("Modal is Open");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("Modal is closed");
        setIsModalOpen(false);
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className="circle1 mt-[19vh]"></div>
            <div className="circle2"></div>

            <div className="grid grid-cols-3">
                {/* First card-wrapper */}
                <div className="card-wrappers -mr-[2vw] mx-auto w-[22vw] h-[440px] mt-[25vh] bg-[#ffffff30] rounded-3xl opacity-75">
                    <div>
                        <img src={Profile} className="profile mx-auto mt-[2vh]" alt="harsh" />
                    </div>

                    <div className="user-name">
                        <h2>Harsh Jaiswal</h2>
                    </div>

                    <div className="designation">
                        <h3>Option Trader, Blockchain Developer</h3>
                    </div>

                    <div className="bottom-group mx-auto ml-[1vw] mt-[1vh]">
                        <Link to='https://www.linkedin.com/in/harsh-jaiswal-13419a244/' onClick={openModal} className="btn-share btn-card">
                            <i className="fa-solid fa-share"></i>
                            <div className=""> Share Profile </div>
                        </Link>

                        <button className="btn-follow btn-card"> Follow me </button>
                        <div className="harsh">
                            <a href=""></a>
                        </div>
                    </div>
                </div>

                {/* Second card-wrapper */}
                <div className="card-wrappers mx-auto w-[22vw] h-[440px] bg-[#ffffff30]  mt-[25vh] rounded-3xl opacity-75">
                    {/* Content of the second card-wrapper */}
                    <div>
                        <img src={Profile} className="profile mx-auto mt-[2vh]" alt="harsh" />
                    </div>

                    <div className="user-name">
                        <h2>Vishwa Patel</h2>
                    </div>

                    <div className="designation">
                        <h3>Valo Enthusiast , Python Expert</h3>
                    </div>
                    <div className="bottom-group ml-[1vw] mt-[1vh] mx-auto">
                        <Link to='https://www.linkedin.com/in/vishwa-patel-323218196/' onClick={openModal} className="btn-share btn-card">
                            <i className="fa-solid fa-share"></i>
                            <div className=""> Share Profile </div>
                        </Link>


                        <button className="btn-follow btn-card"> Follow me </button>
                        <div className="harsh">
                            <a href="https://www.github.com/iiitianharsh"></a>
                        </div>
                    </div>
                </div>

                {/* Third card-wrapper */}
                <div className="card-wrappers mx-auto -ml-[2vw]  w-[22vw] h-[440px] bg-[#ffffff30] mt-[25vh] rounded-3xl opacity-75">
                    {/* Content of the third card-wrapper */}
                    <div>
                        <img src={Profile} className="profile mx-auto mt-[2vh]" alt="harsh" />
                    </div>

                    <div className="user-name">
                        <h2>Vaivaswat Dubey</h2>
                    </div>

                    <div className="designation">
                        <h3>Open Source Contributor , Backend Developer</h3>
                    </div>
                    <div className="bottom-group ml-[1vw] mt-[1vh] mx-auto">
                        <Link to='https://www.linkedin.com/in/vaivaswat-dubey-12145224b/' onClick={openModal} className="btn-share btn-card">
                            <i className="fa-solid fa-share"></i>
                            <div className="">Share Profile </div>
                        </Link>


                        <button className="btn-follow btn-card"> Follow me </button>
                        <div className="harsh">
                            <a href="https://www.github.com/iiitianharsh"></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-header">
                        <h1>Share My Profile</h1>
                        <div>
                            <i onClick={closeModal} className="fa-solid fa-xmark close"></i>
                        </div>
                    </div>

                    <div>
                        <h3>Share this Via</h3>


                    </div>
                </div>
            )}

            {/* Overlay */}
            {isModalOpen && <div className="overlay" onClick={closeModal}></div>}

            {/* Script tags */}
            <script src="https://kit.fontawesome.com/58a810656e.js" crossOrigin="anonymous"></script>
            {/* Include your script.js logic here */}
            <div className='mt-[30vh]'>
            <Footer/>
            </div>
        </div>
    );
};

export default About;
