import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const TestCard = (props) => {
  let review = props.review;
  return (
    <div className="flex flex-col items-center md:flex-row md:space-x-4">


    <div className="text-center space-y-4 ml-[1vw] w-[35vw] mt-[5vh]">
    <p className="font-bold text-3xl  mt-[1vh] text-blue-100 capitalize" style={{ lineHeight: '1.5' }}>
      {review.name}
    </p>
    <p className="text-violet-300 text-md uppercase" style={{ lineHeight: '1.5' }}>
      {review.job}
    </p>
  </div>
  

      <div className="text-center  text-lg mt-4 text-slate-500">
        {review.text}
      </div>
    </div>

  );
};

export default TestCard;
