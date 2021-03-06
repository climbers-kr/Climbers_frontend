import React from 'react';
import styled from "styled-components";

/*화면 전체를 채움*/
const HomeTemplateBlock=styled.div`
    margin-top:4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #111732; 
    @media(max-width: 600px){
         margin-top:3rem;
    }
`;

const Footer=styled.div`
    height: 4rem;
`;

export default function HomeTemplate({children}){
    return (
        <>
            <HomeTemplateBlock>
                {children}
                <Footer/>
            </HomeTemplateBlock>
        </>
    );
};
