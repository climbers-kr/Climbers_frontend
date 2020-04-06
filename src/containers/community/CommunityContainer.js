import React, {useEffect, useRef, useCallback} from 'react';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {listPosts, readMore, scrollBottom} from '../../modules/posts';
import CommunityForm from '../../components/community/CommunityForm';
import styled from 'styled-components';

const TestWrapper=styled.div`
  display: flex;
  flex-direction: column;
  
`;

const CommunityContainer=({location})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();
    const currentPage=useRef(1);
    const {posts, error, postsLoading, user, morePostsLoading}=useSelector(
        ({ posts, loading, user })=> ({
            posts: posts.posts,
            error: posts.error,
            postsLoading: loading['posts/LIST_POSTS'],
            user: user.user,
            morePostsLoading: loading['posts/READ_MORE'],
        }),
    );

    useEffect(()=> {
        const {tag, username, page}=qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        currentPage.current=parseInt(page || '1', 10);
        dispatch(listPosts({tag, username, page}));
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

                    const {tag, username}=qs.parse(location.search, {
                        ignoreQueryPrefix: true,
                    });
                    //dispatch(readMore({tag, username, currentPage}));
                    //Todo: fix page bug
                    dispatch(scrollBottom({tag, username, page: currentPage.current++}));
                }
            })
        }, options);

        io.observe(loader.current);
        //return io.unobserve(loader.current);
    }, [dispatch]);

    return (
        <TestWrapper>
            <CommunityForm
                loading={postsLoading}
                loading2={morePostsLoading}
                error={error}
                posts={posts}
                showWriteButton={user}
                loader={loader}
                containerRef={containerRef}

            />

        </TestWrapper>


    );
};

export default withRouter(CommunityContainer);