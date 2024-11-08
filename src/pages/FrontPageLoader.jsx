import React from 'react';

const FrontPageLoader = () => {
  return (
    <div>
      {/* Reset */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css" />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet" />
    
      {/* Styles */}
      <style>
        {`
          :root {
            --loader-text-color: #f6e9fe;
            --loader-dot-color: #A51FF6;
            --loader-bg: #100319;
          }

          html {
            font-size: 16px;
            font-family: 'Poppins', sans-serif;
            line-height: 1.5;
          }

          .loader-container {
            position: fixed;
            inset: 0;
            z-index: 999;
            background-color: richblack-900;
            display: grid;
            place-content: center;
            transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
          }

          /* Air */
          svg {
            width: 30rem;
            font-weight: 700;
          }

          svg text {
            font-size: 5rem;
            stroke-width: 2;
          }

          svg text.text-body {
            stroke: var(--loader-text-color);
            animation: 12s 1 alternate animate-stroke;
          }

          @keyframes animate-stroke {
            0% {
              fill: transparent;
              stroke: var(--loader-text-color);
              stroke-width: 3;
              stroke-dashoffset: 25%;
              stroke-dasharray: 0 32%;
            }
            50% {
              fill: transparent;
              stroke: var(--loader-text-color);
              stroke-width: 3;
            }
            80%, 100% {
              fill: var(--loader-text-color);
              stroke: transparent;
              stroke-width: 0;
              stroke-dashoffset: -25%;
              stroke-dasharray: 32% 0;
            }
          }
        `}
      </style>

      <div className="loader-container">
        {/* Air */}
        <svg viewBox="0 0 400 160">
          <text x="50%" y="50%" dy=".32rem" textAnchor="middle" className="text-body mt-20">
            SyncTube
          </text>
        </svg>
      </div>
    </div>
  );
};

export default FrontPageLoader;
