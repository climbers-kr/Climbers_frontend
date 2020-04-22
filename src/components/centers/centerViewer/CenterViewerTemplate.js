import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		background-color: #191919;
	}
`;
const Responsive=styled.div`
    //background-color: #eb679d;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media(min-width: 960px) {
      width: 80%;
    }
    @media(min-width: 1280px) {
      max-width: 1024px;
    }
`;
const CenterViewerTemplateBlock=styled(Responsive)`
    width: 100%;
    margin: 4rem auto 0 auto;
    padding-top: 1rem;
    //background-color: #315ced;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    @media(max-width: 600px){
      align-items: center;
      margin-top: 3rem;
      justify-content: center;
    }
    
   
`;
export default function CenterViewerTemplate({center, loading, error, children, post}){

    return (
        <>
            <GlobalStyle/>
            <CenterViewerTemplateBlock>
                {children}
            </CenterViewerTemplateBlock>
        </>
    )
}
