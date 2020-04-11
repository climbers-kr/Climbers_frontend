import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';

const PreviewBox=styled.div`
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow-x: auto;
    width: 100%;
    & > * {
      flex: 0 0 auto;
    }
`;

const PreviewItem=styled.div`
    width: 150px;
    height: 150px;
    position: relative;
    margin: 3px;
`;
const ImgFilter=styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 2;
    position: absolute;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ImgPreview=styled.img`
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    position: absolute;
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
    position: absolute;
    top: 0;
`;
const useStyles = makeStyles(theme => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    doneIcon: {
        color: 'white',
        zIndex: 3,
        fontSize: '5rem',

    },
    fab:{
        margin: '0.5rem',
    },
    addIcon: {
        fontSize: '5rem',
    }
}));
const ImageForm=({ hasImages, imgList, onChange })=>{
    const classes = useStyles();
    const previewBoxRef=useRef();

    useEffect(()=>{
        //이미지 추가 시 horizontal scroll 위치 맨 오른쪽으로 이동
        if(previewBoxRef.current && hasImages){
            const width=previewBoxRef.current.scrollWidth;
            console.dir(width);
            previewBoxRef.current.scrollLeft=width;
        }
    }, [imgList]);

    return (
        <>
            { !hasImages ? (
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
                <PreviewBox ref={previewBoxRef}>
                    {imgList.map(object => {
                        const url=URL.createObjectURL(object.file);
                        return (
                            <PreviewItem key={object.id}>
                                {object.done ? (
                                    <ImgFilter>
                                        <Done className={classes.doneIcon}/>
                                    </ImgFilter>
                                ): (undefined)}

                                <ImgPreview src={url} alt="preview" />
                            </PreviewItem>
                        );
                    })}
                    <PreviewItem>
                        <label>
                            <ImgSelector>
                                <AddIcon className={classes.addIcon}/>
                            </ImgSelector>
                            <Input
                                accept="image/*"
                                type="file"
                                name="imgCollection"
                                multiple onChange={onChange}
                            />
                        </label>
                    </PreviewItem>
                </PreviewBox>
            )}
        </>
    )
};

export default ImageForm;