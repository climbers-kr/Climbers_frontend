import React from 'react';
import styled from 'styled-components';

const ErrorMessageBlock=styled.div`
    flex: 1;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export default function ErrorMessage({children}) {
    return (
        <ErrorMessageBlock>
            <h2>Error</h2>
            {children}
            <p>잠시 후 다시 시도해주시고 계속해서 오류가 발생할 시</p>
            <p>관리자에게 연락부탁드립니다</p>
            <h5>climbers.help@gmail.com</h5>
        </ErrorMessageBlock>
    )
}