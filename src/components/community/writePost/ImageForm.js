import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Fab from "@material-ui/core/Fab";

const ImgPreview=styled.img`
    width: 300px;
    height: 300px;
    
`;

const Input=styled.input`
    overflow: hidden;
    width: 0;
    height: 0;
`;
const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',

    },
    tabBox:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10rem',
        marginTop:'10rem',
    },
    tabs: {

        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'yellow',

    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab:{
        margin: '0.5rem',
    }
}));
const ImageForm=({IsSelected, previewUrlArray, onChange})=>{
    const classes = useStyles();
    return (
        <>
            <div className="form-group">
                <form>
                <label>
                    <Fab color="primary" aria-label="add" variant="extended" className={classes.fab}>
                        <AddIcon className={classes.extendedIcon}/>
                        새 게시글
                    </Fab>
                    <Input type="file" name="imgCollection" multiple onChange={onChange}/>
                </label>
                </form>
            </div>
        </>
    )
};

export default ImageForm;