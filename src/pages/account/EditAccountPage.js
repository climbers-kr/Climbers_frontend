import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import EditTemplate from '../../components/account/edit/EditTemplate';
import EditForm from '../../components/account/edit/EditForm';
import Avatar from '@material-ui/core/Avatar';

const EditAccountPage=()=>{
    return (
        <>
            <HeaderContainer/>
            <EditTemplate>
                <EditForm />
            </EditTemplate>
        </>

    );
};
export default EditAccountPage;