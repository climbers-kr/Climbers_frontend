import React, {useEffect} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../images/ClimbersLogo.png';
import {Link} from "react-router-dom";
import LinkWrapperButton from './LinkedButton';
import Done from "@material-ui/core/SvgIcon/SvgIcon";

const FullScreen=styled.div`
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.38);
    display: flex;
    
    justify-content: center;
    align-items: center;
`;
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
const ModalBlock=styled.div`
    width: 320px;
    @media(max-width: 400px){
        width: 80%;
    }
    
    background: #2BC0E4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #EAECC6, #2BC0E4);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #EAECC6, #2BC0E4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
   .LogoImage{
      width: 150px;
   }
   .button{
      margin: 10px;
      color: black;
      background: white;
   }
   h2{
    font-size: medium;
   }
    
`;
const AskModalBlockWrapper=styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledIconButton=styled(IconButton)`
    align-self: flex-end;
    color: white;
`;
const SelectProfileModal=({
                    visible,
                    onCancel,
                })=>{
    if(!visible) return null;
    const onBlockClick=(e)=>{
        e.stopPropagation();
    }
    return (
        <FullScreen onClick={onCancel}>
            <AskModalBlockWrapper>
                <StyledIconButton onClick={onCancel}>
                    <CloseIcon/>
                </StyledIconButton>
                <ModalBlock onClick={onBlockClick}>
                    <Link to="/"><img src={logo} className="LogoImage" alt="logo" /></Link>
                    <h2>로그인이 필요한 기능입니다</h2>
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
                    <LinkWrapperButton
                        className="button"
                        to='/login'
                        variant="contained"

                        fullWidth
                    >
                        로그인
                    </LinkWrapperButton>
                    <LinkWrapperButton
                        className="button"
                        to='/register'
                        variant="contained"

                        fullWidth
                    >
                        회원가입
                    </LinkWrapperButton>

                </ModalBlock>
            </AskModalBlockWrapper>
        </FullScreen>
    );
};
export default SelectProfileModal;