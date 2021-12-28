import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {useModalContext} from "../contexts/ModalContext";
import { useNavigationContext } from "../contexts/Navigation";
import {useSpotsContext} from "../contexts/SpotsContext";

const Container = styled.div`
    width: 30vw;
    display: flex;
    flex-direction: column;
    transition: 0.2s all;
    position: absolute;
    top: 20px;
    left: 50vw;
    transform: translateX(-50%);

`

const Input = styled.input`
    font-size: 20px;
    padding: 15px 0px 15px 15px;
    align-self: flex-start;
    width: 99%;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: rgb(24,23,25, 1);
    color: white;
    transition: 0.2s all;
    box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.8);

    &:focus{
        box-shadow: 0px 0px 20px rgb(255,119,1, 0.4);
    }
`
const ResultContainer = styled.div`
    z-index: 5;
    position: absolute;
    height: auto;
    top: 75px;
    width: 99%;
    background-color: rgb(24,23,25, 1);
    border-radius: 10px;
    text-align: left;
    padding: 5px 0 5px 15px;
    box-shadow: 0px 0px 20px rgb(255,119,1, 0.4);
`

const Result = styled.div`
    color: white;
    position: relative;
    width: 96%;
    margin: 3px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;

    &:hover{
        text-shadow: 0px 0px 5px rgb(255,119,1, 0.5); 
    }
`

const MainText = styled.p`
    font-size: 20px;
    color: white;
    margin: 0;
`

const LocationName = styled.p`
    font-size: 15px;
    color: #e6e6e6;
    margin: 0;

`

const SpotMarker = styled.p`
    background-color: rgb(255,119,1);
    padding: 0 10px;
    font-size: 13px;
    border-radius: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
`

const Search = () => {
    const [text, setText] = useState("")
    const [toggle, setToggle] = useState(false);
    const [results, setResults] = useState([])
    const {setInfoModalToggle} = useModalContext() 
    const {setSendUser} = useNavigationContext()
    const {spots} = useSpotsContext()
    const wrapperRef = useRef(null);



    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
          window.removeEventListener("mousedown", handleClickOutside);
        };
      });
    
      const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setToggle(false);
        }
      };

    const onChangeHandler = text => {
        if(text.length){
            setInfoModalToggle(false)
            setToggle(true)
        }
        setText(text)
      }

      const token = 'pk.eyJ1Ijoib3BoaXJpIiwiYSI6Im'
      + 'NrdzRjc2o5YmJtNGIydXExcWlhdjJ2ZGwifQ.kF9dnidLOVE'
      + '-4DGtTuburA'

      useEffect(() => {
          if(text.length > 0){
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${token}`)
        .then(res => res.json())
        .then(data => {
            const ready = data.features
            spots.forEach(spot => {
                const name = spot.name.toLowerCase()
                if(name.startsWith(text.toLowerCase())){
                    ready.unshift({text: spot.name, center: [spot.coordinates[1], spot.coordinates[0]], spot: true})
                }})
            setResults(ready)})
        .then(setToggle(true))
        }
        return () => {
            setToggle(false)
            setResults([])
        }
        },[text, spots, token])


    return(
        <Container ref={wrapperRef}>
            <Input
                onChange={e => onChangeHandler(e.target.value)}
                placeholder="Search Location/Spot"
                type="text"
            />
            {toggle && results.length > 0 &&
            <ResultContainer>
                {results.map((result, index) => {
                    return(
                        <Result onClick={() => {setSendUser([result.center[1], result.center[0]]); setToggle(false)}} key={index} style={{borderBottom: index === results.length - 1 ? "none" : "1px solid white"}}>
                            <MainText>{result.text}</MainText>
                            <LocationName>{result.place_name}</LocationName>    
                            {result.spot ? <SpotMarker>SPOT</SpotMarker> : null}
                        </Result>
                    )
                })}
            </ResultContainer> }
        </Container>

    )
}

export default Search;