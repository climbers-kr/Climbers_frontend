import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock=styled.div`
    display: flex;
    background-color: black;
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

const Responsive=({children, ...rest})=>{
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;