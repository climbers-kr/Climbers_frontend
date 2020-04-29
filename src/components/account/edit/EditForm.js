import React from 'react';
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'skyblue',
        width: '100%',
    },
    form: {
        width: '90%',
    },
    label:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    }
}));


const InputLabelBox=styled.label`
    display: grid;
    grid-template-columns: 1fr 2fr;
    //background: #ebb263;
    width: 100%;
    align-items: center;
    
    h3{
      //background: red;
      text-align: right;
      margin-right: 1rem;
    }
`;

const SelectBox=({ name, value, label, onChange, list})=>{
    const [selectedValue, setSelectedValue] = React.useState(value);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event)
    };
    return (
        <>
            <InputLabelBox>
                <h3>{label}</h3>
                    <Select
                        value={selectedValue}
                        onChange={handleChange}
                        name={name}
                    >
                        {list.map(item=> (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    </Select>
            </InputLabelBox>
        </>
    )
};
const LabelTextField=({ name, value, label, onChange, disabled})=>{
    return (
        <>
            <InputLabelBox>
                <h3>{label}</h3>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name={name}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                />
            </InputLabelBox>
        </>
    )
};

const EditForm=({onChange, form, onSubmit, profileInfo, username, lv})=>{
    const classes = useStyles();

    const selectListSex=["남성", "여성", "기타", "비공개"];
    const selectListLv=["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "pro"];
    return (
        <>
            <div className={classes.paper}>

                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <LabelTextField
                        label="이름"
                        name="name"
                        onChange={onChange}
                    />
                    <LabelTextField
                        label="사용자 이름"
                        name="username"
                        onChange={onChange}
                        disabled={true}
                        value={username}
                    />
                    <LabelTextField
                        label="전화번호"
                        name="phone"
                        onChange={onChange}
                    />

                    <SelectBox
                        label="성별"
                        name="sex"
                        onChange={onChange}
                        list={selectListSex}
                        value={lv}
                    />
                    <SelectBox
                        label="레벨"
                        name="lv"
                        onChange={onChange}
                        list={selectListLv}
                        value={lv}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        완료
                    </Button>
                </form>
            </div>
        </>
    );
};
export default EditForm;