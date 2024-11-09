import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CreateAccountYoutuber = ({ isLoggedIn, setIsLoggeIn }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        channelName: "",
        image: null, // Store the image file object here
    });

    function changeHandler(event) {
        const { name, type, files } = event.target;

        // If it's a file input, use the files property
        const newValue = type === "file" ? files[0] : event.target.value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));
    }

    function submitHandler(event) {
        event.preventDefault();

        const url = 'https://synctube-backend-final.onrender.com/api/profile/create-profile';
        const token = localStorage.getItem('token');
        console.log(token);
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
                    if(response.status==200){
                        toast.success("Logged in");
                        navigate("/myprojectsyoutuber");
                    }
                    else{
                    toast.error("Failed to Login");
                    navigate("/createAccountYoutuber");
                    console.log(response)
                    }
                })
        }

            
        // Here you can send the formData to your server for further processing
    }
    return (
        <div className='backgorung'>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggeIn={setIsLoggeIn} />
            <div className="flex mx-auto mt-28 justify-center items-center " >
                <div className="flex  flex-col items-center w-[38rem] h-[54rem] rounded-xl  mb-28 bg-white" >
                    <h1 className='mt-6 font-bold text-md'>Welcome YouTuber , Complete your profile to get into World of Creators !!</h1>
                    <br />

                    <form onSubmit={submitHandler}>


                        <label className="self-stretch text-stone-500 text-xs font-semibold font-['Noto Sans'] leading-none " htmlFor="firstName" >
                            First Name
                        </label>
                        <br />


                        <div className="InputField w-96 h-14 p-4 bg-white rounded-lg border border-stone-300 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Text self-stretch justify-between items-start inline-flex">
                                <input
                                    className="TypeHere w-72 text-stone-500 text-base font-normal font-['Noto Sans'] leading-normal focus:outline-none"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Harsh"
                                    value={formData.firstName}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>


                        <br />



                        <label className="self-stretch text-stone-500 text-xs font-semibold font-['Noto Sans'] leading-none " htmlFor="lastName" >
                            Last Name
                        </label>

                        <br />

                        <div className="InputField w-96 h-14 p-4 bg-white rounded-lg border border-stone-300 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Text self-stretch justify-between items-start inline-flex">
                                <input
                                    className="TypeHere w-72 text-stone-500 text-base font-normal font-['Noto Sans'] leading-normal focus:outline-none"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Jaiswal"
                                    value={formData.lastName}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>


                        <br />

                        <label className="self-stretch text-stone-500 text-xs font-semibold font-['Noto Sans'] leading-none " htmlFor="email" >
                            Email
                        </label>

                        <br />


                        <div className="InputField w-96 h-14 p-4 bg-white rounded-lg border border-stone-300 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Text self-stretch justify-between items-start inline-flex">
                                <input
                                    className="TypeHere w-72 text-stone-500 text-base font-normal font-['Noto Sans'] leading-normal focus:outline-none"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="jaiswal@gmail.com"
                                    value={formData.email}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>


                        <br />


                        <br />

                        <label className="self-stretch text-stone-500 text-xs font-semibold font-'Noto Sans' leading-none" htmlFor="aboutMe">
                            Description
                        </label>

                        <br />
                        <div className="InputField w-96 h-40 p-6 bg-white rounded-lg border border-stone-300 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Text self-stretch justify-between items-start inline-flex">
                                <input
                                    className="TypeHere w-72 h-10 -mt-6 -ml-2
                       text-stone-500 text-base font-normal font-'Noto Sans' leading-normal focus:outline-none"
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="About your channel in about 50-60 words..."
                                    value={formData.description}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>








                        <br /> 
                        <label className="self-stretch text-stone-500 text-xs font-semibold font-['Noto Sans'] leading-none " htmlFor="channelName" >
                            Channel Name
                        </label>
                        <br />


                        <div className="InputField w-96 h-14 p-4 bg-white rounded-lg border border-stone-300 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Text self-stretch justify-between items-start inline-flex">
                                <input
                                    className="TypeHere w-72 text-stone-500 text-base font-normal font-['Noto Sans'] leading-normal focus:outline-none"
                                    name="channelName"
                                    id="channelName"
                                    placeholder="MrBeast"  
                                    value={formData.channelName}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>


                   


                        <br />

                        {/*              <input
                   type="file"
                   name="image"
                   id="image"
                   placeholder="Upload your Image"
                   onChange={changeHandler}
                   accept="image/*" // Specify accepted file types (in this case, any image type)
                   className="outline"
               />


*/}
                        

                        <label className="self-stretch text-stone-500 text-xs font-semibold font-['Noto Sans'] leading-none " htmlFor="image" >

                            Upload Image
                        </label>

                        <br />
                        <div className="InputField w-96 h-14 p-4 bg-white rounded-lg border border-stone-300 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Text self-stretch justify-between items-start inline-flex">
                                <input
                                    className="TypeHere w-72 text-stone-500 text-base font-normal font-['Noto Sans'] leading-normal focus:outline-none"
                                    type="file"
                                    name="image"
                                    id="image"
                                    placeholder="Upload your Image"
                                    onChange={changeHandler}
                                    accept="image/*" // Specify accepted file types (in this case, any image type)
                                />
                            </div>
                        </div>
                        <br />



                        <div className="flex justify-center mt-12 ">
                            <button type='submit' className=" bg-violet-500 w-40 text-lg  text-white font-bold py-2 px-3 rounded-lg">
                                Save
                            </button>
                        </div>


                    </form>

                </div>
            </div>

        </div>)
}

export default CreateAccountYoutuber


