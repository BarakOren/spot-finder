import React, {useState, useEffect, useCallback} from "react";
import { useNavigationContext } from "../../contexts/Navigation";
import { useSpotsContext } from "../../contexts/SpotsContext";
import styled from "styled-components";
import Row from "./Row";
import Slider from '@material-ui/core/Slider';


const Title = styled.p`
    width: 100%;
    text-align: center;
    color: #d9d9d9;
    font-size: 30px;
    border-bottom: solid 1px #d9d9d9;
    margin: 20px 0 0 0;
`

const Message = styled.p`
    color: #d9d9d9;
    font-size: 15px;
`

const P = styled.p`
    font-size: 19px;
    color: #d9d9d9;
`

const InputRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
`

const NearYou = () => {
    const {currentLatitude, currentLongitude} = useNavigationContext()
    const {spots} = useSpotsContext()
    const [near, setNear] = useState([])
    const [selectedDistance, setSelectedDistance] = useState(100)

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    const StraightLineDistance = useCallback((distance, lat1, lon1, lat2, lon2) => { 
    
      var R = 6371;
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var latt1 = toRad(lat1);
      var latt2 = toRad(lat2);
    
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latt1) * Math.cos(latt2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      if(d < distance){
        return true
      } else {
        return false
      }
    
    }, [])   
    
    const marks = [{value: 10},{value: 25},{value: 50},{value: 75},{value: 100}]
    
      const handleChange = useCallback((e, value) => {
        setSelectedDistance(value)
        if(spots){
            const array = []
            spots.forEach(spot => {
                const distance = StraightLineDistance(value, currentLatitude, currentLongitude, spot.coordinates[0], spot.coordinates[1])
                if(distance){
                    array.push(spot.id)
                }
            })
            setNear(array)
        }
      }, [StraightLineDistance, currentLatitude, currentLongitude ,spots])

     
      useEffect(() => {
        if(spots){
            const array = []
            spots.forEach(spot => {
                const distance = StraightLineDistance(100, currentLatitude, currentLongitude, spot.coordinates[0], spot.coordinates[1])
                if(distance){
                    array.push(spot.id)
                }
            })
            setNear(array)
        }
      }, [StraightLineDistance, spots, currentLatitude, currentLongitude])

    return(
            <>
                <Title>Spots Near You</Title>
                    <InputRow>
                        <P style={{margin: "0 15px 0 0"}}>0</P>
                        <Slider
                        style={{width: "60%", margin: "0", color: "#d9d9d9"}}
                        defaultValue={100}
                        value={selectedDistance}
                        onChange={handleChange}
                        step={5}
                        aria-labelledby="continuous-slider" 
                        marks={marks}
                        />
                        <P style={{margin: "0 0 0 15px"}}>100 km</P>
                    </InputRow>
                    {near.length > 0 ? 
                        <>
                            {near.map((id, index) => {
                            return(
                                <Row key={index} id={id} />
                                )
                            })}
                        </>   
                    :
                    <Message>There are no spots in your area</Message>
                }
            </>
        )
    }

export default NearYou;


