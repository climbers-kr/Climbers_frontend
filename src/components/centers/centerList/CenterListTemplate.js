import styled from "styled-components";
import React from 'react';
import Button from '@material-ui/core/Button';

const CenterListTemplateBlock=styled.div`
    display: flex;
    flex-direction: column;
    //background: skyblue;
    margin-top: 4rem;
    justify-content: center;
    align-items: center;
`;
const SortingButtonBlock=styled.div`
    margin: 1rem 0 1rem 0;
    width: 90%;
    @media(min-width: 960px) {
      width: 80%;
    }
    @media(min-width: 1280px) {
      width: 70%;
    }
`;
export default function CenterListTemplate({children}) {
    return (
        <CenterListTemplateBlock>
            <SortingButtonBlock>
                <Button variant="outlined" color="primary">
                    Sort
                </Button>
            </SortingButtonBlock>

            {children}
        </CenterListTemplateBlock>
    )
}