import React from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
const CategorySelectorBlock=styled.div`
    margin: 10px 0;
`

const StyledFormControl=styled(FormControl)`
    //background: #61dafb;
    //margin: 1rem;
    //height: 20px;
    width: 200px;
    //border: #61dafb;
`;


const CategorySelector=({ name, value, category, onChange})=>{
    const classes = useStyles();
    //const [category, setcategory] = React.useState('');
    const handleChange = (e) => {
        //setcategory(event.target.value);
        onChange(e);
    };
    return (
        <CategorySelectorBlock>
            <StyledFormControl variant="outlined" size="small">
                <InputLabel id="simple-select-outlined-label">Category</InputLabel>
                <Select
                    value={category}
                    onChange={handleChange}
                    label="Category"
                >
                    <MenuItem value="일상">일상</MenuItem>
                    <MenuItem value="정보">정보</MenuItem>
                    <MenuItem value="문제">문제</MenuItem>
                    <MenuItem value="유머">유머</MenuItem>
                </Select>
            </StyledFormControl>
        </CategorySelectorBlock>
    )

};

export default CategorySelector;