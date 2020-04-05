import React from 'react';
import Carousel from 'nuka-carousel';
import styled from "styled-components";
import url from '../../images/climbing.jpg';
const CarouselBox=styled.div`
    width: 100%;
    height: 350px;

`;
export default function MainCarousel() {

    return (
        <CarouselBox>
            <Carousel>
                <img src={url} />
                <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide2" />
                <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide3" />
                <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide4" />
                <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide5" />
                <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide6" />
            </Carousel>
        </CarouselBox>

    );

}