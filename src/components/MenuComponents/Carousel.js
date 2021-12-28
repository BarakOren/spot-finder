import React from "react";
import { Carousel } from 'react-bootstrap';
import "../../style.css";

const BootstrapCarouselComponent = ({imgz}) => {

    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                <div className="d-inline-flex p-2 justify-content-center">
                <Carousel style={{margin: "0 0 10px 0", borderRadius: "10px", overflow: "hidden", width: "90%"}}>  
                {
                    imgz.map((image, index) => {
                        return(
                            <Carousel.Item key={index}>
                            <img className="d-block w-100"
                            src={image}
                            alt="First slide"
                            />
                            </Carousel.Item>
                            )
                    })
                }
                </Carousel>
            </div>
        </div>
        </div>
    </div>
)
};
export default BootstrapCarouselComponent;