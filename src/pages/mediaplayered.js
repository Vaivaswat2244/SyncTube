import React from 'react';
import { useParams } from 'react-router-dom';
import SideDashboard from '../components/SideDashboard';

const VideoPlayerBasicEd = () => {
    const {videoUrl} = useParams();
    console.log(videoUrl);
  const handleAccept = () => {
    console.log('Video accepted');
  };
  
  const handleDecline = () => {
    console.log('Video declined');
  };
  
  return (
  <div className='flex space-x-48  '>
    <SideDashboard/>
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Video Player */}
      <div className="aspect-video w-full mb-6">
        {videoUrl ? (
          <video 
            className="w-full h-full rounded-lg"
            controls
            
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">No video URL provided</p>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      
    </div>

  </div>
  );
};

export default VideoPlayerBasicEd;