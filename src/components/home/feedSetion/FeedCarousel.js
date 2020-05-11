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
import Skeleton from '@material-ui/lab/Skeleton';
import SkeletonCenterCard from '../../common/SkeletonCenterCard'
import FeedCard from './FeedCard'

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
        [theme.breakpoints.down('sm')]: {
            right: -10,
        },
    },
    backButton: {
        left: -30,
        [theme.breakpoints.down('sm')]: {
            left: -10,
        },
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

function ComponentsUsingContext({posts, classes, mobileM, page, visibleSlides}) {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(()=> {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);

    const slideIndex=[];

    for(let i=0; i<page; i++){
        if(i !== page-1){
            slideIndex[i]=visibleSlides*i;
        }else{
            slideIndex[i]=visibleSlides*i- (visibleSlides*page- posts.length);
        }
    }
    const dotComponents=slideIndex.map((slide, index)=>(
        slide===currentSlide ? (
                <Dot key={index} className={classes.dotSelected} slide={slide}/>
            ) : (
                <Dot key={index} className={classes.dot} slide={slide}/>
            )
    ));


    const ArrowButtons=()=>{
        if(currentSlide===0){
            return (
                <RightArrowButton classes={classes}/>
            )
        }else if(currentSlide>=posts.length-visibleSlides||currentSlide===posts.length-1){
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
            {!mobileM && <ArrowButtons/>}
        </>
    )
}

export default function FeedCarousel({posts, loading}) {
    const classes = useStyles();
    const mobileL = useMediaQuery('(max-width:670px)');
    const mobileM = useMediaQuery('(max-width:450px)');
    const laptop = useMediaQuery('(min-width:1200px)');
    let tempArray=[0, 0, 0, 0];

    const { totalSlide, visibleSlides, page} = useMemo(() => {
        const visibleSlides=(mobileM ? 2 : (mobileL ? 3  : 4 ));
        if(posts){
            const totalSlide=posts.length;

            const page=Math.ceil(totalSlide/visibleSlides);
            return {totalSlide, visibleSlides, page};
        }else {
            return {'totalSlide': 4, visibleSlides, 'page':0};
        }
    }, [posts, mobileL, mobileM, laptop]);


    return (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={laptop ? 110 : (mobileM? 140 : 130)}
                totalSlides={totalSlide}
                visibleSlides={visibleSlides}
                step={visibleSlides}
                dragStep={visibleSlides}
                dragEnabled={false}
            >
                <Slider>
                    {(loading || !posts) && tempArray.map((center, index)=>(
                        <Slide key={index}>
                            <CardBox>
                                <SkeletonCenterCard center={center}/>
                            </CardBox>
                        </Slide>
                    ))}
                    {!loading && posts && posts.map((post, index)=>(
                        <Slide index={index} key={index}>
                            <CardBox>
                                <FeedCard post={post}/>
                            </CardBox>
                        </Slide>
                    ))}
                </Slider>
                { !loading && posts && posts.length>1 &&
                    <ComponentsUsingContext posts={posts} classes={classes} mobileM={mobileM} page={page} visibleSlides={visibleSlides}/>
                }
            </CarouselProvider>
        </div>
    );
}