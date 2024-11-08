import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ key, video }) => {
    return (
        <div  >
        <Link to={`/myprojectseditor/id=${video.id}`}>

         <div className="bg-[#7979f0] mb-4 bg-opacity-30 h-full rounded-[18px] border border-black ccard">
         <div>

             <div className="">


                 <div className="p-4">
                     <div className="text-center ">
                         <p className=" text-violet-400 uppercase mx-auto mb-4 font-bold text-2xl  ">{video.title}</p>
                     </div>

                     <div className="text-center mt-4">
                         <p className=" w-full h-11 text-center text-white text-2xl font-normal font-['Inter']">
                             {video.description.split(' ').slice(0, 10).join(' ')}
                             {video.description.split(' ').length > 10 ? '...' : ''}
                         </p>
                     </div>

                     <div className="w-full h-full text-center text-white text-xl font-normal font-['Inter'] mt-[10vh]">
                         {video.specifications.split(' ').slice(0, 20).join(' ')}
                         {video.specifications.split(' ').length > 20 ? '...' : ''}
                     </div>

                     <div className="p-4">
                         <div className="text-center ">
                             <p className=" text-violet-700 uppercase mx-auto mb-4 font-bold text-xl"> Given by {video.youtuber_name}</p>
                         </div>
                     </div>
                 </div>
             </div>

         </div>
     </div>
         </Link>
        </div>
    )
}

export default ProjectCard
