import React from 'react'
import signup from '../assets/signup.png'
import Template from '../components/Template'
import Navbar from '../components/Navbar'

const Signup = ({ setIsLoggedIn, isLoggedIn }) => {
  return (
    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Template
        title="Lights, Camera,Edit:Connecting You with Top-tier Video Editors."
        desc1="Transforming Visions into Videos: Discover Top Editors Now!"
        desc2="Where Creativity Meets Career: Video Editing Internships Await Your Talent."
        image={signup}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}

      />
    </div>

  )
}

export default Signup
