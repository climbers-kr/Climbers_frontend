import React, {useEffect, useCallback} from 'react';
import EditForm from '../../../components/account/edit/EditForm';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { loadProfile, changeField} from "../../../modules/accounts/userProfileEdit";

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

    //로그인 되어 있지 않으면 홈으로
    useEffect(()=>{
        if(user){
            console.dir(user);
            dispatch(loadProfile());
        }else {
            history.push('/');
        }
    }, [dispatch]);


    const onPublish = (e)=> {
        e.preventDefault();
    };

    const onCancel=()=> {
        history.goBack();
    };


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
                username={user && user.username}
                lv={lv}
            />

        </>
    )
};
export default withRouter(EditProfileContainer);