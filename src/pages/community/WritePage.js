import React from "react";
import WriteTemplate from "../../components/community/writePost/WriteTemplate";
import ImageContainer from "../../containers/community/writePost/ImageContainer";
import TextContainer from "../../containers/community/writePost/TextContainer";
import WriteActionButtonContainer from "../../containers/community/writePost/WriteActionButtonContainer";
const WritePage=()=>{
    return (
        <WriteTemplate>
            <ImageContainer/>
            <TextContainer/>
            <WriteActionButtonContainer/>
        </WriteTemplate>
    );
};


export default WritePage;