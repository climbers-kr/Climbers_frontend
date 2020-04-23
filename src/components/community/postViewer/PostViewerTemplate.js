import React from 'react';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';

const PostViewerTemplateBlock=styled.div`
    display: flex;
    margin: 5rem auto;
    width: 90%;
    background-color: darkgrey;
    max-width: 1000px;
    @media(min-width: 1200px){
        width: 70%;
    }
`
const StyledCard=styled(Card)`
    border: 1.5px solid transparent;
    border-image: linear-gradient(to left, #77a1d3, #79cbca, #e684ae);
    border-image-slice: 1;
    border-image-width: 1.5px;
    flex: 1;
    display: flex;
    flex-flow:column wrap-reverse;
   @media(min-width: 800px){
        &>:nth-child(6) {order: 3};
        &>:nth-child(1) {order: 2}; //댓글 인풋
    }
    @media(max-width: 800px){
        &>:nth-child(2) {order: -2};
        &>:nth-child(6) {order: -1};
        &>:nth-child(1) {order: 3}; //댓글 인풋
    }
`;


export default function PostViewerTemplate({post, children}) {

    return (
        <PostViewerTemplateBlock>
            <StyledCard >
                {children}
            </StyledCard>
        </PostViewerTemplateBlock>

    );
}