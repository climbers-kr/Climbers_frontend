import React from 'react';
import styled from 'styled-components';
import LazyImage from '../../common/LazyImage'
import UserInfo from './UserInfo';
const FeedCardContainer=styled.div`
    //display: flex;
     width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #61dafb;
    position: relative;
    overflow: hidden;
`;
const FeedImage=styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${props=> props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size : cover;
    z-index: 1;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FeedInfo=styled.div`
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    position: absolute;
    display: flex;
    align-items: flex-end;
`
export default function FeedCard({post}){
    return (
        <FeedCardContainer>
            <LazyImage src={post.imgUrlList[0]}/>
            <FeedInfo><UserInfo user={post.user}/></FeedInfo>
        </FeedCardContainer>
    )
}