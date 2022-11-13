import React from 'react';
import styled, { keyframes } from 'styled-components';

export const Loader = ({ color }) => (
  <Overlay>
    <CircleMain color={color}>
      {[...new Array(12)].map((_, i) => (
        <Dot key={i} />
      ))}
    </CircleMain>
  </Overlay>
);


// animation
const circleBounceDelay = keyframes`
    0%, 80%, 100% {
        -webkit-transform: scale(0);
                transform: scale(0);
        } 
        40% {
        -webkit-transform: scale(1);
                transform: scale(1);
        } 
`;

const CircleMain = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  & div:nth-child(2) {
    transform: rotate(30deg);
    &:before {
      animation-delay: -1.1s;
    }
  }
  & div:nth-child(3) {
    transform: rotate(60deg);
    &:before {
      animation-delay: -1s;
    }
  }
  & div:nth-child(4) {
    transform: rotate(90deg);
    &:before {
      animation-delay: -0.9s;
    }
  }
  & div:nth-child(5) {
    transform: rotate(120deg);
    &:before {
      animation-delay: -0.8s;
    }
  }
  & div:nth-child(6) {
    transform: rotate(150deg);
    &:before {
      animation-delay: -0.7s;
    }
  }
  & div:nth-child(7) {
    transform: rotate(180deg);
    &:before {
      animation-delay: -0.6s;
    }
  }
  & div:nth-child(8) {
    transform: rotate(210deg);
    &:before {
      animation-delay: -0.5s;
    }
  }
  & div:nth-child(9) {
    transform: rotate(240deg);
    &:before {
      animation-delay: -0.4s;
    }
  }
  & div:nth-child(10) {
    transform: rotate(270deg);
    &:before {
      animation-delay: -0.3s;
    }
  }
  & div:nth-child(11) {
    transform: rotate(300deg);
    &:before {
      animation-delay: -0.2s;
    }
  }
  & div:nth-child(12) {
    transform: rotate(330deg);
    &:before {
      animation-delay: -0.1s;
    }
  }
`;
const Dot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  &:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: ${props => props.color || 'var(--color-primary-darker)'};
    border-radius: 100%;
    animation: ${circleBounceDelay} 1.2s infinite ease-in-out both;
  }
`;

// styled
const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;
