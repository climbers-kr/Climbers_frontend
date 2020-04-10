import React, {useEffect} from 'react';
import WriteActionButton from '../../../components/community/writePost/WriteActionButton';
import {useSelector, useDispatch} from "react-redux";
import {withRouter} from 'react-router-dom';
import {writePost} from '../../../modules/admin/saveCenter';

const WriteActionButtonContainer= ({history}) => {
    const dispatch=useDispatch();
    const {
        imgUrlList,
        imageSource,
        title,
        location,
        locationDetail,
        locationObject,
        contact,
        sites,
        prices,
        time,
        hasParking,
        facility,
        post,
        postError,
    } = useSelector(({saveCenter}) => ({
        imgUrlList: saveCenter.imgUrlList,
        imageSource: saveCenter.imageSource,
        title: saveCenter.title,
        location: saveCenter.location,
        locationDetail: saveCenter.locationDetail,
        locationObject: saveCenter.locationObject,
        contact: saveCenter.contact,
        sites: saveCenter.sites,
        prices: saveCenter.prices,
        time: saveCenter.time,
        hasParking: saveCenter.hasParking,
        facility: saveCenter.facility,
        post: saveCenter.post,
        postError: saveCenter.postError,
    }));

    const onPublish = (e)=> {
        e.preventDefault();
        dispatch(
            writePost({
                imgUrlList,
                imageSource,
                title,
                location,
                locationDetail,
                locationObject,
                contact,
                sites,
                prices,
                time,
                hasParking,
                facility,
            }),
        );
    };

    const onCancel=()=> {
        history.goBack();
    };

    useEffect(()=> {
        if(post) {
            const {_id, user}=post;
            //history.push(`/@${user.username}/${_id}`);
        }else{
            console.log('no post');
        }
        if(postError){
            console.log(postError);
        }
    }, [history, post, postError]);
    return <WriteActionButton onPublish={onPublish} />;
};

export default withRouter(WriteActionButtonContainer);