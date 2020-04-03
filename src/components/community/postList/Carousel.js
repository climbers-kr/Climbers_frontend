import React, { useContext, useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, Dot, DotGroup, CarouselContext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {makeStyles} from "@material-ui/core/styles";
//import DotGroup from './DotGroup';

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
    dotGroup:{
        textAlign: 'center',
       // backgroundColor: 'blue',
        color:'blue',
        button: {
            background: 'red',
            color: 'red'
        }
    },
    dot: {
        visibility:'',
        //opacity: 0,
        background: 'blue'
    }
}));
function renderButton(){
    return(
        <button/>
    )
}

export function MyComponentUsingContext() {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(() => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);
    return `The current slide is: ${currentSlide}`;
}
export default function Carousel({imgUrlList}) {
    useEffect(()=>{
        console.dir(Dot.defaultProps)
    }, [Dot.defaultProps])

    const carouselContext = useContext(CarouselContext);

    const classes = useStyles();
    const count=imgUrlList.length;
    return (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
                totalSlides={count}
                value={carouselContext}
            >
                <Slider>
                    {
                        imgUrlList.map((image, index)=>(
                            <Slide index={index} key={index}><Image src={image}/></Slide>
                        ))
                    }

                </Slider>
                <MyComponentUsingContext/>
                <ButtonBack className={classes.buttonBack}>Back</ButtonBack>
                <ButtonNext className={classes.buttonNext}>Next</ButtonNext>
                <DotGroup className={classes.dotGroup} dotNumbers={true}/>
                <button><Dot className={classes.dot} slide={2}/></button>

            </CarouselProvider>
        </div>

    );

}