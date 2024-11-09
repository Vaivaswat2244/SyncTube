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

            <div className="h-max">

            </div>
            <Footer/>
            
        </div>
    );
};

export default About;
