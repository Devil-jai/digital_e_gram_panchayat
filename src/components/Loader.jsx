import React from 'react';

const Spinner = () => {
  return (
    <>
      <style>
        {`
          @keyframes spinRing {
            100% {
              transform: rotate(1turn);
            }
          }

          .spinner::before,
          .spinner::after {
            content: "";
            grid-area: 1/1;
            margin: 2px;
            border: 4px solid transparent;
            border-radius: 50%;
            border-right-color: #004dff;
            animation: spinRing 2s infinite linear;
          }

          .spinner::after {
            margin: 8px;
            animation-duration: 3s;
          }
        `}
      </style>

      <div className="flex items-center justify-center min-h-screen bg-white">
        <div
          className="spinner grid w-14 h-14 rounded-full border-4 border-transparent border-r-[#004dff]"
          style={{
            animation: 'spinRing 1s infinite linear',
          }}
        ></div>
      </div>
    </>
  );
};

export default Spinner;
