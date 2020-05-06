import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';


const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		//background-color: #191919;
	}
`;

const UserProfileTemplateBlock=styled.div`
    width: 100%;
    margin: 4rem auto 0 auto;
    padding-top: 1rem;
    //background-color: #315ced;
    justify-content: center;
    display: flex;
    flex-direction: column;
    //flex-wrap: wrap;
    @media(max-width: 600px){
      align-items: center;
      margin-top: 3rem;
      justify-content: center;
    }
    @media(min-width: 900px){
      width: 80%;
    }
    @media(min-width: 1200px){
      width: 1000px;
    }
`;
export default function UserProfileTemplate({center, loading, error, children, post}){

    return (
        <>
            <GlobalStyle/>
            <UserProfileTemplateBlock>
                {children}
            </UserProfileTemplateBlock>
        </>
    )
}
