import React from "react";
import styled, {keyframes} from "styled-components";

const rotation = keyframes`
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Spin = styled.div`
    border: 3px solid white;
    border-radius: 50%;
    border-top: none;
    border-right: none;
    margin: 16px auto;
    animation: ${rotation} 1s linear infinite;
`

const Spinner = (props) => {
    const {size} = props;

    return(
        <Container><Spin style={{width: size, height: size}} /></Container>
    )}

export default Spinner;