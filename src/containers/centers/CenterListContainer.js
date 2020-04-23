import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {listCenters, scrollBottom} from '../../modules/centers/centerList';
import CenterList from '../../components/centers/centerList/CenterList';

const CenterListContainer=({location})=> {
    const dispatch=useDispatch();
    const loader=useRef();
    const containerRef=useRef();
    const currentPage=useRef(1);
    const {centers, error, centersLoading, user, moreCentersLoading, page}=useSelector(
        ({ centerList, loading, user })=> ({
            centers: centerList.centers,
            error: centerList.error,
            centersLoading: loading['centerList/LIST_CENTERS'],
            user: user.user,
            moreCentersLoading: loading['centerList/READ_MORE'],
            page: centerList.page,
        }),
    );

    useEffect(()=> {
        const {sido, sigungu, page}=qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        currentPage.current=parseInt(page || '1', 10);
        dispatch(listCenters({sido, sigungu, page}));
    }, [dispatch, location.search]);

    useEffect(()=>{
        console.log('current page state: ', page);
    }, [page]);

    const options = {
        root: containerRef.current,
        //root: null,
        rootMargin: "10px",
        threshold: 0
    };


    useEffect(()=>{
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 관찰 대상이 viewport 안에 들어온 경우 image 로드
                if (entry.isIntersecting) {
                    console.log(entry);

                    const {tag, username}=qs.parse(location.search, {
                        ignoreQueryPrefix: true,
                    });
                    dispatch(scrollBottom({tag, username})); //page는 redux 내부에서 state 참조함
                }
            })
        }, options);

        io.observe(loader.current);
        //return io.unobserve(loader.current);
    }, [dispatch]);

    return (
        <>
            <CenterList
                initialLoading={centersLoading}
                readMoreLoading={moreCentersLoading}
                error={error}
                centers={centers}
                showWriteButton={user}
                loader={loader}
                containerRef={containerRef}

            />
        </>


    );
};

export default withRouter(CenterListContainer);