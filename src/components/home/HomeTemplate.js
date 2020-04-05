import React from 'react';
import styled from "styled-components";


/*화면 전체를 채움*/
const HomeTemplateBlock=styled.div`
 
   
    margin-top:4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    background: #313233; 
   

`;

export default function HomeTemplate({children}){
    return (
        <>

            <HomeTemplateBlock>
                {children}
            </HomeTemplateBlock>
        </>
    );
};
