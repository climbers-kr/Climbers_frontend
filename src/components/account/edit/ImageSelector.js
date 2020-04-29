import React from 'react';
import styled from 'styled-components';
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";


const Input=styled.input`
    overflow: hidden;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
`;


const UserImage=styled(Avatar)`
    width: 100px;
    height: 100px;
    @media(max-width: 600px){
        width: 70px;
        height: 70px;
    }
`;
const FormTemplate=styled.div`
    display: flex;
    position: absolute;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    @media(max-width: 600px){
        width: 95%;
    }
`;

const useStyles = makeStyles(theme => ({
    avatar: {
        width: '100px',
        height: '100px',
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    }
}));




const ImageSelector=({onChange, form, onSubmit})=>{
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <>
                <label className={classes.label}>
                    <UserImage  alt="profile-image"  />
                    <p>프로필 사진 바꾸기</p>
                    <Input
                        accept="image/*"
                        type="file"
                        name="imgCollection"
                        onChange={onChange}
                    />
                </label>
            </>
        </>
    );
};

export default ImageSelector;