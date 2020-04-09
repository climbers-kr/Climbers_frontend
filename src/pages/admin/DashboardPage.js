import React from 'react';
import SideAppBar from "../../components/admin/SideAppBar";
import PostCodeTemp from '../../components/admin/PostCodeTemp';
import SaveForm from '../../components/admin/saveCenterInfo/SaveForm';
import SaveFormContainer from '../../containers/admin/saveCenterInfo/SaveFormContainer';

const DashboardPage=()=>{
    return (
        <>
            <SideAppBar>
                <SaveFormContainer/>
            </SideAppBar>

        </>
    );
};


export default DashboardPage;