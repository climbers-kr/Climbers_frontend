import React from 'react';
import HeaderContainer from "../../containers/common/HeaderContainer";
import PostViewerContainer from "../../containers/community/readPost/PostViewerContainer";
import PostViewerTemplate from '../../components/community/postViewer/PostViewerTemplate'
import PostCommentContainer from "../../containers/community/readPost/PostCommentContainer";
const PostPage=({match})=>{
    console.log(match.params);
    return (
        <>
            <HeaderContainer/>
            <PostViewerTemplate>
                <PostCommentContainer/>
                <PostViewerContainer/>
            </PostViewerTemplate>
        </>
    );
};

export default PostPage;