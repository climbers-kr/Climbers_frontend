import styled, {css} from "styled-components";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React from "react";
//before: styled.label
export const InputLabelBox=styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 100%;
    align-items: center;
    flex: 1;
`;

export const StyledInput=styled(OutlinedInput)`
    height: 40px;
    ${props =>
    props.right &&
    css`
        grid-column: 2 / 3;
        margin-bottom: 4px;
    `}  
`;

export const InputWithLabel=({ label, name, value, onChange })=>{
    return (
        <>
            <InputLabelBox>
                <h3>{label}</h3>
                <StyledInput name={name} value={value} onChange={onChange}/>
            </InputLabelBox>
        </>
    )
};

/*

const InputLabelBox=styled.label`
    display: grid;
    grid-template-columns: 1fr 2fr;
    //background: skyblue;
    width: 100%;
    align-items: center;
    flex: 1;
`;
* */

