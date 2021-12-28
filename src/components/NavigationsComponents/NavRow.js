import React from "react";
import styled from "styled-components";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Container = styled.div`
    width: 100%;
    padding: 10px 10px;
    text-align: left;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const P = styled.p`
    font-size: 20px;
    color: white;
    margin: 0;
`

const Straight = styled(ArrowUpwardIcon)`
    color: white;
    margin-right: 10px;
`

const SlightLeft = styled(ArrowUpwardIcon)`
    transform: rotate(-35deg);
    color: white;
    margin-right: 10px;
`

const SlightRight = styled(ArrowUpwardIcon)`
    transform: rotate(35deg);
    color: white;
    margin-right: 10px;
`

const TurnLeft = styled(ArrowUpwardIcon)`
transform: rotate(-90deg);
color: white;
margin-right: 10px;
`

const TurnRight = styled(ArrowUpwardIcon)`
    transform: rotate(90deg);
    color: white;
    margin-right: 10px;
`

const LocationIcon = styled(LocationOnIcon)`
    color: white;
    margin-right: 10px;
`


const NavRow = ({step, last}) => {
    
    var instruction = step.maneuver.instruction
    var modifier = step.maneuver.modifier

    return(
        <Container>
            { modifier ? 
            <>
            {instruction.includes("Continue") ? <Straight /> : null}
            {modifier.includes("slight") && modifier.includes("left") ? <SlightLeft /> : null}
            {!modifier.includes("slight") && modifier.includes("left") ? <TurnLeft /> : null}
            {modifier.includes("slight") && modifier.includes("right") ? <SlightRight /> : null}
            {!modifier.includes("slight") && modifier.includes("right") ? <TurnRight /> : null}
            </> : 
            <>
            {last ? <LocationIcon /> : null}     
            </>
            }
            <P>{instruction}</P> 
        </Container>
    )
}

export default NavRow;