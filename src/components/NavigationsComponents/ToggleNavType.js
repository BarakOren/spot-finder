import React from "react";
import styled from "styled-components";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import { useNavigationContext } from "../../contexts/Navigation";

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const IconContainer = styled.div`
    padding: 10px;
    color: white;
    border-radius: 50px;
    cursor: pointer;
    transition: .2s all;

    &:hover{
        transition: .2s all;
        box-shadow: 0px 0px 30px rgb(255,119,1, 0.3);
    }
`

const ToggleNavigationType = () => {
    const {navType, setNavType} = useNavigationContext();

    return(
        <Container>
            <IconContainer onClick={() => setNavType("driving")} style={{backgroundColor: navType === "driving" ? "rgb(16, 16, 16)" : "rgb(16, 16, 16 , 0.5)", boxShadow: navType === "driving" ? "0px 0px 30px rgb(255,119,1, 0.3)" : "" }}>
                <DriveEtaIcon style={{fontSize: 35}} />
            </IconContainer>
            <IconContainer onClick={() => setNavType("walking")} style={{backgroundColor: navType === "walking" ? "rgb(16, 16, 16)" : "rgb(16, 16, 16 , 0.5)", boxShadow: navType === "walking" ? "0px 0px 30px rgb(255,119,1, 0.3)" : ""  }}>
                <DirectionsWalkIcon style={{fontSize: 35}} />
            </IconContainer>
        </Container>
    )
}

export default ToggleNavigationType;