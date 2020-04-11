import React from 'react';
import ArrayBox from './common/ArrayBox';
import PriceBox from './common/PriceBox';
import CheckBox from './common/CheckBox';
import BooleanSelectBox from './common/BooleanSelectBox';
import { InputWithLabel } from "./common/commonComponents";

const SaveForm=(
    {
        title,
        imageSource,
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
            <InputWithLabel
                label="Title"
                name="title"
                value={title}
                onChange={onChangeField}
            />
            <ArrayBox
                tags={imageSource}
                onChangeArray={onChangeArray}
                name="imageSource"
                label="ImageSource"
            />
            <InputWithLabel
                label="Contact"
                name="contact"
                value={contact}
                onChange={onChangeField}
            />
            <ArrayBox
                tags={sites}
                onChangeArray={onChangeArray}
                name="sites"
                label="Site"
            />
            <PriceBox
                label="Price"
                prices={prices}
                onChangeArray={onChangeArray}
            />
            <InputWithLabel
                label="Operating hours"
                name="time"
                value={time}
                onChange={onChangeField}
            />
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