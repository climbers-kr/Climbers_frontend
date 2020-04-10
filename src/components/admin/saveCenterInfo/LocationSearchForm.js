import React from 'react';
import styled, {css} from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PostCodeModal from './common/PostCodeModal';

const InputLabelBox=styled.label`
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 2fr;
    //background: skyblue;
    width: 100%;
    align-items: center;
`;
const StyledInput=styled(OutlinedInput)`
    height: 40px;
    ${props =>
    props.right &&
    css`
        grid-column: 2 / 3;
        margin-bottom: 4px;
    `}  
`;

const LocationSearchForm=({ location, locationDetail, onSelectLocation, onChangeField })=>{

    return (
        <>
            <InputLabelBox>
                <h3>Location</h3>
                <PostCodeModal onSelectLocation={onSelectLocation} />
                <StyledInput right="true" disabled={true} value={location}/>
                <StyledInput
                    placeholder="상세주소 입력"
                    right="true"
                    onChange={onChangeField}
                    name="locationDetail"
                    value={locationDetail}
                />
            </InputLabelBox>
        </>
    )

};

export default LocationSearchForm;