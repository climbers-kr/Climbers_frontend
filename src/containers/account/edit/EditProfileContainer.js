import React, {useEffect, useCallback} from 'react';
import EditForm from '../../../components/account/edit/EditForm'
import {useDispatch, useSelector} from "react-redux";
import { loadProfile, changeField} from "../../../modules/accounts/userProfile";
const EditProfileContainer=()=>{

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

    const dispatch = useDispatch();
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