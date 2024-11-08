import React from 'react'
import YoutuberData from './YoutuberData'

const YoutuberCard = ({users}) => {
  return (
    <div>
    <div className='grid grid-cols-3 h-full gap-4 w-[63vw]  mt-28  '>
    {users.map((user, index) => (
      <YoutuberData className='' key={index} user={user} index={index} />
    ))}
    </div>
    </div>
  )
}

export default YoutuberCard
