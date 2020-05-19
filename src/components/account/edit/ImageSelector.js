import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Avatar from "@material-ui/core/Avatar";
import SelectProfileModal from './SelectProfileModal';

const StyledLabel=styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top : 4px;
`;
const StyledInput=styled.input`
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
const ErrorMessage=styled.p`
    color: red;
`;

const ImageSelector=({onChange,imgQueue, profileImgUrl, error, form, onSubmit, onSelectImageCancel})=>{
    const [modal, setModal]=React.useState(false);
    useEffect(()=>{
        if(imgQueue.selectedImg){
            setModal(true);
        }else{
            setModal(false);
        }
    }, [imgQueue])

    const onCancel=()=>{
        onSelectImageCancel();
        setModal(false);
    };
    return (
        <>
            { imgQueue.selectError && <ErrorMessage>5MB 이하의 jpg, jpeg, png, gif 파일만 가능합니다.</ErrorMessage> }
            <StyledLabel>
                <UserImage alt="profile-image" src={profileImgUrl} />
                <p>프로필 사진 변경</p>
                <StyledInput
                    accept="image/*"
                    type="file"
                    name="imgCollection"
                    onChange={onChange}
                />
            </StyledLabel>
            <SelectProfileModal
                visible={modal}
                onCancel={onCancel}
                selectedImg={imgQueue.selectedImg}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default ImageSelector;