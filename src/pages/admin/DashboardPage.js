import React from 'react';
import SideAppBar from "../../components/admin/SideAppBar";
import PostCode from '../../components/admin/PostCode';

const DashboardPage=()=>{
    return (
        <>
            <SideAppBar>
                <PostCode/>
            </SideAppBar>

        </>
    );
};


export default DashboardPage;