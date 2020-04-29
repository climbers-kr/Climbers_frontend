import React, {useEffect} from 'react';
import ImageSelector from '../../../components/account/edit/ImageSelector';
import {useDispatch, useSelector} from "react-redux";
import {selectImage, loadProfile} from "../../../modules/accounts/userProfile";

const ImageSelectorContainer=()=>{

    const {
        user,
        imgQueue,
        selectedImg,
        imageToUpload
    } = useSelector(({ user, userProfile }) => ({
        user: user.user,
        imgQueue: userProfile.imgQueue,
        selectedImg: userProfile.imgQueue.selectedImg, //type: Array [{file: File, id: number, done: boolean}]
        imageToUpload: userProfile.imgQueue.imageToUpload,
    }));

    const dispatch = useDispatch();
    useEffect(()=>{
        if(user){
            const {_id} = user;
            dispatch(loadProfile(_id));
        }

        //언마운트 될 때 리덕스에서 form 데이터 없애기
        return ()=>{
            //dispatch(unloadPost());
        };
    }, [dispatch, user]);


    const onFileChange = e => {
        console.dir(e.target.files);
        dispatch(
            selectImage({
                file: e.target.files[0], //type: File
            })
        );
    };

    return (
        <>
            <ImageSelector
                imgQueue={imgQueue}
                onChange={onFileChange}
            />

        </>
    )
};
export default ImageSelectorContainer;