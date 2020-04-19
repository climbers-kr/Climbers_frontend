import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import {readCenter, unloadCenter} from '../../modules/centers/center';
import CenterViewer from '../../components/centers/centerViewer/CenterViewer';

const CenterViewerContainer=({match, history})=>{
    //처음 마운트될 때 포스트 읽기 api 요청
    const { centerId } = match.params;
    const dispatch=useDispatch();
    const {center, error, loading, }=useSelector(({center, loading})=>({
        center: center.center,
        error: center.error,
        loading: loading['center/READ_CENTER'],
    }));

    useEffect(()=>{
        dispatch(readCenter(centerId));
        //언마운트 될 때 리덕스에서 포스트 데이터 없애기
        return ()=>{
            dispatch(unloadCenter());
        };
    }, [dispatch, centerId]);


    return (
        <CenterViewer
            center={center}
            loading={loading}
            error={error}

        />
    );
};

export default withRouter(CenterViewerContainer);