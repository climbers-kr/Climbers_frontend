import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import UserProfileTemplate from '../../components/account/user/UserProfileTemplate'
import UserProfile from '../../components/account/user/UserProfile'
import HorizontalTab from '../../components/account/user/molecules/HorizontalTab'
import UserProfileContainer from '../../containers/account/user/UserProfileContainer'

function UserProfilePage(){
    return (
        <>
            <HeaderContainer/>
            <UserProfileTemplate>
                <UserProfileContainer />
                <HorizontalTab/>
            </UserProfileTemplate>
        </>
    );
};
export default UserProfilePage;