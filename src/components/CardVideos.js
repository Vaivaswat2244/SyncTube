import React from 'react';
import { Link } from 'react-router-dom';
import './cardvideos.css'

const CardVideos = ({ video }) => {
  // Add a guard clause to handle undefined video prop
  if (!video) {
    return null;
  }

  // Safely access description and specifications with fallbacks
  const description = video.description || '';
  const specifications = video.specifications || '';

  return (
    <Link to={`/projects/${video.project_id}`}>
      <div>
        <div className="bg-[#7979f0] mb-4 bg-opacity-30 h-full rounded-[18px] border border-black ccard">
          <div>
            <div className="">
              <div className="relative scale-90 rounded-md z-20">
                <img
                  src={video.image || ''}
                  alt=""
                  className="mx-auto iimage w-[220px] mt-6 h-[220px] bg-zinc-200 rounded-lg border border-black relative z-10"
                />
                <div className="absolute bg-violet-500 rounded-full top-[6px] z-[-1] left-[12px] w-full"></div>
              </div>

              <div className="p-4">
                <div className="text-center">
                  <p className="text-violet-400 uppercase mx-auto mb-4 font-bold text-2xl">
                    {video.title || ''}
                  </p>
                </div>

                <div className="text-center mt-4">
                  <p className="w-full h-11 text-center text-white text-2xl font-normal font-['Inter']">
                    {description.split(' ').slice(0, 10).join(' ')}
                    {description.split(' ').length > 10 ? '...' : ''}
                  </p>
                </div>

                <div className="w-full h-full text-center text-white text-xl font-normal font-['Inter'] mt-[10vh]">
                  {specifications.split(' ').slice(0, 20).join(' ')}
                  {specifications.split(' ').length > 20 ? '...' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardVideos;