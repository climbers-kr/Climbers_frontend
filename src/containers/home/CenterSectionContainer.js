import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listCenters} from '../../modules/home';
import CenterCarousel from '../../components/home/centerSection/CenterCarousel'

const CenterSectionContainer=()=> {
    const dispatch=useDispatch();

    const {centers, error, centersLoading, sido, sigungu}=useSelector(
        ({ home, loading })=> ({
            centers: home.centers,
            error: home.centerError,
            sido: home.sido,
            sigungu: home.sigungu,
            centersLoading: loading['home/LIST_CENTERS'],
        }),
    );

    useEffect(()=> {
        const page=parseInt( '1', 10);
        dispatch(listCenters({sido, sigungu, page}));
    }, [dispatch]);


    return (
        <>
            <CenterCarousel
                loading={centersLoading}
                error={error}
                centers={centers}
            />
        </>
    );
};

export default CenterSectionContainer;