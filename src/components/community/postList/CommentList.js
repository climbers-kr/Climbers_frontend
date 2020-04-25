import styled from "styled-components";
import React, {useEffect} from "react";



const CommentItemBlock=styled.div`
    display: flex;
    margin: 0;
    padding: 0;
`

const Commenter=styled.p`
    font-weight: 550;
    padding: 0 10px;
    margin: 5px;
`;
const CommentText=styled.p`
    flex: 3;
    margin: 5px;
`
const CommentItem=(({comment, onRemove}) => (
    <CommentItemBlock onClick={()=> onRemove(comment)}>
        <Commenter>{comment.commenter.username}</Commenter>
        <CommentText>{comment.comment}</CommentText>
    </CommentItemBlock>
));

function CommentList({ comments }) {

    //console.dir(post.postComment)

    return (

        <>
            { comments.map((comment) =>
                (<CommentItem comment={comment} key={comment._id}/>)
            )}

        </>

    );
}
export default CommentList;