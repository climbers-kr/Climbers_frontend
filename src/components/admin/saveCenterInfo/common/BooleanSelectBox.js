import React from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";

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
`;

const BooleanSelectBox=({ name, value, label, onChangeField})=>{
    const classes = useStyles();

    const handleChange = (event) => {
        const name = event.target.name;
        console.dir(name);
        const value = event.target.value;
        console.dir(value);
        onChangeField(event)
    };
    return (
        <>
            <InputLabelBox>
                <h3>{label}</h3>
                <FormControl className={classes.formControl}>
                    <Select
                        value={value}
                        onChange={handleChange}
                        name={name}
                    >
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                    </Select>
                </FormControl>
            </InputLabelBox>
        </>
    )

};

export default BooleanSelectBox;