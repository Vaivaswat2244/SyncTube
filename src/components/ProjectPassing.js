import React from 'react'
import ProjectCard from './ProjectCard'

const ProjectPassing = ({videos}) => {
  return (
    <div>
    <div className='grid grid-cols-3 h-full gap-4 w-[69vw] mt-16'>
      {videos.map((video, index) => (
        <ProjectCard key={index} video={video} />
      ))}
    </div>
  </div>
  )
}

export default ProjectPassing
