import React from 'react';
import Carousel from 'nuka-carousel';
import styled from "styled-components";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import homeImage2 from '../../images/homeImage.png';
import homeImage1 from '../../images/homeImage2.png';
import {makeStyles} from "@material-ui/core/styles";
const CarouselBox=styled.div`
    width: 100%;
    height: 30vw;
    @media(max-width: 600px){
         height: 50vw;
    }
`;
const SlideImage=styled.div`
position: absolute;
    width: 100%;
    height: 30vw;
    @media(max-width: 600px){
         height: 50vw;
    }
    background-image: url(${props=> props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size : cover;
`;

const ArrowButton=styled.div`
    background-color: rgba( 0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f4f4f4;
    height: 40px;
`;

const useStyles = makeStyles((theme) => ({
    icon:{
        fontSize: '30px',
        color: 'white',
        //flex: 1,
    },
}));

export default function MainCarousel() {
    const classes = useStyles();
    return (
        <CarouselBox>
            <Carousel
                renderCenterLeftControls={({ previousSlide }) => (
                    <ArrowButton onClick={previousSlide}>
                        <ArrowBackIos className={classes.icon} />
                    </ArrowButton>
                )}
                renderCenterRightControls={({ nextSlide }) => (
                    <ArrowButton onClick={nextSlide}>
                        <ArrowForwardIos className={classes.icon}/>
                    </ArrowButton>
                )}
            >

                <SlideImage src={homeImage1} alt="homeImage1"/>
                <SlideImage src={homeImage2} alt="homeImage2"/>


            </Carousel>
        </CarouselBox>

    );

}