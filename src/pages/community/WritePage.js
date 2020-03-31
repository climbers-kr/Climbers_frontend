import React from "react";
import WriteTemplate from "../../components/community/writePost/WriteTemplate";
import ImageContainer from "../../containers/community/writePost/ImageContainer";
import TextContainer from "../../containers/community/writePost/TextContainer";
import WriteActionButtonContainer from "../../containers/community/writePost/WriteActionButtonContainer";
import TagBoxContainer from "../../containers/community/writePost/TagBoxContainer";
const WritePage=()=>{
    return (
        <WriteTemplate>
            <ImageContainer/>
            <TextContainer/>
            <TagBoxContainer/>
            <WriteActionButtonContainer/>
        </WriteTemplate>
    );
};


export default WritePage;