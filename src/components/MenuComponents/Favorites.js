import React from "react";
import styled from "styled-components";
import Row from "./Row";
import { useAuthContext } from "../../contexts/AuthContext"
import { useDatabaseContext } from "../../contexts/DatabaseContext"


const Title = styled.p`
    width: 100%;
    text-align: center;
    color: #d9d9d9;
    font-size: 30px;
    border-bottom: solid 1px #d9d9d9;
    margin: 0;
`

const Message = styled.p`
    color: #df7920;
    font-size: 15px;
`

const Favorites = () => {
    const db = useDatabaseContext();
    const auth = useAuthContext()
    return(
        <>
            <Title>Favorites Spots</Title>
            {auth.currentUser && db.userData ? 
            <>
            {db.userData.favoriteSpots.length === 0 && <Message>You have no favorites</Message>}
            {db.userData.favoriteSpots.map((id, index) => {
                return(
                    <Row key={index} id={id} />
                    )
            })}
            </>   
            :
            <Message>You must log in to have favorites</Message>
            }
        </>
    )
}

export default Favorites;