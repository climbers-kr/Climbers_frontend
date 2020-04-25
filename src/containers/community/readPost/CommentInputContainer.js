import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField} from '../../../modules/post';
import CommentInput from '../../../components/community/postViewer/CommentInput';
import {writeComment} from "../../../modules/post";

const CommentInputContainer=()=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();

    const { post, error, postLoading, user, reaction}=useSelector(
        ({ post, loading, user})=> ({
            post: post.post,
            reaction: post.reaction,
            error: post.error,
            postLoading: loading['post/READ_POST'],
            user: user.user,
        }),
    );
    useEffect(()=>{
        console.log('current reaction: ', reaction);
    }, [reaction]);
    const onChangeField=useCallback(e=> {
        console.log('current onChangeField: ', e.target);
        return dispatch(changeField({ key: e.target.name, value: e.target.value}));
    }, [dispatch, post]);

    useEffect(()=>{
        console.log('current reaction state: ', reaction);
        console.log('current reaction state2: ', reaction.comment);
    }, [reaction]);

    //const postId=post._id;
    const onSubmit = (e)=> {
        e.preventDefault();
        console.log('onSubmit called');
        if(!reaction.comment){
            console.log('comment nono');
            return;
        }
        dispatch(
            writeComment({
                postId: post._id,
                comment: reaction.comment,
            }),
        );
    };

    return (
        <>
            <CommentInput
                error={error}
                post={post}
                user={user}
                onChangeField={onChangeField}
                reaction={reaction}
                onSubmit={onSubmit}

            />
        </>
    );
};

export default CommentInputContainer;