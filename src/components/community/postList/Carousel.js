import React, { useContext, useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, Dot, CarouselContext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
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
        margin: '1px'

    },
    dotSelected: {
        background: '#B68DFF',
        border: '1px solid #B68DFF',
        margin: '1px'
    },
    dotBox: {
        textAlign: 'center',

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
export default function Carousel({imgUrlList}) {

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
                            <Slide index={index} key={index}><Image src={image}/></Slide>
                        ))
                    }
                </Slider>
                {imgUrlList.length>1 && (
                    <>
                        <ButtonBack className={classes.buttonBack}>Back</ButtonBack>
                        <ButtonNext className={classes.buttonNext}>Next</ButtonNext>

                    </>
                )}
                {imgUrlList.length>1 && <DotComponentUsingContext imgUrlList={imgUrlList} classes={classes}/>}
            </CarouselProvider>
        </div>
    );
}