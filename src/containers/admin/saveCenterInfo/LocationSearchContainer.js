import React, {useEffect, useCallback} from 'react';
import PostCodeModal from '../../../components/admin/saveCenterInfo/PostCodeModal';
import {useDispatch, useSelector} from "react-redux";
import {changeField, initialize, setLocation} from "../../../modules/admin/saveCenter";

const LocationSearchContainer=()=>{
    const dispatch = useDispatch();
    /*
    const { body } = useSelector(({ write }) => ({
        body: write.body,
    }));*/

    const onSelectLocation=useCallback(object=> {
        console.dir(object);
        //console.dir(e.target.value);
        return dispatch(setLocation({ data: object }));
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
            <PostCodeModal onSelectLocation={onSelectLocation} />
        </>
    )
};
export default LocationSearchContainer;