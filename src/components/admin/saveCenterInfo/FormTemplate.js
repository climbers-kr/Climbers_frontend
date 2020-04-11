import React from 'react';
import styled from 'styled-components';

const FormTemplateBlock=styled.div`
    flex: 1;
    background: gray;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: scroll;
    padding: 4rem;
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
    &>:nth-child(3) {order: -1};
    &>:nth-child(1) {order: -1};
    &>*{
        flex:1
    };
    //height: 300px;
    //margin-top: 4rem;
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