import React from 'react';
import { useParams } from 'react-router-dom';
import SideDashboard from '../components/SideDashboard';

const VideoPlayerBasic = () => {
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
      <div className="flex justify-center gap-4">
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg 
                   flex items-center gap-2 transition-colors duration-200"
        >
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          Accept
        </button>
        
        <button
          onClick={handleDecline}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                   flex items-center gap-2 transition-colors duration-200"
        >
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
          </svg>
          Decline
        </button>
      </div>
    </div>

  </div>
  );
};

export default VideoPlayerBasic;