import React, {useEffect, useState} from 'react';
import ImageForm from '../../../components/community/writePost/ImageForm';
import PostForm from '../../../components/community/writePost/PostForm';
import {useDispatch, useSelector} from "react-redux";
import {selectImage, submitImageList} from "../../../modules/upload";

const WriteContainer=()=>{


    const { isSelected, imgList, imgCount, curOrder } = useSelector(({ upload }) => ({
        isSelected: upload.isSelected,
        imgList: upload.queue.imgList, //type: Array [{file: File}]
        imgCount: upload.queue.imgCount,
        curOrder: upload.queue.curOrder,
    }));

    const dispatch = useDispatch();


    useEffect(() => {
        console.dir(isSelected);
        console.dir(imgList);
        console.dir(imgCount);
        console.dir(curOrder);
    }, [isSelected,imgList, imgCount, curOrder]);



    const onFileChange = e=> {
        const fileObject= e.target.files[0]; //type: File
        console.dir(fileObject);

        dispatch(
            selectImage({
                file: e.target.files[0],
                id: imgCount,
            })
        );
    };

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(
            submitImageList({imgCount, curOrder, imgList})
        )
    };
    return (
        <>
            <ImageForm
                isSelected={isSelected}
                onChange={onFileChange}
                imgList={imgList}
            />
            <PostForm
                onSubmit={onSubmit}
            />
        </>
    )
};
export default WriteContainer;