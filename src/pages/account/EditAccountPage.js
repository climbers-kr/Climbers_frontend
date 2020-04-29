import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import EditTemplate from '../../components/account/edit/EditTemplate';
import EditForm from '../../components/account/edit/EditForm';
import ImageSelectorContainer from '../../containers/account/edit/ImageSelectorContainer';
import EditProfileContainer from '../../containers/account/edit/EditProfileContainer';

const EditAccountPage=()=>{
    return (
        <>
            <HeaderContainer/>
            <EditTemplate>
                <ImageSelectorContainer />
                <EditProfileContainer />
            </EditTemplate>
        </>

    );
};
export default EditAccountPage;