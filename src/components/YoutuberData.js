import React from 'react'

const YoutuberData = ({ user }) => {

 
    return (
        <div className="bg-[#7979f0] mb-4 bg-opacity-30 h-full rounded-[18px] border border-black ccard">
            
                    <div className="">
                        <div className="relative scale-90 rounded-md z-20">
                            <img src={user.youtuber_Image} alt="" className="mx-auto iimage w-[220px] mt-6 h-[220px] bg-zinc-200 rounded-full border border-black relative z-10" />
                            <div className="absolute bg-violet-500 rounded-full top-[6px] z-[-1] left-[12px] w-full"></div>
                        </div>


                        <div className='p-4'>
                            <div className="text-center mt-">
                                <p className="w-full h-11 text-center text-white text-2xl font-normal font-['Inter']">{user.name}</p>
                            </div>

                            <div className="text-center mt-4">
                                <p className="text-violet-400 uppercase mx-auto mb-4 font-bold text-2xl">{user.youtuber_desc}</p>
                            </div>

                            <div className="w-full h-full text-center text-white text-xl font-normal font-['Inter']">
                                {user.past_xp.split(' ').slice(0, 35).join(' ')}
                                {user.past_xp.split(' ').length > 35 ? '...' : ''}
                            </div>
                        </div>
                    </div>
             
        </div>
    )
}

export default YoutuberData
