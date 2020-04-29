import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import EditTemplate from "../../components/account/edit/EditTemplate";
import EditForm from "../../components/account/edit/EditForm";


const EditPasswordPage=()=>{
    return (
        <>
            <HeaderContainer/>
            <EditTemplate>
                <EditForm />
            </EditTemplate>
        </>
    );
};

export default EditPasswordPage;