import React from 'react';
import styled from 'styled-components';


import Container from "@material-ui/core/Container";
/*화면 전체를 채움*/
const WriteTemplateBlock=styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background: #2BC0E4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #EAECC6, #2BC0E4);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #EAECC6, #2BC0E4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
    .LogoImage{
        width: 200px;
        margin: 20px;
    }

`;

/*흰색 박스*/
const WhiteBox=styled(Container)`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    background: white;
    border-radius: 2px;
    display: flex;
    //flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    width: 80%;
   
    
    @media(max-width: 400px) {
        width: 95%;
    }
    @media(min-width: 900px) {
        width: 60%;
        max-width: 600px;
    }
`;
const WriteTemplate=( {children} )=>{
    return(
        <WriteTemplateBlock>
            <WhiteBox >
                {children}
            </WhiteBox>
        </WriteTemplateBlock>
    );
};

export default WriteTemplate;
