import UploadContainer from '../../containers/community/UploadContainer';
import React from "react";
import WriteTemplate from "../../components/community/writePost/WriteTemplate";
import WriteContainer from "../../containers/community/writePost/WriteContainer";

const WritePostPage=()=>{
    return (
        <WriteTemplate>
            <WriteContainer/>
        </WriteTemplate>
    );
};


export default WritePostPage;