import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listPosts, scrollBottom} from '../../../modules/posts';
import CommentInput from '../../../components/community/postList/CommentInput';

const CommentInputContainer=()=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();

    const {posts, error, postsLoading, user, morePostsLoading, page}=useSelector(
        ({ posts, loading, user })=> ({
            posts: posts.posts,
            error: posts.error,
            postsLoading: loading['posts/LIST_POSTS'],
            user: user.user,
            morePostsLoading: loading['posts/READ_MORE'],
            page: posts.page,
        }),
    );


    useEffect(()=>{
        console.log('current page state: ', page);
    }, [page]);


    return (
        <>
            <CommentInput
                error={error}
                posts={posts}
                showWriteButton={user}
                loader={loader}
            />
        </>
    );
};

export default CommentInputContainer;