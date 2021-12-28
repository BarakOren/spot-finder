import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Title = styled.p`
    margin-top: 3px;
    margin-bottom: 15px;
    font-size: 30px;
    font-weight: 500;
    line-height: 1;
    color: white;
`

const Info = styled.p`
    margin-bottom: 15px;
    font-size: 15px;
    color: rgb(36, 36, 36);
    color: #d9d9d9;
`
const Obstacle = styled.p`
    font-size: 15px;
    margin: 3px 5px;
    color: #d9d9d9;
`

const ObstaclesList = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 15px;
`

const Image = styled.div`
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background-position: center;
    background-size: cover;
    margin-bottom: 15px;
`

const MoreInfoButton = styled.button`
    border: none;
    border-radius: 10px;
    font-size: 18px;
    background-color: rgb(24,23,25, 1);
    padding: 3px 30px;
    color: rgb(255, 255, 255);

    &:hover{
        box-shadow: 0 0 25px rgb(255,119,1, 0.5);
        transition: 200ms all;
    }
`


export const PopUpOnMap = (props) => {
    const {id, name, description, obstacles, img} = props;
    const { setInfoModalToggle , setIdNumber } = props;

    function capitalize(words) {
        var word = words.toLowerCase().split(',');
        for (var i = 0; i < word.length; i++) {
           word[i] = word[i].charAt(0).toUpperCase() +
           word[i].substring(1);
        }
        return word
      }
      
    const obstaclesArray = capitalize(obstacles);

    function openMoreInfo(){
        setIdNumber(id)
        setInfoModalToggle(true)
    }

    return(
        <Container> 
            <Title>{name}</Title>
            <Info>{description.length < 120 ? description : description.slice(0, 120).concat("...")}</Info>
            <Image style={{backgroundImage: `url(${img})`}} />
            <ObstaclesList>
                {obstaclesArray.map((o, index) => {
                    return(<Obstacle key={index}>{o} &#10004;</Obstacle>)
                    })
                }
            </ObstaclesList>
            <MoreInfoButton onClick={() => openMoreInfo()}>More Info</MoreInfoButton>
        </Container>
   )
}


