import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useModalContext } from "../../contexts/ModalContext";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import CloseIcon from '@material-ui/icons/Close';
import BootstrapCarouselComponent from "./Carousel";
import Spinner from "../Spinner";
import {useAuthContext} from "../../contexts/AuthContext";
import NavigationIcon from '@material-ui/icons/Navigation';
import { useNavigationContext } from "../../contexts/Navigation";

const Container = styled.div`
    z-index: 10;
    position: absolute;
    top: 50vh;
    left: 50vw;
    width: 500px;
    min-height: 500px;
    padding: 20px 0;
    transform: translate(-50%, -50%);
    background-color: rgb(24,23,25);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 30px rgb(0, 0, 0, 0.8);
`

const Gradient = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background: linear-gradient(25deg, rgba(255,119,1,0.2) 0%, rgba(0,0,0,0) 40%);
`

const MainX = styled(CloseIcon)`
    color: #b8b8b8;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    &:hover{
        transition: .3s color;
        color: white;
    }
`

const AddToFavorites = styled.p`
    color: white;
    margin: 0;
    background-color: #333333;
    border-radius: 10px;
    padding: 3px 15px;
    font-size: 13px;
    cursor: pointer;
    transition: .2s all;
    &:hover{
        box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.7);
        transition: .2s all;
    }
`

const SpotName = styled.p`
    font-size: 25px;
    margin: 0 0 20px 0;
    color: white;
`

const Info = styled.p`
    color: white;
    text-align: center;
    width: 90%;
    font-size: 15px;
    margin: 0 0 20px 0;
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
    margin: 3px 3px 25px 0;
`
const Obstacle = styled.div`
    color: white;
    font-size: 15px;
    margin: 0 5px;
`

const OtherInfoContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px 0;
    z-index: 1;
`
const OtherInfo = styled.p`
    color: white;
    font-size: 15px;
    margin: 0;
    z-index: 1;
`

const CarouselContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

const NavContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1;
`

const Navigate = styled.div`
    background-color: #ec7813;
    margin: 0;
    border-radius: 50px;
    cursor: pointer;
    padding: 7px;
    box-shadow: 1px 1px 20px rgb(0, 0, 0, 0.4);
    transition: box-shadow .2s;
    &:hover{
        box-shadow: 1px 1px 20px rgb(0, 0, 0, 1);
        transition: box-shadow .2s;
    }
`

const Error = styled.p`
    text-align: center;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
`

const InfoModal = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    const { setInfoModalToggle, idNumber, setMenuToggle } = useModalContext();
    const { getSpotById, addSpotToFavorites, userData, removeSpotFromFavorites } = useDatabaseContext();
    const auth = useAuthContext()
    const {setSendUser, setNavTo, currentLatitude, currentLongitude} = useNavigationContext()

    useEffect(() => {
        getSpotById(idNumber, true)
        .then(d => {
            setData(d)
            setLoading(false)
        })
        .catch( e => {
            console.log(e.message)
            setLoading(false)
        })
        return () => {setLoading(true) ; setData(null);}
    }, [getSpotById, idNumber])


    function navigate(coordinates){
        setNavTo(coordinates)
        if(currentLatitude){setSendUser([currentLatitude, currentLongitude])}
        setMenuToggle(false) 
        setInfoModalToggle(false)
    }

    return(
        <Container>
            <Gradient />
            <MainX onClick={() => setInfoModalToggle(false)} />
            {loading && <Spinner size={50} /> }
            {!loading && !data && <Error>Sorry, We had a problem, please try again</Error>}
            {!loading && data &&
                <>
                <SpotName>{data.name}</SpotName>
                <CarouselContainer>
                    <BootstrapCarouselComponent imgz={data.imgURLs} />
                </CarouselContainer>
                <Info>{data.info}</Info>
                <ObstaclesList>
                {data.obstacles.map((ob, index) => {
                    return(
                        <Obstacle key={index}>{ob.charAt(0).toUpperCase() + ob.slice(1)} &#10004;</Obstacle>
                    )
                })}
                </ObstaclesList>
                <OtherInfoContainer>
                    <OtherInfo>Opening Hours: {data.hours}</OtherInfo>
                    {auth.currentUser && <>
                    {userData.favoriteSpots.includes(data.id) ?
                        <AddToFavorites onClick={() => removeSpotFromFavorites(data.id)}>Remove From Favorites</AddToFavorites>
                        :
                        <AddToFavorites onClick={() => addSpotToFavorites(data.id)}>Add To Favorites</AddToFavorites>
                    }
                    </>  }     
                    </OtherInfoContainer>
                <NavContainer>
                    <Navigate>
                        <NavigationIcon onClick={() => navigate([data.coordinates[1], data.coordinates[0]])} style={{fontSize: 35, color: "white"}}/>
                    </Navigate>
                </NavContainer>
                </>
                }
        </Container>
    )
}

export default InfoModal;