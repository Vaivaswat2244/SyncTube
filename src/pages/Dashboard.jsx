import React, { useContext } from 'react'
import reviews from '../assets/review'
import CreatorData from '../components/CreatorData'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

  //consuming the app context data
  const { users } = useContext(AppContext);

  return (
    <div>
      <Navbar />
      <div className='flex' >
        {/* Dashboard */}
        <div className=''>
          <div className="Rectangle fixed flex flex-col w-[20rem]  mt-[9vh]  h-[120vh] bg-violet-950 bg-opacity-75">

            <img src="https://aeccc.targettechnology.in/static/media/PranayGupta.f3c530b7630ba8efb2ab.jpg" className="Ellipse1 mx-auto mt-9  w-44 h-44 bg-slate-400 rounded-full" >
            </img>

            <div className="YoutuberName w-80 h-24  mt-9 text-center text-white text-4xl font-normal font-['Inter']">
              
            </div>

            <div className="Group2 w-80 h-48 relative">
              <div className="Rectangle10 w-80 h-14 left-0 top-0 absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
              <div className="Rectangle12 w-80 h-14 left-0 top-[4.1875rem] absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
              <div className="Rectangle11 w-80 h-14 left-0 top-[8.375rem] absolute bg-slate-400 rounded-tr-2xl rounded-br-2xl" />
              <Link to='/myprojectsyoutuber'>
                <button className="Projects w-80 h-14 left-[0.12rem] top-[0.225rem] absolute text-center text-black text-xl font-normal font-['Inter']">Projects</button>

              </Link>
              <Link to='/homeyoutuber'>
                <button className="Editors w-36 h-14 left-[5.5rem] top-[4.075rem] absolute text-center text-black text-xl font-normal font-['Inter']">Editors</button>
              </Link>

              <Link to='/addprojectyoutuber'>
                <button className="Home w-32 h-14 left-[5.875rem] top-[8.025rem] absolute text-center text-black text-xl font-normal font-['Inter']">Add Project<br /></button>


              </Link>
            </div>

          </div>
        </div>

        {/* Project Card Section */}
        <div className='ml-[26vw] flex-grow'>
          {/* Adjust the ml-[20rem] to match the width of your dashboard */}
          <CreatorData users={users} />
        </div>


      </div>
    </div>
  )
}

export default Dashboard

