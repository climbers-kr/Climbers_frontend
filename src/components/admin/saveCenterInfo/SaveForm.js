import React from 'react';
import styled from 'styled-components';
import FormTemplate from './FormTemplate';
import SimpleModal from './PostCodeModal';
import LocationSearchContainer from '../../../containers/admin/saveCenterInfo/LocationSearchContainer';

const SaveForm=()=>{

    return (
        <FormTemplate>
            <LocationSearchContainer/>
        </FormTemplate>
    )

};

export default SaveForm;