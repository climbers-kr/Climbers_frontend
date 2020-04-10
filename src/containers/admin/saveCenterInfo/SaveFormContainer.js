import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import SaveForm from '../../../components/admin/saveCenterInfo/SaveForm';
import {changeField} from "../../../modules/admin/saveCenter";

const SaveFormContainer=({history})=>{
    const dispatch=useDispatch();
    const {title, location, sites, prices, hasParking}= useSelector(({saveCenter})=>({
        title: saveCenter.title,
        location: saveCenter.location,
        sites: saveCenter.sites,
        prices: saveCenter.prices,
        hasParking: saveCenter.hasParking,
    }));
    useEffect(()=>{
        console.dir(hasParking)
    }, [hasParking])

    const onChangeField=useCallback(e=> {
        return dispatch(changeField({key: e.target.name, value: e.target.value}));
    }, [dispatch]);

    const onChangeArray=useCallback((name, nextTags)=> {
        return dispatch(changeField({key: name, value: nextTags}));
    },[dispatch]);

    const onChangeCheck=useCallback(state=> {

        return dispatch(changeField({key: "facility", value: state}));
    }, [
        dispatch,
    ]);
    return(
        <SaveForm
            title={title}
            location={location}
            sites={sites}
            prices={prices}
            hasParking={hasParking}
            onChangeCheck={onChangeCheck}
            onChangeField={onChangeField}
            onChangeArray={onChangeArray}
        />
    );
};

export default withRouter(SaveFormContainer);