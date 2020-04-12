import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import CenterListTemplate from '../../components/centers/centerList/CenterListTemplate';
import CenterCard from '../../components/common/CenterCard';
import CenterListContainer from "../../containers/centers/centerList/CenterListContainer";
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