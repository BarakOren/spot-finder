import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useDatabaseContext} from "../contexts/DatabaseContext";
import CloseIcon from '@material-ui/icons/Close';
import {useAuthContext} from "../contexts/AuthContext";
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import Spinner from "./Spinner";
import "./fades.css";
import { CSSTransition } from 'react-transition-group';

const Container = styled.div`
    z-index: 5;
    position: absolute;
    width: 700px;
    height: 600px;
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


const SmallContainer = styled.div`
    z-index: 5;
    position: absolute;
    width: 400px;
    height: 200px;
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
    text-align: center;
`


const Title = styled.p`
    font-size: 30px;
    margin: 3px;
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
    width: 30%;
    margin: 0;
`

const Input = styled.input`
    border-radius: 0;
    padding: 2px 5px;
    font-size: 15px;
    /* margin: 0 0 20px 0 !important; */
    border-radius: 10px;
    color: #ffffff;
    background-color: #4A4A4A;
    border: solid 1px #8e8d8f;
    width: 90%;
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

const TextArea = styled.textarea`
    border-radius: 0;
    padding: 2px 5px;
    font-size: 15px;
    /* margin: 0 0 20px 0 !important; */
    border-radius: 10px;
    color: #ffffff;
    background-color: #4A4A4A;
    border: solid 1px #8e8d8f;
    width: 90%;
    transition: 200ms;
    border: 2px solid rgb(0, 0, 0, 0.0);
    overflow-x: hidden;

    ::placeholder{
        color: #9c9c9c;
    }

    ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
    }

    &:focus {
        transition: 200ms;
        outline: none !important;
        border: 2px solid rgb(255, 255, 255);
    }                    
`

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;
    height: auto;
`

const CheckBoxDiv = styled.div`
    margin: 3px 7px;
`

const Checkbox = styled.input`
    cursor: pointer;
    margin: 0 5px;
    width: 15px;
    height: 15px;
`

const Label = styled.label`
    font-size: 20px;
    cursor: pointer;
`

const SmallInput = styled.input`
    padding: 0px 5px;
    font-size: 15px;
    margin: 0 0 0 0 !important;
    border-radius: 10px;
    color: #ffffff;
    background-color: #4A4A4A;
    width: 30px;

    transition: 200ms;
    border: 2px solid rgb(0, 0, 0, 0.0);

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
    
    &:disabled{
        color: #bdbdbd;
        background-color: #292929;
    }
    &:hover{
        box-shadow: 0 0 20px rgb(255,119,1, 0.5);
        transition: 200ms all;
    }
    
`

const UploadImageButton = styled.label`
    color: white;
    background-color: #4A4A4A;
    border-radius: 10px;
    padding: 0px 10px;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
    align-self: flex-start;
    width: 25%;
    margin-right: 10px;
`

const UploadedImagesContainer = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
`

const UploadedImage = styled.div`
    display: flex;
    /* width: 100%; */
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 3px 7px;
    border: 1px solid #4A4A4A;
    white-space: nowrap;
    margin: 3px 5px;
`

const UploadedImageName = styled.p`
    font-size: 12px;
    margin: 0;
`

const X = styled(CloseIcon)`
    margin-left: 6px;
    cursor: pointer;
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

const SetLocationContainer = styled.div`
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const SetLocationButton = styled.button`
    font-size: 35px;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: rgb(0, 0, 0, 0.8);
    border: none;

    &:hover{
        transition: .3s background-color;
        background-color: rgb(0, 0, 0, 0.9);
    }
`

const Message = styled.p`
    font-size: 25px;
`

const AddSpotModal2 = (props) => {
    const db = useDatabaseContext()
    const auth = useAuthContext()
    let { chooseState, setChooseState } = props
    let draggableMarker = null
    const [openForm, setOpenForm] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [ spotData, setSpotData ] = useState({
        spotName: "",
        latitude: "",
        longitude: "",
        description: "",
        obstacles: [],
        openingHours: "",
        images: []
      });

    const [hours, setHours] = useState({
        openHours: "",
        openMinutes: "",
        closeHours: "",
        closeMinutes: ""
    })

    const { openHours, openMinutes, closeHours, closeMinutes } = hours;
    const { spotName, description, obstacles, openingHours, images, longitude, latitude } = spotData;

    const handleChange = event => {
        const {name, value} = event.target;
        if(value === "custom hours"){
            setSpotData({ ...spotData, openingHours: `${openHours}:${openMinutes} - ${closeHours}:${closeMinutes}`});
        }
            else {
                setSpotData({ ...spotData, [name]: value});
        }
    }

    const handleHoursChange = event => {
        const {name, value} = event.target;
        setHours({ ...hours, [name]: value});
    }

    useEffect(() => {
        setSpotData({...spotData, openingHours: `${openHours}:${openMinutes} - ${closeHours}:${closeMinutes}`});
        return() => {setSpotData({
            spotName: "",
            latitude: "",
            longitude: "",
            description: "",
            obstacles: [],
            openingHours: "",
            images: []
        })}
    }, [openHours,openMinutes, closeHours, closeMinutes ])


    function handleSubmit(e) {
        e.preventDefault()

        setError(null)
        setLoading(true)
        db.addSpotWithImages( spotName, description, latitude, longitude, obstacles, openingHours, images)
            .then(() => setMessage("Spot submitted!"))
            .catch(e => {
                console.log(e.message)
                setError("Sorry, We had an error. Please try again...")})
            .finally(() => {
                setLoading(false)
                setTimeout(function(){
                    document.location.reload(true)
                }, 2000)   
            })
    }

    const handleCheckboxes = event => {
        const {value, checked} = event.target;
        if(checked){
            setSpotData({...spotData, obstacles: [...obstacles, value]})
        }
        else {
            setSpotData({...spotData, obstacles: obstacles.filter(obstacle => obstacle !== value)})
        }
    }

    const imagesHandler = e => {
        if(images.length === 8){
            alert("You have reached the maximum photos amount")
        }
        else if (e.target.files){
            setSpotData({...spotData, images: [...images, ...e.target.files]})
            //check if this photo is already in
            // const findImage = images.some(item => item === e.target.files)
            // console.log(findImage)
            // if(findImage){
            //     alert("image is already uploaded")

            // } else {

            // }
        }
    }

    function removeImageFromArray(img){
        const imageToRemove = images.find(item => item === img)
        setSpotData({...spotData, images: images.filter(item => item !== imageToRemove)});
    }

    function isSignedInAndChoosingLocation() {
        return auth.currentUser && chooseState
    }

    function handleXClick(){
        setChooseState(false)
    }

    function handleVClick(){
        setChooseState(false)
        setOpenForm(true)        
    }

    useEffect(() => {
        let mounted = true
        if (!mounted || !props.map || !chooseState || !auth.currentUser) return
        let map = props.map
        draggableMarker = new mapboxgl.Marker({ 
            draggable: true,
            scale: 2,
         })
            .setLngLat(map.getCenter())
            .addTo(map)
            
        const dragHandler = () => {
            const { lat, lng } = draggableMarker.getLngLat()
            setSpotData({
                ...spotData,
                latitude: lat,
                longitude: lng
            })
        }
        
        draggableMarker.on('drag', dragHandler)
        draggableMarker.on('dragend', dragHandler)
        dragHandler()

        // make modal invisible
        setOpenForm(false)
        return () => {
            mounted = false
            draggableMarker.remove()
        }
    }, [chooseState, auth.currentUser])

    return(
        <>
        {!auth.currentUser && 
        <CSSTransition unmountOnExit in={chooseState} timeout={300} classNames="fades">
        <SmallContainer>
            <MainX onClick={() => setChooseState(false)}/>
            <Message>Please sign up/sign in to add a spot</Message>
        </SmallContainer> 
        </CSSTransition>
        }
        <CSSTransition unmountOnExit in={openForm} timeout={300} classNames="fades">
        <Container> 
            <>
            <MainX style={{fontSize: 30}} onClick={() => setOpenForm(false)}/>
            {loading ? <Spinner size={50} /> 
            : 
            <>
            {error ? <Message>{error}</Message> : null}
            {message ? <Message>{message}</Message> : null}
            {!error && !message &&
            <>
            <Form novalidate onSubmit={handleSubmit}>
            <Title>Add A Spot</Title>
                <Row>
                <P>Name:</P>
                <Input type="text" maxLength="17" value={spotName} name="spotName" onChange={handleChange} placeholder="name the spot" required />
                </Row>
                <Row>
                <P style={{alignSelf: "flex-start"}}>Description:</P>
                <TextArea type="text" value={description}  name="description" onChange={handleChange} rows="4" cols="50" placeholder="Tell us everything you can, Security, Cracks on the curbs, Lights at the spot..." />
                </Row>
                <Row>
                    <P style={{alignSelf: "flex-start"}}>Obstacles:</P>
                    <CheckBoxContainer>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="ledges" name="obstacles" value="ledges" />
                            <Label htmlFor="ledges">Ledges</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="boxes" name="obstacles" value="boxes" />
                            <Label htmlFor="boxes">Boxes</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="rails" name="obstacles" value="rails" />
                            <Label htmlFor="rails">Rails</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="manualPeds" name="obstacles" value="manualPeds" />
                            <Label htmlFor="manualPeds">Manual Peds</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="pyramid" name="obstacles" value="pyramid" />
                            <Label htmlFor="pyramid">Pyramid</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="stairs" name="obstacles" value="stairs" />
                            <Label htmlFor="stairs">Stairs</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="gaps" name="obstacles" value="gaps" />
                            <Label htmlFor="gaps">Gaps</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="hubba" name="obstacles" value="hubba" />
                            <Label htmlFor="hubba">Hubbas</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="handrails" name="obstacles" value="handrails" />
                            <Label htmlFor="handrails">Hand-rails</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="pools" name="obstacles" value="pools" />
                            <Label htmlFor="pools">Pools</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv>
                            <Checkbox onChange={handleCheckboxes} type="checkbox" id="transitions" name="obstacles" value="transitions" />
                            <Label htmlFor="transitions">Transitions</Label>
                        </CheckBoxDiv>
                    </CheckBoxContainer>
                </Row>
                <Row>
                    <P>Opening Hours:</P>
                    <CheckBoxContainer>
                        <CheckBoxDiv >
                            <Checkbox value="always" name="openingHours" onChange={handleChange} type="radio" id="always" required
                            />
                            <Label htmlFor="always">Always</Label>
                        </CheckBoxDiv>
                        <CheckBoxDiv style={{margin: 0, width: "70%", alignItems: "flex-end"}}>
                            <Checkbox value="custom hours" name="openingHours" required onChange={handleChange} type="radio" /> 
                            <SmallInput value={openHours} onChange={handleHoursChange} placeholder="00" name="openHours" maxLength="2" type="text" id="openHours"/><Label style={{margin: "0 4px"}} htmlFor="openHours"> : </Label><SmallInput onChange={handleHoursChange} value={openMinutes} placeholder="00" maxLength="2" type="text" name="openMinutes" />
                            <Label style={{margin: "0 7px"}}> - </Label>
                            <SmallInput value={closeHours} onChange={handleHoursChange} placeholder="00" name="closeHours" maxLength="2" type="text" /><Label style={{margin: "0 4px"}} htmlFor="always"> : </Label><SmallInput onChange={handleHoursChange} value={closeMinutes} placeholder="00" maxLength="2" type="text" name="closeMinutes" />
                        </CheckBoxDiv>
                    </CheckBoxContainer>
                </Row>

                <Row style={{justifyContent: "flex-start", height: images.length > 4 ? "100px" : "auto"}}>
                    <input
                    multiple
                    hidden
                    id="button"
                    type="file"
                    onChange={imagesHandler}
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                    <UploadImageButton htmlFor="button">Choose Photos</UploadImageButton>
                    <UploadedImagesContainer style={{justifyContent: images.length < 4 ? "flex-start" : "space-evenly"}}>
                    {images.length > 0 ? images.map((img, index) => 
                        (<UploadedImage key={index}>
                            <UploadedImageName>{img.name.slice(0,7)}...</UploadedImageName>
                            <X onClick={() => removeImageFromArray(img)} style={{fontSize: 20}} />
                        </UploadedImage>)) 
                    : 
                    <p style={{color: "#9c9c9c"}}>maximum 8 photos...</p>
                    }
                    </UploadedImagesContainer>
                
                </Row>
                <Row style={{justifyContent: "center"}}>
                    <Submit type="submit" disabled={loading}>Add Spot</Submit>
                </Row>
            </Form>
            </> }
            </>}
            </>    
        </Container>
        </CSSTransition>
        {
        chooseState && isSignedInAndChoosingLocation() &&
            <SetLocationContainer>
                <SetLocationButton onClick={handleXClick}>❌</SetLocationButton>
                <SetLocationButton onClick={handleVClick}>✔️</SetLocationButton>
            </SetLocationContainer>
        }
        </>
    )
}

export default AddSpotModal2;
