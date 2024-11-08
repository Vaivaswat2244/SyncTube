import React from 'react';
import Card from "./Card";
import { Link } from 'react-router-dom';



const CreatorData = ({ users }) => {
  return ( 

      <div className='grid grid-cols-3 h-full gap-4 w-[63vw]  mt-28  '>
      {users.map((user, index) => (
        <Card className='' key={index} user={user} index={index} />
      ))}
      </div>
      
  );
};

export default CreatorData;
