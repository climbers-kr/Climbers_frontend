import styled from "styled-components";
import React from 'react';
import Button from '@material-ui/core/Button';

const CenterListTemplateBlock=styled.div`
    display: flex;
   
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    margin-top: 4rem;
    @media(max-width: 600px){
      margin-top: 3rem;
    }
    align-items: center;
    //overflow: scroll;
`;
const Responsive=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    @media(min-width: 960px) {
      width: 80%;
    }
    @media(min-width: 1280px) {
      max-width: 1100px;
    }
`;
const SortingButtonBlock=styled.div`
    margin: 1rem 0 1rem 0;
    align-self: flex-start;
    
`;
export default function CenterListTemplate({children}) {
    return (
        <CenterListTemplateBlock>
            <Responsive>
                <SortingButtonBlock>
                    <Button variant="outlined" color="primary">
                        Sort
                    </Button>
                </SortingButtonBlock>

                {children}
            </Responsive>
        </CenterListTemplateBlock>
    )
}