import React, { useEffect} from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

const InputLabelBox=styled.label`
    display: grid;
    grid-template-columns: 1fr 2fr;
    //background: skyblue;
    width: 100%;
    align-items: center;
`;

const CheckBox=({ label, onChangeCheck})=>{
    const classes = useStyles();

    const [state, setState] = React.useState({
        bouldering: true,
        endurance: true,
        lead: false,
        speed: false,
        outside: false,
    });

    useEffect(()=>{
        onChangeCheck(state);
    }, [state]);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { bouldering, endurance, lead, speed, outside } = state;

    return (
        <>
            <InputLabelBox>
                <h3>{label}</h3>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={bouldering} onChange={handleChange} name="bouldering" />}
                            label="bouldering"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={endurance} onChange={handleChange} name="endurance" />}
                            label="endurance"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={lead} onChange={handleChange} name="lead" />}
                            label="lead"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={speed} onChange={handleChange} name="speed" />}
                            label="speed"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={outside} onChange={handleChange} name="outside" />}
                            label="outside"
                        />
                    </FormGroup>
                </FormControl>
            </InputLabelBox>
        </>
    )
};

export default CheckBox;