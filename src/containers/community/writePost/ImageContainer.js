import React, {useEffect, useState} from 'react';
import ImageForm from '../../../components/community/writePost/ImageForm';
import PostForm from '../../../components/community/writePost/PostForm';
import {useDispatch, useSelector} from "react-redux";
import {selectImage, submitImageList} from "../../../modules/upload";

const ImageContainer=()=>{


    const { hasImages, imgList, imgCount, curOrder } = useSelector(({ upload }) => ({
        hasImages: upload.hasImages,
        imgList: upload.queue.imgList, //type: Array [{file: File}]
        imgCount: upload.queue.imgCount,
        curOrder: upload.queue.curOrder,
    }));

    const dispatch = useDispatch();

    useEffect(()=>{
        console.dir(imgList);
    }, [imgList]);

    const onFileChange = e => {
        console.log("onFileChange called");
        const fileObject= e.target.files[0]; //type: File
        console.dir(fileObject);

        dispatch(
            selectImage({
                file: e.target.files[0],
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