import React from 'react';
import styled from 'styled-components';

const Admin_btn = () => {
  return (
    <StyledWrapper>
      <button>
        <svg
          viewBox="0 0 640 512"
          height="1.5em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M622.3 271.1l-115.2-45c-4.1-1.6-8.6-1.6-12.7 0l-115.2 45c-6.5 2.5-10.8 8.7-10.8 15.6v136c0 63.8 49.4 119.8 121.3 127.7 1.1.1 2.3.2 3.4.2s2.3-.1 3.4-.2c71.9-7.9 121.3-63.9 121.3-127.7v-136c0-6.9-4.3-13.1-10.8-15.6zM528 480c-53-6-96-50.6-96-104.9v-119.1l96-37.5 96 37.5v119.1c0 54.3-43 98.9-96 104.9zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0 32c-63.6 0-192 32.5-192 96v48c0 8.8 7.2 16 16 16h387.1c-15.6-17.6-27.1-37.8-32.8-59.6-5.8-2.6-11.5-5-17.4-7.1C343.4 366.4 280.6 352 224 352s-119.4 14.4-160 33.3V384c0-32 83.4-64 160-64 33.8 0 69.4 6.4 100.5 16.4 7.7-13 18.1-24.4 30.5-33.6-18.2-7.4-37.9-13.2-57.7-17.2-23.2-4.7-47.3-7.6-73.3-7.6z"/>
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    width: 50px;
    height: 50px;
    border: 3px solid rgb(78, 194, 81);
    border-radius: 45px;
    transition: all 0.3s;
    cursor: pointer;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    background: rgb(78, 194, 81);
  }

  svg {
    fill: rgb(78, 194, 81);
    transition: all 0.3s ease;
    width: 20px;
  }

  button:hover svg {
    fill: white;
    transform: scale(1.2);
  }
`;

export default Admin_btn;
