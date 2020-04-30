import React, {useEffect, useCallback} from 'react';
import EditForm from '../../../components/account/edit/EditForm'
import {useDispatch, useSelector} from "react-redux";
import { loadProfile, changeField} from "../../../modules/accounts/userProfile";
import {writePost} from "../../../modules/write";
const EditProfileContainer=({history})=>{
    const dispatch = useDispatch();
    const {
        user,
        name,
        username,
        lv,
        introduction,
        location
    } = useSelector(({ user, userProfile }) => ({
        user: user.user,
        name: userProfile.name,
        username: userProfile.username,
        lv: userProfile.lv,
        introduction: userProfile.introduction,
        location: userProfile.location,
    }));

    useEffect((user)=>{
        if(user){
            console.dir(user);
            const {_id} = user;
            dispatch(loadProfile(_id));
        }
        //언마운트 될 때 리덕스에서 form 데이터 없애기
        return ()=>{
            //dispatch(unloadPost());
        };
    }, [dispatch]);
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
    //인풋 변경 이벤트 핸들러
    const onChange = useCallback(e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                key: name,
                value
            })
        )
    }, [dispatch]);

    return (
        <>
            <EditForm
                user={user}
                onChange={onChange}
                name={name}
                username={user.username}
                lv={lv}
            />

        </>
    )
};
export default EditProfileContainer;