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
                <img src={url} alt="test"/>
                <img src={url} alt="test"/>
                <img src={url} alt="test"/>
                <img src={url} alt="test"/>
                <img src={url} alt="test"/>
            </Carousel>
        </CarouselBox>

    );

}