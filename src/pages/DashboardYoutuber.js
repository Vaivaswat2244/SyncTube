import React from 'react'
import Navbar from '../components/Navbar'
import './DashboardYoutuber.css'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import SideDashboard from '../components/SideDashboard';
const AddProject = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate= useNavigate();

    const [formData, setFormData] = useState({
        video: "null", 
        description: "",
        specifications: "",
        title:"",

    });

    const [selectedFile, setSelectedFile] = useState('null');

    function changeHandler(event) {
        const { name, type, files, value } = event.target;

        const newValue = type === "file" && files && files.length ? files[0] : value;
        const file = type === "file" && files && files.length ? files[0] : null;

        setSelectedFile(file);
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    }


    function submitHandler(event) {
        event.preventDefault();
        console.log(formData);

        const url = 'https://synctube-backend-final.onrender.com/api/project/create';
        const token = localStorage.getItem('token');
        console.log(token);
        console.log(formData)
        if (!token) {
            throw new Error('No authentication token found');
        }
        else{
            axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then(response => {
                    if(response.status==201){
                        toast.success(" Project Created");
                        navigate("/myprojectsyoutuber");
                    }
                    else{
                    toast.error("Try Again Later");
                    navigate("/addprojectyoutuber");
                    console.log(response)
                    }
                })
        }

        
    }

    return (
        <div className='backgorung'>

            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='flex space-x-48  ' >

                {/* Dashboard section */}
                {/* <div>
                    <div className="Rectangle relative   flex flex-col w-[20rem] h-[120vh]  bg-violet-950 bg-opacity-75" >


                        <img src="https://aeccc.targettechnology.in/static/media/PranayGupta.f3c530b7630ba8efb2ab.jpg" className="Ellipse1 mx-auto mt-9  w-44 h-44 bg-slate-400 rounded-full" >
                        </img>

                        <div className="YoutuberName w-80 h-24  mt-9 text-center text-white text-4xl font-normal font-['Inter']">
                            Pranay Gupta
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
                </div> */}
                {/* Rest Uploading  section */}
                <SideDashboard/>

                <form onSubmit={submitHandler} >

                    <div className='flex w-[57vw] flex-col space-y-8 mx-auto mt-10'>
                        <div className='flex w-[57vw] flex-col space-y-8 mx-auto mt-10'>
                            <div className="text-white">
                                <div className="mb-4">
                                    <h1 className="font-bold text-2xl">Upload Your Video Here</h1>
                                </div>
                                <div className='flex space-x-10 mt-8 ' >
                                    <label htmlFor="video" className="cursor-pointer inline-block bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600">
                                        Choose File
                                    </label>
                                    <input
                                        type="file"
                                        className="hidden"
                                        name="video"
                                        id="video"
                                        accept="video/*"
                                        onChange={changeHandler}
                                    />

                                    <div className="text-white">
                                        {selectedFile ? (
                                            <p className="mt-2">File Selected: {selectedFile.name}</p>
                                        ) : (
                                            <p className="mt-2">No File Selected</p>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>


                        <div>
                            <h1 className='text-white font-bold text-2xl'> Description of Video </h1>
                        </div>
                        <div className="w-full h-56 rounded-lg">
                            <input
                                className={`w-full pb-32 pt-2 -mb-4 px-3 text-richblack-800 text-lg bg-slate-400 rounded-lg black-placeholder`}
                                name="description"
                                id="description"
                                placeholder="Add Description of Your Video "
                                value={formData.description}
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <div  >
                                <div>
                                    <h1 className='text-white -mt-10 font-bold  text-2xl'> Any Specifications you want to add in video  </h1>
                                </div>
                                <div className="w-full h-56 mt-7  rounded-lg ">
                                    <input
                                        className="w-full pb-24 pt-2 px-3 black-placeholder text-lg bg-slate-400 rounded-lg "
                                        name="specifications"
                                        id="specifications"
                                        placeholder="Mention Specifications you want in your video.."
                                        value={formData.specifications}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                        </div>


                    
                       <div>
                       <div>
                       <h1 className='text-white font-bold text-2xl -mt-24'> Title of Video </h1>
                   </div>

                   <div className="w-full  h-56 rounded-lg">
                       <input
                           className={`w-full pb-8 pt-2 mt-8 -mb-4 px-3 text-richblack-800 text-lg bg-slate-400 rounded-lg black-placeholder`}
                           name="title"
                           id="title"
                           placeholder="Add Title for your video.. "
                           value={formData.title}
                           onChange={changeHandler}
                       />
                   </div>

                       </div>


                    </div>
                    <button type='submit' className=" bg-violet-500 btn-pink w-46 flex mx-auto h-30   text-lg  text-white font-bold py-2  px-16 rounded-lg">
                        Add Project
                    </button>
                </form>


            </div>




            <div className="flex justify-center mt-12 ">

            </div>



        </div>
    )
}

export default AddProject
