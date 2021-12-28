import React from "react";
import styled from "styled-components";
import UserArea from "./UserArea";
import SpotsList from "./SpotList";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import grey from '@material-ui/core/colors/grey';
import { useModalContext } from "../../contexts/ModalContext";

const Hamburger = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: rgb(13, 13, 13);
    /* background-color: rgb(0, 0, 0, 0.900); */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    overflow-y: none;
    box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.5);

    &:hover{
        box-shadow: 0px 0px 20px rgb(0, 0, 0, 1);
    }
`

const MenuContainer = styled.div`
    z-index: 5;
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    transform: translateX(100%);
    transition: all 500ms ease-in-out;
    box-shadow: -10px 0px 20px rgb(0, 0, 0, 0.5);
    visibility: hidden; 
    ::-webkit-scrollbar {
    width: 0!important;
    }

    &.show{
        visibility: visible; 
        transform: translateX(0%);
        transition: all 500ms ease-in-out;
    }
`

const MenuBody = styled.div`
    position: relative;
    /* background-color: rgb(0, 0, 0, 0.9);   */
    background-color: rgb(24,23,25, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0!important;
    }
`

const Gradient = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(200deg, rgba(255,119,1,0.5) 0%, rgba(42,42,42,0) 60%);
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


const Menu = () => {
    const { menuToggle, setMenuToggle } = useModalContext();
    
    return(
        <>
        <Hamburger style={{ opacity: menuToggle ? "0" : "1"}} onClick={() => setMenuToggle(true)} >
            <MenuIcon style={{ fontSize: 40, color: grey[100] }}/>
        </Hamburger>
        <MenuContainer className={`${menuToggle ? "show" : ""}`}>
            <MenuBody>
                <Gradient />
                <MainX onClick={() => setMenuToggle(false)}>
                    <CloseIcon style={{ fontSize: 35, color: grey[400] }}/>
                </MainX>  
                <UserArea />
                <SpotsList /> 
            </MenuBody>
        </MenuContainer>
        </>
    )
}

export default Menu;