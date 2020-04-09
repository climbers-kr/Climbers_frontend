import React from 'react';
import styled from 'styled-components';

const FormTemplateBlock=styled.div`
    flex: 1;
    background: gray;
    /*flex로 내부 내용 중앙 정렬*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const WhiteBox=styled.div`
    .logo-area{
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 80%;
    background: white;
    border-radius: 2px;
`;

const FormTemplate=({children})=>{

    return (
        <FormTemplateBlock>
            <WhiteBox>
                {children}
            </WhiteBox>
        </FormTemplateBlock>
    )

};

export default FormTemplate;