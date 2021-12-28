import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import RowDropDown from "./RowDropDown";


const Container = styled.div`
    width: 100%;
    height: auto;
    z-index: 1;
`

const RowContainer = styled.div`
    width: 100%;
    height: auto;
    border-bottom: solid 1px #d9d9d9;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &:hover{
        text-shadow: 0px 0px 5px rgb(255,119,1, 0.5); 
    }
`

const InsideRow = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

const SpotName = styled.p`
    font-size: 1.2vw;
    color: #d9d9d9;
    margin: 0;

`

const Error = styled.p`
    font-size: 1.2vw;
    color: white;
    margin: 0;
`

const Row = ({id}) => {

    const {getSpotById} = useDatabaseContext()
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

        useEffect(() => {
            getSpotById(id, true)
            .then(d => {
                setData(d)
                setLoading(false)
            })
            .catch( e => {
                console.log(e.message)
                setError("Cant load data...")
                setLoading(false)
            })
            return () => setData(null)
        }, [getSpotById, id])

    return(
    <Container>
    { loading ? <p>...</p> : <>
        {error && <Error>{error}</Error> }
        {!error && data &&
            <>
            <RowContainer>
            <InsideRow onClick={() => setToggle(!toggle)}>
                <SpotName >{data.name}</SpotName>
                {toggle ? 
                <i className="bi bi-caret-up-fill" onClick={() => setToggle(false)} style={{color: "#d9d9d9", cursor: "pointer"}}></i>
                :
                <i className="bi bi-caret-down-fill" onClick={() => setToggle(true)} style={{color: "#d9d9d9", cursor: "pointer"}}></i>
                }
            </InsideRow>
            </RowContainer>
            <RowDropDown data={data} toggle={toggle} />
            </> }
        </> }
    </Container>
    )
}

export default Row;