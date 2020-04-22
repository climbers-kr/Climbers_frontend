import React, { useContext, useEffect, useState } from 'react';
import {CarouselProvider, Slider, Slide, Dot, CarouselContext, ButtonNext, ButtonBack} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {makeStyles} from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import clsx from "clsx";
import LazyImage from './LazyImage';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        background: 'darkgray',
        touchAction: 'none', //testing
    },
    dot: {
        background: '#101014',
        borderRadius: '75px',
        border: '1px solid #101014',
        //color: 'skyblue'
        margin: '1px',
        maxWidth: '1px',
        opacity: '30%',
    },
    dotSelected: {
        borderRadius: '75px',
        background: '#101014',
        border: '1px solid #101014',
    },
    dotBox: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    icon:{
        fontSize: '1rem',
        color: 'white'
    },
    arrowButton:{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
        height: '20px',
        width: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'rgba( 255, 255, 255, 0 )',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
    },
    nextButton: {
        right: 5,
    },
    backButton: {
        left: 5,
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

function ComponentsUsingContext({imgUrlList, classes}) {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(()=> {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);
    const dotComponents=imgUrlList.map((image, index)=>(
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
        }else if(currentSlide===imgUrlList.length-1){
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
function SliderWrapper({children, to}) {
    return ( to ? (
            <Link to={to}>
                {children}
            </Link>
        ) : (
            <>{children}</>
        ))
}
export default function Carousel({imgUrlList, to}) {
    const url='https://climbers.herokuapp.com';
    const classes = useStyles();
    const count=imgUrlList.length;
    return (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={60}
                totalSlides={count}
                dragEnabled={false}
                isPlaying={true}
            >
                <SliderWrapper to={to}>
                    <Slider>
                        {
                            imgUrlList.map((image, index)=>(
                                <Slide index={index} key={index}>
                                    <LazyImage src={url+image}/>
                                </Slide>
                            ))
                        }
                    </Slider>
                </SliderWrapper>
                {imgUrlList.length>1 && <ComponentsUsingContext imgUrlList={imgUrlList} classes={classes}/>}
            </CarouselProvider>
        </div>
    );
}