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
    align-items: center;
    background: #f4f4f4;
    margin-top: 4rem;
`;
const FormTemplate=styled.div`
    display: flex;
    position: absolute;
    background-color: #ff8be6;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //max-width: 500px;
    width: 600px;
    @media(max-width: 600px){
        width: 95%;
    }
`;
const FormHeader=styled.div`
    border-bottom: 0.1px solid #c7c7c7;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
`;

const EditTemplate=({children})=>{
    return (
        <FullScreen>
            <FormTemplate>
                <FormHeader>
                    <p>프로필 편집</p>
                </FormHeader>
                {children}
            </FormTemplate>
        </FullScreen>
    );
};
export default EditTemplate;