import React, {useState} from "react";
import styled from "styled-components";
import { useAuthContext } from "../../contexts/AuthContext"
import { useDatabaseContext } from "../../contexts/DatabaseContext"
import { useModalContext } from "../../contexts/ModalContext";

const WelcomeContainer = styled.div`
    margin: 30px 0;
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    z-index: 1;
`

const WelcomeText = styled.p`
    font-size: 25px;
    text-align: center;
`

const Button = styled.p`
    background-color: rgb(24,23,25, 1);
    border-radius: 10px;
    padding: 1% 15%;
    font-size: 1vw;
    cursor: pointer;
    transition: .2s all;
    &:hover{
        box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.7);
        transition: .2s all;
    }
`

const Message = styled.p`
    font-size: 25px;
`

const UserArea = () => {
    const auth = useAuthContext()
    const db = useDatabaseContext()
    const [error, setError] = useState(null)
    const {setProfileToggle, setSigninWindow, setSignupWindow, setForgotPasswordWindow, setInfoModalToggle} = useModalContext();

    async function handleSignOut() {
        setError(null)
        auth.signOut()
            .catch((e) => {
            console.log(e.message)
            setError("Failed to sign out")})
    }

    return(
        <WelcomeContainer>
            {auth.currentUser && db.userData ?
            <>
                <WelcomeText>Welcome {db.userData.username}</WelcomeText>
                <Button onClick={() => setProfileToggle(true)}>Your Profile</Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
                {error ? <Message>Failed to sign out</Message> : null}
            </>
            : 
            <>
                <WelcomeText>Welcome Guest</WelcomeText>
                <Button onClick={() => {setInfoModalToggle(false); setSignupWindow(false); setSigninWindow(true); setForgotPasswordWindow(false)}}>Sign In</Button>
                <Button onClick={() => {setInfoModalToggle(false); setSigninWindow(false); setSignupWindow(true); setForgotPasswordWindow(false)}}>Sign Up</Button>
            </>
            }   
        </WelcomeContainer>
    )
}

export default UserArea;