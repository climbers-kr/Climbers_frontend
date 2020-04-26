import React, {useCallback, useEffect} from 'react';
import CategorySelector from '../../../components/community/writePost/CategorySelector';
import {useDispatch, useSelector} from "react-redux";
import {selectImage} from "../../../modules/write";
import {changeField} from "../../../modules/write";

const CategorySeletorContainer=()=>{


    const { category, imgList, imgCount } = useSelector(({ write }) => ({
        category: write.category,
        imgList: write.imgQueue.imgList, //type: Array [{file: File, id: number, done: boolean}]
        imgCount: write.imgQueue.imgCount,
    }));

    const dispatch = useDispatch();

    const onChangeField=useCallback(e=> {
        return dispatch(changeField({key: 'category', value: e.target.value}));
    }, [dispatch]);


    return (
        <>
            <CategorySelector
                onChange={onChangeField}
                category={category}
            />

        </>
    )
};
export default CategorySeletorContainer;