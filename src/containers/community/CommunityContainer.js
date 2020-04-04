import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {listPosts} from '../../modules/posts';
import CommunityForm from '../../components/community/CommunityForm';

const CommunityContainer=({location})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();
    const {posts, error, loading, user}=useSelector(
        ({ posts, loading, user })=> ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );

    useEffect(()=> {
        const {tag, username, page}=qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({tag, username, page}));
    }, [dispatch, location.search]);
    var options = {
        root: containerRef.current,
        rootMargin: "0px",
        threshold: 0
    };
    useEffect(()=>{
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 관찰 대상이 viewport 안에 들어온 경우 image 로드
                if (entry.isIntersecting) {
                    console.log(entry);

                    //observer.unobserve(entry.target);
                }
            })
        }, options);
        //if( loader.current) {
            io.observe(loader.current);
        //}else {
           // console.log('no dd')
        //}
    }, [posts]);

    return (
        <CommunityForm
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
            loader={loader}
            containerRef={containerRef}

        />
    );
};

export default withRouter(CommunityContainer);