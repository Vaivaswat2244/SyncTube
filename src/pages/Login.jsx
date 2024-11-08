import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"
import Navbar from '../components/Navbar'
const Login = ({ setIsLoggedIn, isLoggedIn }) => {
  return (

    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Template
        title="Welcome Back"
        desc1="Creatrors Connected, Videos Perfected."
        desc2="From Vision to Channel, We Deliever."
        image={loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}

      />
    </div>

  )
}

export default Login
