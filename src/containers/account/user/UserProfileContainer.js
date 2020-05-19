import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import {readProfile, unloadProfile} from '../../../modules/accounts/userProfile';
import UserProfile from '../../../components/account/user/UserProfile';

const UserProfileContainer=({match})=>{
    //처음 마운트될 때 프로필 읽기 api 요청
    const { username } = match.params;
    const dispatch=useDispatch();
    const {userProfile, error, loading, }=useSelector(({userProfile, loading})=>({
        userProfile: userProfile.userProfile,
        error: userProfile.profileError,
        loading: loading['userProfile/READ_PROFILE'],
    }));

    useEffect(()=>{
        dispatch(readProfile(username));
        //언마운트 될 때 리덕스에서 프로필 데이터 없애기
        return ()=>{
            dispatch(unloadProfile());
        };
    }, [dispatch, username]);


    return (
        <UserProfile
            userProfile={userProfile}
            loading={loading}
            error={error}
        />
    );
};

export default withRouter(UserProfileContainer);