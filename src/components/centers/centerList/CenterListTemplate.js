import styled from "styled-components";
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    display: flex;
    
`;
const StyledTextField=styled(TextField)`
    margin: 0 1rem;
`;
export default function CenterListTemplate({children}) {
    return (
        <CenterListTemplateBlock>
            <Responsive>
                <SortingButtonBlock>
                    <Button size="small" variant="outlined" color="primary">
                        지역 설정
                    </Button>
                    <form noValidate autoComplete="off">
                        <StyledTextField id="outlined-basic" size="small" label="센터 이름으로 검색" variant="outlined" />
                    </form>
                </SortingButtonBlock>
                {children}
            </Responsive>
        </CenterListTemplateBlock>
    )
}