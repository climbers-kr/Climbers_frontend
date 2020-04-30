import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import logo from '../../images/ClimbersLogo.png';
import Container from "@material-ui/core/Container";

//회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트

/*화면 전체를 채움*/
const AuthTemplateBlock=styled.div`
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
    @media(max-width: 500px){
      //padding: 1rem;
      padding: 1rem 0;
    }
`;

const AuthTemplate=( {children} )=>{
    return(
        <AuthTemplateBlock>
            <Link to="/"><img src={logo} className="LogoImage" alt="logo" /></Link>
            <WhiteBox maxWidth="xs">
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;