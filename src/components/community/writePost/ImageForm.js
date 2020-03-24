import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import Fab from "@material-ui/core/Fab";
import logo from '../../../images/ClimbersLogo.png';
import AddIcon from '@material-ui/icons/Add';
const PreviewContainer=styled.div`
    display: flex;
    flex-wrap: wrap;
   justify-content: center;
`;
const ImgPreview=styled.img`
    width: 100%;
    height: 100%;
    
`;
const PreviewBox=styled.div`
    width: 150px;
    height: 150px;

`;

const ImgSelector=styled.div`
    width: 150px;
    height: 150px;
    display: flex;
    border-style: dashed; 
    align-items: center;
    justify-content: center;
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
    },
    addIcon: {
        fontSize: '5rem',
    }
}));
const ImageForm=({ isSelected, imgList, onChange })=>{
    const classes = useStyles();
    console.dir(isSelected);
    const url=logo;

    return (
        <>
            { !isSelected ? (
                <div className="form-group">
                    <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={onChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Fab color="primary" aria-label="add" component="span" variant="extended" className={classes.fab} >
                            <InsertPhotoIcon className={classes.extendedIcon}/>
                            사진/동영상
                        </Fab>
                    </label>
                </div>
            ):(
                <PreviewContainer>
                    {imgList.map(object => {
                        const url=URL.createObjectURL(object.file);
                        return (

                            <PreviewBox key={object.id}>
                                <ImgPreview src={url} alt="preview" />
                            </PreviewBox>

                        );
                    })}
                    <label>
                        <ImgSelector>
                            <AddIcon className={classes.addIcon}/>
                        </ImgSelector>
                        <Input type="file" name="imgCollection" multiple onChange={onChange}/>
                    </label>
                </PreviewContainer>
            )}




        </>
    )
};

export default ImageForm;