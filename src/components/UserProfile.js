import React, { useRef, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import Spinner from "./Spinner";
import { useModalContext } from "../contexts/ModalContext";
import { useDatabaseContext } from "../contexts/DatabaseContext";

const Container = styled.div`
    z-index: 5;
    position: absolute;
    width: 550px;
    min-height: 500px;
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
    font-size: 35px;
    margin: 0 0 10px 0;
    color: white;
`

const FavoriteSpots = styled.p`
    font-size: 20px;
    margin-bottom: 30px;
`

const Change = styled.p`
    font-size: 20px;
    margin-bottom: 5px;
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
    margin-bottom: 10px;
`
const P = styled.p`
    align-self: flex-start;
    font-size: 17px;
    text-align: left;
    padding-right: 5px;
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
    width: 63%;
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
    margin-top: 10px;
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
    font-size: 25px; 
`



const UserProfile = () => {

    const currentEmailRef = useRef()
    const currentPasswordRef = useRef()
    const newEmailRef = useRef()
    const newPasswordRef = useRef()
    const newPasswordConfRef = useRef()
    const db = useDatabaseContext()
    const { currentUser, updatePassword, updateEmail, reauthenticate } = useAuthContext()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const {setProfileToggle} = useModalContext();

    function handleSubmit(e) {
        e.preventDefault()

        if (newPasswordRef.current.value !== newPasswordConfRef.current.value) {
            setMessage("")
            return setError("Passwords do not match")
        }

        setLoading(true)
        setError("")

        // Re-authenticate user and update changed fields
        reauthenticate(currentEmailRef.current.value, currentPasswordRef.current.value)
            .then(() => {
                // User re-authenticated.
                if (!newEmailRef.current.value && !newPasswordRef.current.value) {
                    setError("No new email or password have been provided")
                    setMessage("")
                } else {
                    const promises = []

                    if (newEmailRef.current.value) {
                        promises.push(updateEmail(newEmailRef.current.value))
                    }
                    if (newPasswordRef.current.value) {
                        promises.push(updatePassword(newPasswordRef.current.value))
                    }

                    Promise.all(promises)
                        .then(() => {
                            setMessage("Account updated successfully")
                            setError("")
                            currentEmailRef.current.value = currentUser.email
                            currentPasswordRef.current.value =
                                newPasswordRef.current.value ?
                                    newPasswordRef.current.value :
                                    currentPasswordRef.current.value
                        })
                        .catch(() => {
                            setError("Failed to update account")
                            setMessage("")
                        })
                }
            }).catch(error => {
                // An error happened (re-authentication failed).
                setError("Failed to authenticate credentials " +
                    "(make sure current email and password are correct)")
                setMessage("")
            }).then(() => setLoading(false))
    }

    return(
        <Container>
            <MainX onClick={() => setProfileToggle(false)}/>
            {!loading && !message && <>
                <Title>{db.userData.username}</Title>
                <FavoriteSpots>Favorite Spots: {db.userData.favoriteSpots.length}</FavoriteSpots>
                <Form onSubmit={handleSubmit}>
                {error && <Error>{error}</Error>}
                    <Change>Change Email</Change>
                    <Row>
                        <P>Current Email:</P>
                        <Input placeholder="Enter Current Email" ref={currentEmailRef} type="email" />
                    </Row>
                    <Row>
                        <P>Password:</P>
                        <Input placeholder="Enter Password" ref={currentPasswordRef} type="password"/>
                    </Row>
                    <Row>
                        <P>New Email:</P>
                        <Input placeholder="Enter New Email Address" ref={newEmailRef} type="email"/>
                    </Row>
                    <Submit type="submit">Change Email</Submit>
                    <Change style={{marginTop: "30px"}}>Change Password</Change>
                    <Row>
                        <P>Current Password:</P>
                        <Input placeholder="Enter Current Password" ref={currentPasswordRef} type="password"/>
                    </Row>
                    <Row>
                        <P>New Password:</P>
                        <Input placeholder="Enter New Password" ref={newPasswordRef} type="password"/>
                    </Row>
                    <Row>
                        <P>Re-Enter:</P>
                        <Input placeholder="Re-Enter New Password" ref={newPasswordConfRef} type="password"/>
                    </Row>
                    <Submit type="submit">Change Password</Submit>
                </Form>
            </> }
            {loading && <Spinner size={50} />}
            {message && <Message>{message}</Message>}
        </Container>
    )
}

export default UserProfile;