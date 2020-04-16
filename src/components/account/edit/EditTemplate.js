import React from 'react';
import styled from 'styled-components';
const FullScreen=styled.div`
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    justify-content: center;
    background: #f4f4f4;
`;
const Responsive=styled.div`
    //background-color: #61dafb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4rem;
    width: 100%;
    @media(max-width: 600px){
        width: 100%;
    }
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

const EditTemplate=({children})=>{
    return (
        <FullScreen>
            <Responsive>
                {children}
            </Responsive>
        </FullScreen>

    );
};
export default EditTemplate;