import React from 'react';
import styled from 'styled-components';

const FormTemplateBlock=styled.div`
    flex: 1;
    background: gray;
    display: flex;
    justify-content: center;
    overflow: scroll;
`;
const WhiteBox=styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 60%;
    background: white;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &>:nth-child(2) {order: -1}
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