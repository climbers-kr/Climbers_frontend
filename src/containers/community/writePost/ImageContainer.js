import React, {useEffect} from 'react';
import ImageForm from '../../../components/community/writePost/ImageForm';
import {useDispatch, useSelector} from "react-redux";
import {selectImage} from "../../../modules/write";

const ImageContainer=()=>{


    const { hasImages, imgList, imgCount } = useSelector(({ write }) => ({
        hasImages: write.hasImages,
        imgList: write.imgQueue.imgList, //type: Array [{file: File, id: number, done: boolean}]
        imgCount: write.imgQueue.imgCount,
    }));

    const dispatch = useDispatch();

    useEffect(()=>{
        console.dir(imgList);
    }, [imgList]);

    const onFileChange = e => {
        console.dir(e.target.files);
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