import React from "react";
import styled from "styled-components";
import { useModalContext } from "../../contexts/ModalContext";

const Container = styled.div`
    width: 100%;
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #d9d9d9;
    transition: visibility .3s, height .3s ease-in;
    overflow: hidden;
    visibility: hidden;

    &.shown{
        visibility: visible;
        height: 300px;
        transition: visibility .4s, height .4s ease-out;
        padding: 10px 0;
    }
`

const SpotName = styled.p`
    font-size: 1.7vw;
    width: 90%;
    text-align: center;
    margin: 0;
    color: #d9d9d9;
`

const SpotImg = styled.div`
    width: 90%;
    height: 200px;
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    margin: 3px;
`

const ObstaclesList = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    color: white;
    flex-wrap: wrap;
    margin: 3px;
`
const Obstacle = styled.div`
    color: #d9d9d9;
    font-size: 1vw;
    margin: 0 5px;
`

const Button = styled.p`
    color: white;
    background-color: #212121;
    border-radius: 10px;
    padding: 1% 15%;
    font-size: 1vw;
    cursor: pointer;
    margin-top: 3px;
    &:hover{
        box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.7);
        transition: .2s all;
    }
`

const RowDropDown = ({toggle, data}) => {

    const { setInfoModalToggle, setIdNumber } = useModalContext()
    

    return(
        <Container className={`${toggle ? "shown" : ""}`}>
            <SpotName>{data.name}</SpotName>
            <SpotImg style={{backgroundImage: `url(${data.imgURLs[0]})`}}/>
            <ObstaclesList>
            {data.obstacles.map((ob, index) => {
                return(
                    <Obstacle key={index}>{ob.charAt(0).toUpperCase() + ob.slice(1)} &#10004;</Obstacle>
                )
            })}
            </ObstaclesList>
            <Button onClick={() => {setIdNumber(data.id); setInfoModalToggle(true);}} >More Info</Button>
        </Container>
    )
}

export default RowDropDown;