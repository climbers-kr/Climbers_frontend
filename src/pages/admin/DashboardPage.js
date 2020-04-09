import React from 'react';
import SideAppBar from "../../components/admin/SideAppBar";
import PostCodeTemp from '../../components/admin/PostCodeTemp';
import SaveForm from '../../components/admin/saveCenterInfo/SaveForm';

const DashboardPage=()=>{
    return (
        <>
            <SideAppBar>
                <SaveForm/>
            </SideAppBar>

        </>
    );
};


export default DashboardPage;