import React, {useEffect} from "react";
import styled from "styled-components";
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { grey } from '@material-ui/core/colors';
import { useModalContext } from "../contexts/ModalContext";
import { useNavigationContext } from "../contexts/Navigation";


const Container = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 0;
    top: 20px;
    right: 90px;
    background-color: rgb(13, 13, 13);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    transition: all 400ms ease-in-out;
    box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.5);

    &:hover{
        box-shadow: 0px 0px 50px rgb(0, 0, 0, 1);
    }
`

const GetLocationButton = () => {
    const {menuToggle} = useModalContext();
    const {setCurrentLatitude, setCurrentLongitude} = useNavigationContext()

    function getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
              setCurrentLatitude(position.coords.latitude)
              setCurrentLongitude(position.coords.longitude)
            });
        }
    }

      useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
              setCurrentLatitude(position.coords.latitude)
              setCurrentLongitude(position.coords.longitude)
            });
        }
        return () => {
            setCurrentLatitude(null)
            setCurrentLongitude(null)
        }
    }, [setCurrentLatitude, setCurrentLongitude])
    
    return(
        <Container onClick={() => getLocation()} style={{ opacity: menuToggle ? "0" : "1"}}>
        <MyLocationIcon style={{color: grey[100]}}/>
        </Container>
    )
}

export default GetLocationButton;