import React, {useEffect} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";

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
const ModalHeader=styled.div`
    border-bottom: 0.1px solid #ffffff;
    width: 100%;
    text-align: center;
    //margin-bottom: 1rem;
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
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
   .button{
      margin: 10px;
      color: black;
      background: white;
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
const UserImage=styled(Avatar)`
    width: 100px;
    height: 100px;
    margin: 1rem;
    @media(max-width: 600px){
        width: 70px;
        height: 70px;
    }
`;
const SelectProfileModal=({ visible, selectedImg, onSubmit, onCancel })=>{
    if(!visible || !selectedImg) return null;
    const onBlockClick=(e)=>{
        e.stopPropagation();
    };
    const onCloseIconClick=(e)=>{
        e.stopPropagation();
        onCancel();
    };
    const url=URL.createObjectURL(selectedImg);
    return (
        <FullScreen onClick={onCancel}>
            <AskModalBlockWrapper>
                <StyledIconButton onClick={onCloseIconClick}>
                    <CloseIcon/>
                </StyledIconButton>
                <ModalBlock onClick={onBlockClick}>
                    <ModalHeader>
                        <p>새 프로필 사진</p>
                    </ModalHeader>
                    <UserImage  alt="profile-image" src={url} />
                    <Button
                        className="button"
                        onClick={onSubmit}
                        variant="contained"
                    >
                        완료
                    </Button>
                </ModalBlock>
            </AskModalBlockWrapper>
        </FullScreen>
    );
};
export default SelectProfileModal;