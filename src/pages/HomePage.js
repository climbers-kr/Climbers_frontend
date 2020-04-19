import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import MainCarousel from '../components/home/MainCarousel';
import HomeTemplate from "../components/home/HomeTemplate";
import SlideViewTemplate from "../components/home/centerSection/SlideViewTemplate";
import CenterSectionContainer from '../containers/home/CenterSectionContainer';
const HomePage=()=>{
    return (
        <>
            <HeaderContainer />
            <HomeTemplate>
                <MainCarousel/>
                <SlideViewTemplate>
                    <CenterSectionContainer/>
                </SlideViewTemplate>
                <SlideViewTemplate>
                    <CenterSectionContainer/>
                </SlideViewTemplate>
            </HomeTemplate>
        </>
    );
};


export default HomePage;