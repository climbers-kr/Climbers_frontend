import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {listPosts, scrollBottom} from '../../../modules/posts';
import PostList from '../../../components/community/postList/PostList';
import styled from 'styled-components';

const CommunityContainer=({location})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();
    const currentPage=useRef(1);
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

    useEffect(()=> {
        const {tag, username, page}=qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        currentPage.current=parseInt(page || '1', 10);
        dispatch(listPosts({tag, username, page}));
    }, [dispatch, location.search]);

    useEffect(()=>{
        console.log('current page state: ', page);
    }, [page]);

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

                    const {tag, username}=qs.parse(location.search, {
                        ignoreQueryPrefix: true,
                    });
                    dispatch(scrollBottom({tag, username})); //page는 redux 내부에서 state 참조함
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

export default withRouter(CommunityContainer);