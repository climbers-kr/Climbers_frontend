import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
const UserInfoBlock=styled.div`
    display: flex;
    width: 100%;
    //height: 100%;
    align-items: center;
    background-color: rgba(0,0,0,0.64);
    &>*{
        margin: 1rem 2px;
    }
`;
const Username=styled.p`
    
`
export default function UserInfo({user}){
    return (
        <UserInfoBlock>
            <Avatar/>
            <Username>{user.username}</Username>
        </UserInfoBlock>
    )
}