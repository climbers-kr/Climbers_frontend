import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField} from '../../../modules/posts';
import CommentInput from '../../../components/community/postList/CommentInput';
import {writeComment} from "../../../modules/post";

const ListReactionContainer=({postId})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();

    const { posts, error, user, reaction}=useSelector(
        ({ posts, loading, user})=> ({
            posts: posts.posts,
            reaction: posts.reaction,
            error: posts.error,
            user: user.user,
        }),
    );

    const onChangeField=useCallback(e=> {
        console.log('current onChangeField: ', e.target);
        return dispatch(changeField({ id: postId, key: e.target.name, value: e.target.value}));
    }, [dispatch]);


    const submitComment=(input)=>{
            dispatch(
                writeComment({
                    postId: postId,
                    comment: input,
                }),
            );
        };


    return (
        <>
            <CommentInput
                error={error}
                onChangeField={onChangeField}
                postId={postId}
                reaction={reaction[postId]}
                //onSubmitWrapper={onSubmitWrapper}
                submitComment={submitComment}
            />
        </>
    );
};

export default ListReactionContainer;