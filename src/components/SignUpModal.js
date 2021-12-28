import React, { useRef, useState, useEffect } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import Spinner from "./Spinner";
import { useModalContext } from "../contexts/ModalContext";

const Container = styled.div`
    z-index: 5;
    position: absolute;
    width: 550px;
    background-color: rgb(24,23,25);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 20px;
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
    padding-bottom: 10px;
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

const Submit = styled.button`
    border: none;
    color: white;
    background-color: #4A4A4A;
    border-radius: 10px;
    padding: 3px 10%;
    font-size: 20px;
    cursor: pointer;

    transition: 200ms all;
    margin-bottom: 10px;
    
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

const Line = styled.div`
    width: 90%;
    height: 1px;
    background-color: white;
`
const Already = styled.p`
    font-size: 15px;
    margin: 0;
    color: #b8b8b8;
`

const SignIn = styled.span`
    color: #3399ff;
    text-decoration: underline;
    transition: .2s all;
    cursor: pointer;
    
    &:hover{
        color: white;
        transition: .2s all;
    }
`
const Error = styled.p`
    margin: 5px 0;
    color: #ff0000;
    font-size: 20px;
`

export default function SignUpModal() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { currentUser, signUp } = useAuthContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {setSignupWindow, setSigninWindow} = useModalContext();

    useEffect(() => {
        if (currentUser) {
            // Already signed in, so navigate to spots page
            navigate("/spots", { replace: true })
        }
    }, [currentUser, navigate])

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        let email = emailRef.current.value
        let password = passwordRef.current.value
        let username = usernameRef.current.value
        let passwordConf = passwordConfRef.current.value

        if (password.length < 6) {
            setLoading(false)
            setError("Password must be at least 6 characters")
            return
        }

        if (password !== passwordConf) {
            setLoading(false)
            setError("Passwords do not match")
            return
        }

        signUp(email, password, username)
            .then(() => setSignupWindow(false))
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }

    function openSignin(){
        setSignupWindow(false)
        setSigninWindow(true)
    }

    return (
        <Container style={{height: error ? "450px" : "400px"}}>
            <MainX onClick={() => setSignupWindow(false)}/>
            {loading ? 
            <Spinner size={50}/>
            :
            <>
            <Form onSubmit={handleSubmit}>
                <Title>Sign Up</Title>
                {error && <Error>{error}</Error>}
                <Row>
                    <P>Username:</P>
                    <Input placeholder="Enter username" ref={usernameRef} type="text" />
                </Row>
                <Row>
                    <P>Email:</P>
                    <Input placeholder="Enter email" ref={emailRef} type="email" />
                </Row>
                <Row>
                    <P>Password:</P>
                    <Input placeholder="At least 6 characters" ref={passwordRef} type="password" />
                </Row>
                <Row>
                    <P>Confirm <br /> Password:</P>
                    <Input ref={passwordConfRef} type="password" placeholder="Re-enter password" />
                </Row>
                <Submit type="submit" >Sign Up</Submit>
            </Form>
            <Line />
            <Row style={{paddingTop: "10px", justifyContent: "center"}}>
            <Already >Already have an account? <SignIn onClick={() => openSignin()}>Sign In</SignIn></Already>
            </Row>
            </>
            }
        </Container>
         
    )
}
