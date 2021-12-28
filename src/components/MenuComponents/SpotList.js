import React from "react";
import styled from "styled-components";
import Favorites from "./Favorites";
import NearYou from "./NearYou";

const NearYouContainer = styled.div`
    height: 40vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const SpotsList = () => {
    
    return(
        <NearYouContainer>
            <Favorites />
            <NearYou />
        </NearYouContainer>
    )
}

export default SpotsList;