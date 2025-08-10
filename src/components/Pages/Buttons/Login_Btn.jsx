import React from 'react';
import styled from 'styled-components';

const Login_Btn = () => {
  return (
    <StyledWrapper>
      <button>
   
        <span>Login</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    background: transparent;
    position: relative;
    padding: 0px 15px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid rgb(78, 194, 81);
    border-radius: 25px;
    outline: none;
    overflow: hidden;
    color: rgb(78, 194, 81);
    transition: color 0.3s 0.1s ease-out;
    text-align: center;
  }

  button span {
    margin: 10px;
  }

  button::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  button:hover {
    color: #fff;
    border: 1px solid rgb(78, 194, 81);
  }

  button:hover::before {
    box-shadow: inset 0 0 0 10em rgb(78, 194, 81);
  }`;

export default Login_Btn;
