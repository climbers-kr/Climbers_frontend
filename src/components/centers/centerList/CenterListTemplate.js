import styled from "styled-components";
import React from 'react';

const CenterListTemplateBlock=styled.div`
    display: flex;
    background: skyblue;
    margin-top: 4rem;
    justify-content: center;
    align-items: center;
   

`;
export default function CenterListTemplate({children}) {
    return (
        <CenterListTemplateBlock>
            {children}
        </CenterListTemplateBlock>
    )
}