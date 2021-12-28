import React, { useRef, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import Spinner from "./Spinner";
import { useModalContext } from "../contexts/ModalContext";
import "./fades.css";

const Container = styled.div`
    z-index: 5;
    position: absolute;
    width: 450px;
    background-color: rgb(24,23,25);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    color: white;
    box-shadow: 3px 3px 20px black;
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

const Title = styled.p`
    font-size: 30px;
    margin: 3px 3px 10px 3px;
    color: white;

`

const Form = styled.form`
    width: 90%;
    height: 95%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
`
const P = styled.p`
    align-self: flex-start;
    font-size: 20px;
    text-align: left;
    padding-right: 10px;
    margin: 0;
`

const Input = styled.input`
    border-radius: 0;
    padding: 2px 5px;
    font-size: 15px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #4A4A4A;
    border: solid 1px #8e8d8f;
    width: 70%;
    transition: 200ms;
    border: 2px solid rgb(0, 0, 0, 0.0);

    ::placeholder{
        color: #9c9c9c;
    }

        &:focus {
            transition: 200ms;
            outline: none !important;
            border: 2px solid rgb(255, 255, 255);
        }                    
`

const Forgot = styled.p`
    margin-top: 10px;
    margin-bottom: 0px;
    width: 100%;
    text-align: center;
    color: #b8b8b8;
    cursor: pointer;
    transition: .2s all;

    &:hover{
        color: white;
        transition: .2s all;
    }
`

const Submit = styled.button`
    border: none;
    color: white;
    background-color: #4A4A4A;
    border-radius: 10px;
    padding: 3px 10%;
    font-size: 20px;
    cursor: pointer;

    transition: 200ms all;
    
    &:disabled{
        color: #bdbdbd;
        background-color: #292929;
        &:hover{
            cursor: default;
        }
    }

    &:hover{
        box-shadow: 0 0 20px rgb(255,119,1, 0.5);
        transition: 200ms all;
    }
    
`

const Error = styled.p`
    margin: 5px 0;
    color: #ff0000;
    font-size: 20px;
`

export default function SignInModal() {
    const { setSigninWindow, setForgotPasswordWindow } = useModalContext();
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signIn } = useAuthContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        setError(null)
        setLoading(true)
        signIn(emailRef.current.value, passwordRef.current.value)
            .then(() => console.log("exit please"))
            .catch((e) => {
                setError("Wrong email/password")
                setLoading(false)
            })
        
    }
  
    return(
        <Container style={{height: error ? "300px" : "250px"}}>
            <MainX onClick={() => setSigninWindow(false)} />
            {loading ? 
            <Spinner size={50} />
            :
            <>
            <Title>Sign In</Title>
            <Form onSubmit={handleSubmit}>  
            {error && <Error>{error}</Error>}
                <Row>
                <P>Email:</P>
                <Input type="email" ref={emailRef} autoComplete="email" />
                </Row>
                <Row style={{flexWrap: "wrap"}}>
                <P>Password:</P>
                <Input ref={passwordRef} type="password" autoComplete="current-password" />
                <Forgot onClick={() => {setSigninWindow(false); setForgotPasswordWindow(true);}}>forgot password?</Forgot>
                </Row>
                <Submit type="submit">Sign In</Submit>
            </Form>
            </>
            }       
        </Container>

    )
}
