import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import MainCarousel from '../components/home/MainCarousel';
import HomeTemplate from "../components/home/HomeTemplate";
import SlideViewTemplate from "../components/home/SlideViewTemplate";
import CenterSectionContainer from '../containers/home/CenterSectionContainer';
import FeedSectionContainer from "../containers/home/FeedSectionContainer";
const HomePage=()=>{
    return (
        <>
            <HeaderContainer />
            <HomeTemplate>
                <MainCarousel/>
                <SlideViewTemplate label="클라이밍 센터 추천">
                    <CenterSectionContainer/>
                </SlideViewTemplate>
                <SlideViewTemplate label="추천 피드">
                    <FeedSectionContainer/>
                </SlideViewTemplate>
            </HomeTemplate>
        </>
    );
};


export default HomePage;