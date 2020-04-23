import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import {readPost, unloadPost} from '../../../modules/post';
import PostViewer from '../../../components/community/postViewer/PostViewer';
//import {removePost} from "../../lib/api/posts";

const PostViewerContainer=({match, history})=>{
    //처음 마운트될 때 포스트 읽기 api 요청
    console.log(match.params)
    const {postId} = match.params;
    const dispatch=useDispatch();
    const {post, error, loading, user}=useSelector(({post, loading, user})=>({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user,
    }));

    useEffect(()=>{
        dispatch(readPost(postId));
        //언마운트 될 때 리덕스에서 포스트 데이터 없애기
        return ()=>{
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);


    const ownPost = (user && user._id) === (post && post.user._id);

    return (
        <PostViewer
            post={post}
            loading={loading}
            error={error}
            ownPost={ownPost}
        />
    );
};

export default withRouter(PostViewerContainer);