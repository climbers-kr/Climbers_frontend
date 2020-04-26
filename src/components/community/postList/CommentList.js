import styled from "styled-components";
import React from "react";

const CommentItemBlock=styled.div`
    display: flex;
    margin: 0;
    padding: 0;
`;

const Commenter=styled.p`
    font-weight: 500;
    padding: 0 10px;
    margin: 0;
`;
const CommentText=styled.p`
    flex: 3;
    font-weight: 100;
    margin: 0;
`;
const CommentItem=(({comment}) => (
    <CommentItemBlock>
        <Commenter>{comment.commenter.username}</Commenter>
        <CommentText>{comment.comment}</CommentText>
    </CommentItemBlock>
));

function CommentList({ comments }) {

    return (
        <>
            { comments.map((comment) =>
                (<CommentItem comment={comment} key={comment._id}/>)
            )}

        </>
    );
}
export default CommentList;