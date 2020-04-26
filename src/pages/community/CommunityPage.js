import React from 'react';
import CommunityTemplate from '../../components/community/postList/CommunityTemplate';
import HeaderContainer from "../../containers/common/HeaderContainer";
import CommunityContainer from "../../containers/community/readPost/CommunityContainer";
import CategoryTabContainer from "../../containers/community/readPost/CategoryTabContainer";
import {Route, Router, withRouter, Link} from 'react-router-dom';
import PostPage from '../../pages/community/PostPage';

const CommunityPage=({match})=>{
    console.log(match.path)
    return (
        <>
            <HeaderContainer/>
            <CommunityTemplate CategoryTabContainer={CategoryTabContainer}>
                <CommunityContainer/>
            </CommunityTemplate>
        </>

    );
};
export default CommunityPage;