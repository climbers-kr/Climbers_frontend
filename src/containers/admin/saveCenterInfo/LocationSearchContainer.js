import React, {useEffect, useCallback} from 'react';
import LocationSearchForm from '../../../components/admin/saveCenterInfo/LocationSearchForm';
import {useDispatch, useSelector} from "react-redux";
import {changeField, initialize, setLocation} from "../../../modules/admin/saveCenter";
const LocationSearchContainer=()=>{
    const dispatch = useDispatch();
    const {location, locationDetail}= useSelector(({saveCenter})=>({
        location: saveCenter.location,
        locationDetail: saveCenter.locationDetail,
    }));

    const onSelectLocation=useCallback(object=> {
        return dispatch(setLocation({ data: object }));
    }, [
        dispatch,
    ]);

    const onChangeField=useCallback(e=> {
        return dispatch(changeField({key: e.target.name, value: e.target.value}));
    }, [dispatch]);

    //언마운트 될 때 초기화
    useEffect(()=> {
        return() => {
            dispatch(initialize());
        };
    }, [dispatch]);

    return (
        <>
            <LocationSearchForm
                onSelectLocation={onSelectLocation}
                location={location}
                onChangeField={onChangeField}
                locationDetail={locationDetail}
            />
        </>
    )
};

export default LocationSearchContainer;