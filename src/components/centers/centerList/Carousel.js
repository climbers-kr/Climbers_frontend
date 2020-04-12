import React, { useContext, useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, Dot, CarouselContext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    buttonBack: {
        position: 'absolute',
        top: '50%',
        left: 5,
        transform: 'translateY(-50%)',
        borderRadius: '50%',
        backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
        height: '20px',
        width: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'rgba( 255, 255, 255, 0 )',
    },
    buttonNext: {
        position: 'absolute',
        top: '50%',
        right: 5,
        transform: 'translateY(-50%)',
        borderRadius: '50%',
        backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
        height: '20px',
        width: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'rgba( 255, 255, 255, 0 )',
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
    }
}));


export function DotComponentUsingContext({imgUrlList, classes}) {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(() => {
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
    return <div className={classes.dotBox}>{dotComponents}</div>;
}
export function ArrowComponentUsingContext({imgUrlList, classes}) {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(() => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);
    const arrowButtons=()=>{
        if(currentSlide===0){
            return (
                <ButtonNext className={classes.buttonNext}>
                    <ArrowForwardIos className={classes.icon}/>
                </ButtonNext>
            )
        }else if(currentSlide===imgUrlList.length-1){
            return (
                <ButtonBack className={classes.buttonBack}>
                    <ArrowBackIos className={classes.icon}/>
                </ButtonBack>
            )
        }else {
            return (
                <>
                    <ButtonBack className={classes.buttonBack}>
                        <ArrowBackIos className={classes.icon}/>
                    </ButtonBack>
                    <ButtonNext className={classes.buttonNext}>
                        <ArrowForwardIos className={classes.icon}/>
                    </ButtonNext>

                </>
            )
        }
    };
    return arrowButtons();
}
export default function Carousel({imgUrlList}) {
    const url='http://localhost:5000';
    const classes = useStyles();
    const count=imgUrlList.length;
    return (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={70}
                totalSlides={count}
                dragEnabled={false}
            >
                <Slider>
                    {
                        imgUrlList.map((image, index)=>(
                            <Slide index={index} key={index}><Image src={url+image}/></Slide>
                        ))
                    }
                </Slider>

                {imgUrlList.length>1 &&
                        <ArrowComponentUsingContext imgUrlList={imgUrlList} classes={classes}/>
                }
                {imgUrlList.length>1 && <DotComponentUsingContext imgUrlList={imgUrlList} classes={classes}/>}
            </CarouselProvider>
        </div>
    );
}