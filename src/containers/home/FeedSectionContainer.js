import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listPosts} from '../../modules/home';
import FeedCarousel from '../../components/home/feedSetion/FeedCarousel'
import qs from "qs";
import CenterCarousel from "../../components/home/centerSection/CenterCarousel";

const FeedSectionContainer=()=> {
    const dispatch=useDispatch();

    const {posts, error, postsLoading}=useSelector(
        ({ home, loading })=> ({
            posts: home.posts,
            error: home.postsError,
            postsLoading: loading['home/LIST_POSTS'],
        }),
    );

    useEffect(()=> {
        const {tag, username, category}='';
        dispatch(listPosts({tag, username, category}));
    }, [dispatch]);


    return (
        <>
            <FeedCarousel
                loading={postsLoading}
                error={error}
                posts={posts}
            />
        </>
    );
};

export default FeedSectionContainer;