import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import MainCarousel from '../components/home/MainCarousel';
import HomeTemplate from "../components/home/HomeTemplate";
import SlideView from "../components/home/SlideView";


const HomePage=()=>{
    return (
        <>
            <HeaderContainer />
            <HomeTemplate>
                <MainCarousel/>
                <SlideView/>
                <SlideView/>
            </HomeTemplate>
        </>
    );
};


export default HomePage;