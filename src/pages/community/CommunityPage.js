import React from 'react';
import CommunityTemplate from '../../components/community/postList/CommunityTemplate';
import HeaderContainer from "../../containers/common/HeaderContainer";
import CommunityContainer from "../../containers/community/readPost/CommunityContainer";
const CommunityPage=()=>{
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