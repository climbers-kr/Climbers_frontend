import React from 'react';
import styled from 'styled-components';
import SiteBox from './common/SiteBox';
import PriceBox from './common/PriceBox';
import CheckBox from './common/CheckBox';
import BooleanSelectBox from './common/BooleanSelectBox';
import {makeStyles} from "@material-ui/core/styles";
import InputWithLabel from "./common/InputWithLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const InputLabelBox=styled.label`
    display: grid;
    grid-template-columns: 1fr 2fr;
    //background: skyblue;
    width: 100%;
    align-items: center;
    flex: 1;
`;


const SaveForm=(
    {
        title,
        contact,
        sites,
        prices,
        time,
        hasParking,
        onChangeCheck,
        onChangeField,
        onChangeArray
}) => {
    return (
        <>
            <InputWithLabel label="Title" name="title" value={title} onChange={onChangeField}/>
            <InputWithLabel label="Contact" name="contact" value={contact} onChange={onChangeField}/>
            <InputLabelBox>
                <h3>Site</h3>
                <SiteBox tags={sites} onChangeArray={onChangeArray}/>
            </InputLabelBox>
            <InputLabelBox>
                <h3>Price</h3>
                <PriceBox prices={prices} onChangeArray={onChangeArray}/>
            </InputLabelBox>
            <InputWithLabel label="Operating hours" name="time" value={time} onChange={onChangeField}/>
            <BooleanSelectBox
                onChangeField={onChangeField}
                value={hasParking}
                name="hasParking"
                label="Parking"
            />
            <CheckBox
                label="Facility"
                onChangeCheck={onChangeCheck}
            />
        </>
    )
};

export default SaveForm;