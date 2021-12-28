import React from "react";
import styled from "styled-components";
import ToggleNavigationType from "./ToggleNavType";
import NavigationBox from "./NavigationBox";

const Container = styled.div`
    width: 300px;
    position: absolute;
    left: 70px;
    top: 30vh;
`



const NavContainer = (props) => {
    
    return(
        <Container>
            <ToggleNavigationType />
            <NavigationBox closeRoute={props.closeRoute} />
        </Container>
    )
}

export default NavContainer;