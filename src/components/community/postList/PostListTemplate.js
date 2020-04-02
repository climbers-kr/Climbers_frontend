import React from 'react';
import styled from 'styled-components';
import { device } from "../../common/device";
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const PostListTemplateBlock=styled.div`
    
    
    @media(min-width: 425px) {
      background-color: red;
    }
    
    @media(min-width: 800px) {
      background-color: darkblue;
        .test{
          visibility: hidden;
        }
    }
`;
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const SeletorForMobile=()=>{
    const matches = useMediaQuery('(max-width:600px)');
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    //classes.formControl
    return (
        <>
        {matches && <p>good</p>}
        <FormControl variant="outlined" className={classNames(classes.formControl, "test")}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Age"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        </>
    )
}

const PostListTemplate=()=>{
    return (
        <PostListTemplateBlock>
            <SeletorForMobile/>
        </PostListTemplateBlock>
    )
};

export default  PostListTemplate;