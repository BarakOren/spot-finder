import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import NavRow from "./NavRow";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import { useNavigationContext } from "../../contexts/Navigation";
import CloseIcon from '@material-ui/icons/Close';
import Spinner from "../Spinner";


const Container = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 55vh;
    background-color: rgb(16,16,16);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: scroll;
    position: relative;
    text-align: center;
    box-shadow: 10px 10px 20px rgb(0, 0, 0, 0.5);
    ::-webkit-scrollbar {
    width: 0!important;
}
`

const DurationContainer = styled.div`
    width: 100%;
    color: white;
    text-align: center;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const WalkIcon = styled(DirectionsWalkIcon)`
    color: white;
`

const CarIcon = styled(DriveEtaIcon)`
    color: white;
    margin: 0 0px 0 0;
`

const P = styled.p`
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 0 10px;
`

const Error = styled.p`
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    padding: 30px;
    color: white;
`

const MainX = styled(CloseIcon)`
    color: #b8b8b8;
    position: absolute;
    top: 5px;
    left: 5px;
    cursor: pointer;
    &:hover{
        transition: .3s color;
        color: white;
    }
`

const NavigationBox = (props) => {
    const {routeError, setNavTo, navType, navigationData} = useNavigationContext()
    const {closeRoute} = props

    const ContainerRef = useRef(null)

    useEffect(() => {
        ContainerRef.current.scrollTo({top: 0, behavior: 'smooth'});
    }, [navigationData])

    return(
        <Container ref={ContainerRef} style={{justifyContent: routeError ? "center" : "flex-start"}}>
            <MainX onClick={() => {setNavTo(null); closeRoute()}} style={{fontSize: 27}} />
            {navigationData !== null ? <>
            <DurationContainer>
            {navType === "driving" ? <CarIcon style={{fontSize: 27}}/> : <WalkIcon style={{fontSize: 27}}/> }
            <P>{Math.floor(navigationData.duration / 60)} minutes</P>
            </DurationContainer>
            {
                navigationData.legs[0].steps.map((step, index) => {
                    return(
                        <NavRow last={index + 1 === navigationData.legs[0].steps.length} key={index} step={step} />
                    )
                })
            }
            </>
            : 
            <Error>{routeError}</Error>
        }
        {navigationData === null && routeError == null ? <Spinner size={50} /> : null}
        </Container>
    )
}

export default NavigationBox;