import React from 'react';
import CommunityTemplate from '../../components/community/postList/CommunityTemplate';
import HeaderContainer from "../../containers/common/HeaderContainer";
import PostListContainer from "../../containers/community/readPost/PostListContainer";
import CategoryTabContainer from "../../containers/community/readPost/CategoryTabContainer";
import {Route, Router, withRouter, Link} from 'react-router-dom';
import PostPage from '../../pages/community/PostPage';

const CommunityPage=({match})=>{
    console.log(match.path)
    return (
        <>
            <HeaderContainer/>
            <CommunityTemplate CategoryTabContainer={CategoryTabContainer}>
                <CategoryTabContainer/>
                <PostListContainer/>
            </CommunityTemplate>
        </>

    );
};
export default CommunityPage;