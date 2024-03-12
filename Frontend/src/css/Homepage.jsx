import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  /* border-radius: 10px; */
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  max-width: 100%;
`;

export const Header = styled.div`
  background-color: #ff4b2b;
  /* border-radius: 10px; */
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
`;

export const HeaderElement = styled.div`
  display: flex;
  float: right;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
`;

export const BodyItem = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  padding: 20px;

  font-size: 30px;
  text-align: center;
`;

export const LockedScreen = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  width: 700px;
  height: 600px;
  background-color: #b1b1b1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const LockedTitle = styled.span`
  font-weight: bold;
  font-size: 45px;
  margin: 0;
  text-align: center;
  color: rgb(35, 63, 57);
`;

export const LockedPhoto = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  font-size: 30px;
  text-align: center;
  background-color: #b1b1b1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DetailScreen = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 20px;
  padding: 20px;
  font-size: 30px;
  width: 700px;
  height: 600px;
  background-color: #ff4b2b;
  display: flex;
  flex-direction: column;
`;

export const DetailContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 20px;
  font-size: 30px;
  text-align: center;
  background-color: #b1b1b1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

export const WelcomeTextContainer = styled.div`
  display: flex;
`;
export const Post = styled.button`
  justify-content: left;
`;

const cursor = keyframes`
50% {
  border-color: transparent
}
`;

const typing = keyframes`
from {
    width: 0;
  }
`;

export const WelcomeText = styled.p`
  font-weight: bold;
  font-size: 35px;
  margin: 0;
  text-align: end;
  color: rgb(35, 63, 57);
  letter-spacing: 5px;
  font-family: monospace;
  border-right: 5px solid;
  padding-top: 5px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  animation: ${typing} 2s steps(18), ${cursor} 0.4s step-end infinite alternate;
`;

// export const TypingAnimation = keyframes`
//   from {
//     width: 0;
//   }
//   to {
//     width: 100%;
//   }
// `;

// export const TypewriterText = styled.div`
//   overflow: hidden;
//   white-space: nowrap;
//   animation: ${TypingAnimation} 3s steps(40, end) infinite;
//   border-right: 2px solid #000;
//   font-size: 18px;
//   font-family: "Courier New", monospace;
// `;
