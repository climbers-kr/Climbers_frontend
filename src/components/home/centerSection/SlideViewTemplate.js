import React from 'react';
import styled from "styled-components";


const SlideViewSection=styled.div`
    margin-top: 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: white;
`;

const SlideViewBlock=styled.div`
    width: 100%;
    display: flex;
    background: #4BC0C8;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    justify-content: center;
    padding: 10px 0 10px 0;
`;
const Responsive=styled.div`
    display: flex;
    width: 100%;
    @media(min-width: 1024px){
        width: 90%;
    }
    @media(min-width: 1440px){
        width: 80%;
    }
    @media(min-width: 2560px){
        width: 70%;
    }
`;

export default function SlideViewTemplate({children}){
    return (
        <SlideViewSection>
            <h1 style={{color: 'white', paddingLeft: '3rem'}}>
                클라이밍 센터 추천
            </h1>
            <SlideViewBlock>
                <Responsive>
                    {children}
                </Responsive>
            </SlideViewBlock>
        </SlideViewSection>
    )
}