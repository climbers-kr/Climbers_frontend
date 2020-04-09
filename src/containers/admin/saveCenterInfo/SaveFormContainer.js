import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import SaveForm from '../../../components/admin/saveCenterInfo';
import PostCodeModal from '../../../components/admin/saveCenterInfo/PostCodeModal';
import {changeField} from "../../../modules/write";


const SaveFormContainer=({history})=>{
    const [error, setError]=useState(null);
    const dispatch=useDispatch();
    const {location}= useSelector(({saveCenter})=>({
        location: saveCenter.location,

    }));


    const onChangeField=useCallback(e=> {
        console.dir(e);
        console.dir(e.target.value);
        return dispatch(changeField({key: 'location', value: e}));
    }, [
        dispatch,
    ]);



    return(
        <PostCodeModal
            onClick={onChangeField}
        />
    );
};

export default withRouter(SaveFormContainer);