import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import PostViewerContainer from "../../containers/community/readPost/PostViewerContainer";
import PostViewerTemplate from '../../components/community/postViewer/PostViewerTemplate'
import CommentInputContainer from "../../containers/community/readPost/CommentInputContainer";
const PostPage=({match})=>{
    console.log(match.params);
    return (
        <>
            <HeaderContainer/>
            <PostViewerTemplate>
                <CommentInputContainer/>
                <PostViewerContainer/>
            </PostViewerTemplate>
        </>
    );
};

export default PostPage;