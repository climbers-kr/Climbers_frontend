import React from 'react';
import SideAppBar from "../../components/admin/SideAppBar";
import FormTemplate from '../../components/admin/saveCenterInfo/FormTemplate';
import SaveFormContainer from '../../containers/admin/saveCenterInfo/SaveFormContainer';
import LocationSearchContainer from '../../containers/admin/saveCenterInfo/LocationSearchContainer';
import WriteActionButtonContainer from '../../containers/admin/saveCenterInfo/WriteActionButtonContainer';
import ImageContainer from "../../containers/admin/saveCenterInfo/ImageContainer";

const DashboardPage=()=>{
    return (
        <>
            <SideAppBar>
                <FormTemplate>
                    <ImageContainer/>
                    <LocationSearchContainer/>
                    <SaveFormContainer/>
                    <WriteActionButtonContainer/>
                </FormTemplate>
            </SideAppBar>
        </>
    );
};

export default DashboardPage;