import React from 'react'
import CardVideos from './CardVideos'

const VideoCard = ({ videos }) => {
    return (
        <div>
        <div className='grid grid-cols-3 h-full gap-4 w-[69vw] mt-16'>
          {videos.map((video, index) => (
            <CardVideos key={index} video={video} />
          ))}
        </div>
      </div>
      
    )
}

export default VideoCard

