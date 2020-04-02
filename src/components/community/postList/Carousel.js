import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function Carousel({imgUrlList}) {
    const count=imgUrlList.length;
    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            totalSlides={count}
        >
            <Slider>
                {
                    imgUrlList.map(image=>(
                        <Slide index={image}><Image src={image}/></Slide>
                    ))
                }

            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    );

}