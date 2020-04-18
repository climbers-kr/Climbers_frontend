import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot, CarouselContext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import CenterCard from '../../common/CenterCard'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from "styled-components";
const CardBox=styled.div`
    position: relative;
    height: 100%;
    margin: 0 5px 0 5px;
`;
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        //background: 'blue',
        width: '100%',
        //marginBottom: '100px',
    },
    buttonBack: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
    },
    buttonNext: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)'
    },
    dot: {
        background: '#3c4146',
        //borderRadius: '75px',
        border: '1px solid #3c4146',
        //color: 'skyblue'
        margin: '1px',
    },
    dotSelected: {
        background: '#B68DFF',
        border: '1px solid #B68DFF',
        margin: '1px'
    },
    dotBox: {
        textAlign: 'center',

    },
    icon:{
        fontSize: '17px',
        color: 'white',
        //flex: 1,
    },
    arrowButton:{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
        height: '25px',
        width: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'rgba( 255, 255, 255, 0 )',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    nextButton: {
        right: -30,
    },
    backButton: {
        left: -30,
    }
}));

const RightArrowButton=({classes})=>(
    <ButtonNext className={clsx(classes.arrowButton, classes.nextButton)}>
        <ArrowForwardIos className={classes.icon}/>
    </ButtonNext>
);
const LeftArrowButton=({classes})=>(
    <ButtonBack className={clsx(classes.arrowButton, classes.backButton)}>
        <ArrowBackIos className={classes.icon}/>
    </ButtonBack>
);

function ComponentsUsingContext({centers, classes}) {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(()=> {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);
    const dotComponents=centers.map((image, index)=>(
        index===currentSlide ? (
            <Dot key={index} className={classes.dotSelected} slide={index}/>
        ) : (
            <Dot key={index} className={classes.dot} slide={index}/>
        )
    ));
    const ArrowButtons=()=>{
        if(currentSlide===0){
            return (
                <RightArrowButton classes={classes}/>
            )
        }else if(currentSlide===centers.length-1){
            return (
                <LeftArrowButton classes={classes}/>
            )
        }else {
            return (
                <>
                    <LeftArrowButton classes={classes}/>
                    <RightArrowButton classes={classes}/>
                </>
            )
        }
    };
    return (
        <>
            <div className={classes.dotBox}>{dotComponents}</div>
            <ArrowButtons/>
        </>
    )
}

export default function CenterCarousel({imgUrlList, centers, loading}) {
    const classes = useStyles();
    const mobileL = useMediaQuery('(max-width:670px)');
    const mobileM = useMediaQuery('(max-width:450px)');
    const laptop = useMediaQuery('(min-width:1200px)');
    const totalSlide = useMemo(() => {
        if(centers){
            return centers.length;
        }
    }, [centers]);

    return (
        <div className={classes.root}>
            {
                !loading && centers && (
                    <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={laptop ? 110 : (mobileM? 140 : 130)}
                        totalSlides={totalSlide}
                        visibleSlides={mobileM? 2 : (mobileL ? 3  : 4 )}
                        dragEnabled={false}
                    >
                        <Slider>
                            {centers.map((center, index)=>(
                                <Slide index={index} key={index}>
                                    <CardBox>
                                        <CenterCard center={center}/>
                                    </CardBox>
                                </Slide>
                            ))}
                        </Slider>
                        {centers.length>1 && <ComponentsUsingContext centers={centers} classes={classes}/>}
                    </CarouselProvider>
                )
            }

        </div>
    );
}