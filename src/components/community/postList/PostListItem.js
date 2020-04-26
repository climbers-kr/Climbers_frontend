import React from 'react';
import Card from '@material-ui/core/Card';
import PostContents from './PostContents';
import CommentList from './CommentList';
import styled from "styled-components";
import ListReactionContainer from "../../../containers/community/readPost/ListReactionContainer";

const StyledCard=styled(Card)`
    margin-bottom: 10px;
    border: 1.5px solid transparent;
    border-image: linear-gradient(to left, #77a1d3, #79cbca, #e684ae);
    border-image-slice: 1;
    border-image-width: 1.5px;
`;
const CommentListBlock=styled.div`
    width: 100%;
    //background-color: #61dafb;
    display: flex;
    justify-content: center;
    flex-direction: column;
   
`;
//export default function PostListItem({ post, index }) {
function PostListItem({ post, index }) {

    return (
        <StyledCard>
            <PostContents postContent={post.postContent}/>
            <CommentListBlock>
                {post.comments && <CommentList comments={post.comments}/>}
            </CommentListBlock>
            <ListReactionContainer index={index} post={post}/>
        </StyledCard>
    );
}
export default React.memo(PostListItem);
//export default PostListItem;