import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import CenterViewerContainer from '../../containers/centers/CenterViewerContainer'
import CommunityContainer from '../../containers/community/readPost/CommunityContainer'
import CenterViewerTemplate from '../../components/centers/centerViewer/CenterViewerTemplate'
const CenterPage=()=>{
    return (
        <>
            <HeaderContainer/>
            <CenterViewerTemplate>
                <CenterViewerContainer />
            </CenterViewerTemplate>


        </>

    );
};

export default CenterPage;