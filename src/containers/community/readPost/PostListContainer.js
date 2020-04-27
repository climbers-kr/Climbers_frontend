import React, {useCallback, useEffect, useRef} from 'react';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {listPosts, scrollBottom, unloadPosts, selectCategory} from '../../../modules/posts';
import PostList from '../../../components/community/postList/PostList';

const PostListContainer=({location})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();
    const {posts, error, postsLoading, user, morePostsLoading, category}=useSelector(
        ({ posts, loading, user })=> ({
            posts: posts.posts,
            error: posts.error,
            postsLoading: loading['posts/LIST_POSTS'],
            user: user.user,
            morePostsLoading: loading['posts/READ_MORE'],
        }),
    );
    useEffect(()=> {
        const {tag, username, category}=qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({tag, username, category}));
        return ()=>{
            dispatch(unloadPosts());
        };
    }, [dispatch, location.search]);

    const options = {
        root: containerRef.current,
        //root: null,
        rootMargin: "10px",
        threshold: 0
    };

    useEffect(()=>{
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 관찰 대상이 viewport 안에 들어온 경우 image 로드
                if (entry.isIntersecting) {
                    console.log(entry);
                    const {tag, username, category}=qs.parse(location.search, {
                        ignoreQueryPrefix: true,
                    });
                    dispatch(scrollBottom({tag, username, category})); //page는 redux 내부에서 state 참조함
                }
            })
        }, options);

        io.observe(loader.current);

        //return io.unobserve(loader.current);
    }, [dispatch]);

    return (
        <>
            <PostList
                loading={postsLoading}
                loading2={morePostsLoading}
                error={error}
                posts={posts}
                showWriteButton={user}
                loader={loader}
                containerRef={containerRef}
            />
        </>
    );
};

export default withRouter(PostListContainer);