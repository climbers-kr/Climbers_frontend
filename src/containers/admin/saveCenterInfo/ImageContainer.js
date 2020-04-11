import React, {useEffect} from 'react';
import ImageForm from '../../../components/admin/saveCenterInfo/ImageForm';
import {useDispatch, useSelector} from "react-redux";
import {selectImage} from "../../../modules/admin/saveCenter";

const ImageContainer=()=>{
    const { hasImages, imgList, imgCount } = useSelector(({ saveCenter }) => ({
        hasImages: saveCenter.hasImages,
        imgList: saveCenter.imgQueue.imgList, //type: Array [{file: File, id: number, done: boolean}]
        imgCount: saveCenter.imgQueue.imgCount,
    }));

    const dispatch = useDispatch();

    useEffect(()=>{
        console.dir(imgList);
    }, [imgList]);

    const onFileChange = e => {
        dispatch(
            selectImage({
                file: e.target.files[0], //type: File
                id: imgCount,
                done: false,
            })
        );
    };

    return (
        <>
            <ImageForm
                hasImages={hasImages}
                onChange={onFileChange}
                imgList={imgList}
            />

        </>
    )
};
export default ImageContainer;