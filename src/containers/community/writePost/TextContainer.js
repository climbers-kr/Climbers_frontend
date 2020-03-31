import React, {useEffect, useCallback} from 'react';
import TextForm from '../../../components/community/writePost/TextForm';
import {useDispatch, useSelector} from "react-redux";
import {changeField, initialize} from "../../../modules/write";

const TextContainer=()=>{
    const dispatch = useDispatch();
    const { body } = useSelector(({ write }) => ({
        body: write.body,
    }));

    const onChangeField=useCallback(e=> {
        console.dir(e);
        console.dir(e.target.value);
        return dispatch(changeField({key: 'body', value: e.target.value}));
    }, [
        dispatch,
    ]);


    //언마운트 될 때 초기화
    useEffect(()=> {
        return() => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return (
        <>
            <TextForm onChangeField={onChangeField} body={body} />
        </>
    )
};
export default TextContainer;