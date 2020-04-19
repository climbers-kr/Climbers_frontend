import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import CenterListTemplate from '../../components/centers/centerList/CenterListTemplate';
import CenterListContainer from "../../containers/centers/CenterListContainer";
const CenterListPage=()=>{
    return (
        <>
            <HeaderContainer/>
            <CenterListTemplate>
                <CenterListContainer/>
            </CenterListTemplate>
        </>

    );
};
export default CenterListPage;