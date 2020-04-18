import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import MainCarousel from '../components/home/MainCarousel';
import HomeTemplate from "../components/home/HomeTemplate";
import SlideView from "../components/home/SlideView";
import CenterCarouselView from "../components/home/CenterCarouselView";

const HomePage=()=>{
    return (
        <>
            <HeaderContainer />
            <HomeTemplate>
                <MainCarousel/>
                <SlideView/>
                <SlideView/>
                <CenterCarouselView/>
            </HomeTemplate>
        </>
    );
};


export default HomePage;