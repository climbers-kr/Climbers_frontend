import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import SaveForm from '../../../components/admin/saveCenterInfo/SaveForm';
import PostCodeModal from '../../../components/admin/saveCenterInfo/PostCodeModal';
import {changeField} from "../../../modules/admin/saveCenter";


const SaveFormContainer=({history})=>{
    const [error, setError]=useState(null);
    const dispatch=useDispatch();
    const {location, sites, prices}= useSelector(({saveCenter})=>({
        sites: saveCenter.sites,
        prices: saveCenter.prices,


    }));

    const onChangeSites=nextTags=>{
        dispatch(
            changeField({
                key: 'sites',
                value: nextTags,
            }),
        );
    };
    const onChangePricess=nextTags=>{
        dispatch(
            changeField({
                key: 'prices',
                value: nextTags,
            }),
        );
    };
    const onChangeField=useCallback(e=> {
        console.dir(e);
        console.dir(e.target.value);
        return dispatch(changeField({key: 'location', value: e}));
    }, [
        dispatch,
    ]);



    return(
        <SaveForm
            onChangeSites={onChangeSites}
            onChangePricess={onChangePricess}
            sites={sites}
            prices={prices}
        />
    );
};

export default withRouter(SaveFormContainer);