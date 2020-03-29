import React, {useEffect, useState} from 'react';
import TextForm from '../../../components/community/writePost/TextForm';
import {useDispatch, useSelector} from "react-redux";
import {selectImage, submitImageList} from "../../../modules/upload";

const TextContainer=()=>{


    const { body } = useSelector(({ write }) => ({
        body: write.body,
    }));

    const dispatch = useDispatch();

    useEffect(()=>{
        console.dir(body);
    }, [body]);


    return (
        <>
            <TextForm/>
        </>
    )
};
export default TextContainer;