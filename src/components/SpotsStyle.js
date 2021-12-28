import styled from "styled-components";


export const MainContainer = styled.div`
    height: 100vh;
    width: auto;
`

export const TopLeft = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 0 0 20px;
    background: linear-gradient(155deg, rgba(255,119,1,0.3) 0%, rgba(42,42,42,0) 50%);
`

export const Title = styled.h1`
    font-size: 50px;
    margin-bottom: 20px;
    font-weight: 500;
    color: #ec7813;
    text-shadow: 5px 5px 20px rgb(22, 12, 3);
`

export const HelloUser = styled.p`
    font-size: 20px;
    color: white;
    font-weight: 4100;
`

export const SignInOrOutButton = styled.button`
    background-color: rgb(0, 0, 0, 0.8);
    font-size: 20px;
    color: white;
    border-radius: 10px;
    border: none;
    width: 30%;
    margin-bottom: 20px;
`

export const AddSpotButton = styled.button`

    &.addSpot{
    position: fixed;
    bottom: -10%;
    left: 0;
    transform-origin: left top;
    transform: rotate(-90deg);
    background: linear-gradient(145deg, rgba(255,119,1,0.3) 0%, rgba(42,42,42,0) 70%);
    font-size: 25px;
    color: #aeaeb0;
    border: none;
    padding: 10px 80px;
    z-index: 1;
    transition: color .2s ease-in-out;
    }

    &.addSpot:hover{
        color: white;
    }

    &.addSpot::before{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        z-index: -1;
        transition: opacity .2s ease-in-out;
        opacity: 0;
        background: linear-gradient(145deg, rgba(255, 119, 0, 0.9) 0%, rgba(42,42,42,0) 70%);
    }

    &.addSpot:hover::before {
        opacity: 1;
    }
  `


export const Error = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
    background-color: rgb(0, 0, 0, 0.9);
    font-size: 30px;
    padding: 15px 50px;
    border-radius: 10px;
    box-shadow: 3px 3px 20px black;
`