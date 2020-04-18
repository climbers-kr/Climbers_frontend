import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listCenters} from '../../modules/home';
import CenterCarousel from '../../components/home/centerSection/CenterCarousel'

const CenterSectionContainer=()=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();

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


    const options = {
        root: containerRef.current,
        //root: null,
        rootMargin: "10px",
        threshold: 0
    };


    return (
        <>
            <CenterCarousel
                loading={centersLoading}
                error={error}
                centers={centers}
                loader={loader}
                containerRef={containerRef}
            />
        </>
    );
};

export default CenterSectionContainer;