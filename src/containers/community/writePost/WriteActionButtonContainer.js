import React, {useEffect} from 'react';
import WriteActionButton from '../../../components/community/writePost/WriteActionButton';
import {useSelector, useDispatch} from "react-redux";
import {withRouter} from 'react-router-dom';
import {writePost} from '../../../modules/write';

const WriteActionButtonContainer= ({history}) => {
    const dispatch=useDispatch();
    const { imgList, body, tags, centerTag, category, post, postError}=useSelector(({write})=> ({
        imgList: write.imgQueue.imgList,
        body: write.body,
        tags: write.tags,
        centerTag: write.centerTag,
        category: write.category,
        post: write.post,
        postError: write.postError,
    }));

    const onPublish = (e)=> {
        e.preventDefault();
        dispatch(
            writePost({
                imgList,
                body,
                tags,
                centerTag,
                category,
            }),
        );
    };

    const onCancel=()=> {
        history.goBack();
    };

    useEffect(()=> {
        if(post) {
            history.push('/community');
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