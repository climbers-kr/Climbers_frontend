import React from 'react';
import CommunityTemplate from '../../components/community/postList/CommunityTemplate';
import HeaderContainer from "../../containers/common/HeaderContainer";
import CommunityContainer from "../../containers/community/readPost/CommunityContainer";
import {Route, Router, withRouter, Link} from 'react-router-dom';
import PostPage from '../../pages/community/PostPage';

const CommunityPage=({match})=>{
    console.log(match.path)
    return (
        <>
            <HeaderContainer/>
            <CommunityTemplate>
                <CommunityContainer/>
            </CommunityTemplate>
        </>

    );
};
export default CommunityPage;