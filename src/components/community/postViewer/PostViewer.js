import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Carousel from '../common/Carousel';
import styled from "styled-components";

const PostViewerBlock=styled.div`
    margin-top: 4rem;
`;
const StyledCardHeader=styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px 0 10px;
    @media(min-width: 800px){
        width: 50%;
    }
`;
const CarouselWrapper=styled.div`
    width: 100%;
    background: #000000;
    @media(min-width: 800px){
    display: flex;
    align-items: center;
        width: 50%;
        height: 100%;
    }
`;
const IconButtonBlock=styled.div`
    width: 100%;
    @media(min-width: 800px){
        width: 50%;
    }
`;
const StyledCardContent=styled.div`
    width: 100%;
    @media(min-width: 800px){
        width: 50%;
        flex:1;
    }
`;
const CommentsListBlock=styled.div`
    width: 100%;
    @media(min-width: 800px){
        width: 50%;
        flex:1;
    }
   
`;
const HeaderTextBox=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
`;
const HeaderText=styled.p`
    font-size: small;
    padding: 0;
    margin: 0;
`;
const IconWrapper=styled.div`
    flex:1;
    display: flex;
    justify-content: flex-end;
    
`;
const StyledAvatar=styled(Avatar)`
    margin: 10px;
`;
export default function PostViewer({post, children, loading, error}) {

    //에러 발생 시
    if(error){
        if(error.response && error.response.status === 404){
            return <PostViewerBlock>존재하지 않는 포스트 입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>;
    }

    //로딩 중이거나 아직 포스트 데이터가 없을 때
    if(loading || !post){
        return null;
    }
    const { publishedDate, user, tags, imgUrlList, body, _id}=post;
    return (
        <>
            <StyledCardHeader>
                <StyledAvatar aria-label="recipe">
                    R
                </StyledAvatar>
                <HeaderTextBox>
                    <HeaderText>{user.username}</HeaderText>
                    <HeaderText>{new Date(publishedDate).toLocaleDateString()}</HeaderText>
                </HeaderTextBox>
                <IconWrapper>
                    <MoreVertIcon/>
                </IconWrapper>
            </StyledCardHeader>

            <StyledCardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </StyledCardContent>
            <CommentsListBlock>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CommentsListBlock>
            <IconButtonBlock>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </IconButtonBlock>
            { imgUrlList.length > 0 && (
                <CarouselWrapper>
                    <Carousel
                        imgUrlList={imgUrlList}
                        title="Paella dish"
                    />
                </CarouselWrapper>
            )}
        </>
    );
}