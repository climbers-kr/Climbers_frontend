import React, {useEffect} from "react";
import WriteTemplate from "../../components/community/writePost/WriteTemplate";
import ImageContainer from "../../containers/community/writePost/ImageContainer";
import TextContainer from "../../containers/community/writePost/TextContainer";
import WriteActionButtonContainer from "../../containers/community/writePost/WriteActionButtonContainer";
import TagBoxContainer from "../../containers/community/writePost/TagBoxContainer";
import {useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';

const WritePage=({history})=>{

    const { user } = useSelector(({ user }) => ({ user: user.user }));
    //Todo: login 페이지 모달 창으로 구현하기
    useEffect(()=>{
        if(!user)
        {
            history.push('/login');
        }
    }, [user]);

    return (
        <WriteTemplate>
            <ImageContainer/>
            <TextContainer/>
            <TagBoxContainer/>
            <WriteActionButtonContainer/>
        </WriteTemplate>
    );
};

export default withRouter(WritePage);