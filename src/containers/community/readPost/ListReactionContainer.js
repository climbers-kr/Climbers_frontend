import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField} from '../../../modules/posts';
import CommentInput from '../../../components/community/postList/CommentInput';
import {writeComment} from "../../../modules/posts";

const ListReactionContainer=({ index, post})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();


    const {  error, submitCommentLoading, user}=useSelector(
        ({ loading, user})=> ({
            //submitCommentLoading: loading['posts/WRITE_COMMENT'],
            //submitCommentLoading: post.commentsLoading || false,
            user: user.user,
            //posts: posts.posts,
            //error: posts.error,

        }),
    );

    const onChangeField=useCallback(e=> {
        //console.log('current onChangeField: ', e.target);
        return dispatch(changeField({ index: index, key: e.target.name, value: e.target.value}));
    }, [dispatch]);


    const submitComment=(input)=>{
        dispatch(
            writeComment({
                index: index,
                postId: post.postContent._id,
                comment: input,
            }),
        );
    };

    return (
        <>
            <CommentInput
                error={error}
                onChangeField={onChangeField}
                user={user}
                submitComment={submitComment}
                loading={post.commentsLoading || false}
                //loading={submitCommentLoading}
            />
        </>
    );
};

export default React.memo(ListReactionContainer);
//export default ListReactionContainer;