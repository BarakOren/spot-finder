import React, { useRef, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import Spinner from "./Spinner";
import { useModalContext } from "../contexts/ModalContext";

const Container = styled.div`
    z-index: 5;
    position: absolute;
    width: 400px;
    height: 250px;
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
    height: 80%;
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
    width: 80%;
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

const Error = styled.p`
    margin: 5px 0;
    color: #ff0000;
    font-size: 20px;
`

const Message = styled.p`
    margin: 5px 0;
    color: white;
    font-size: 20px;
    text-align: center;
`

export default function ForgotPswdModal() {
    const emailRef = useRef()
    const {setForgotPasswordWindow} = useModalContext();
    const { resetPassword } = useAuthContext()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        setMessage(null)
        setError(null)
        setLoading(true)
        resetPassword(emailRef.current.value)
            .then(() => setMessage("Check your inbox for further instructions"))
            .catch(() => setError("Failed to reset password"))
            .then(() => setLoading(false))
    }

    return (
        <Container>
            <MainX onClick={() => setForgotPasswordWindow(false)} />
            {loading ? <Spinner size={50} /> :
            <>
            <Title>Reset Password</Title>
            {error ? <Error>{error}</Error> : null}
            <Form onSubmit={handleSubmit}>
            {message ? <Message>{message}</Message> : 
            <>
                <Row>
                    <P>Email:</P>
                    <Input ref={emailRef} type="email" placeholder="Enter email" />
                </Row>
                <Submit>Reset Password</Submit>
            </>
            }
            </Form>
            </>
            }       
        </Container>
    )
}
