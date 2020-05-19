import React from 'react';
import LabelTypography from './molecules/LabelTypography';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

const UserProfileBlock=styled.div`
    display: grid;
    //background: #f4a0ce;
    grid-template-columns: 1fr 1fr;
    width: 95%;
    //margin: 2rem;
    @media(max-width: 450px){
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
    }
`;
const UserInfoBox=styled.div`
    margin: 2rem 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    @media(max-width: 450px){
        margin: 0;
    }
`;
const InfoItemWrapper=styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    //background-color: aqua;
    .chip {
      margin: 0 1rem;
      background: linear-gradient(to bottom, #EAECC6, #2BC0E4);
    }
    .textSkeleton {
        flex: 1;
        height: 30px;
        margin: 0 1rem;
    }
    @media(max-width: 450px){
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;
const UserImageWrapper=styled.div`
     .userImage {
          margin: 4rem auto;
          //padding: 10px;
          width: 150px;
          height: 150px;
          @media(max-width: 450px){
              margin: 1rem auto;
              width: 100px;
              height: 100px;
          }
     }
`;

function UserProfile({userProfile, loading}){
    return (
        <UserProfileBlock>
            { (!userProfile || loading) ? <ProfileSkeleton/> : (
                <>
                    <UserImageWrapper>
                        <Avatar className="userImage" alt="profile-image" src={userProfile.profileImgUrl}/>
                    </UserImageWrapper>
                    <UserInfoBox>
                        <InfoItemWrapper>
                            <Typography variant="h5" component="h1">
                                {userProfile.username}
                            </Typography>
                            <Chip className="chip" size="small" label="Lv.1"/>
                            <Button variant="contained" size="small" color="primary">follow</Button>
                        </InfoItemWrapper>
                        <InfoItemWrapper>
                            <LabelTypography
                                label="게시물"
                                value={userProfile.postCount}
                            />
                            <LabelTypography
                                label="팔로워"
                                value={userProfile.follower.length}
                            />
                            <LabelTypography
                                label="팔로우"
                                value={userProfile.following.length}
                            />
                        </InfoItemWrapper>
                        <Typography variant="subtitle1">
                            {userProfile.name}
                        </Typography>
                    </UserInfoBox>
                </>
            )}

        </UserProfileBlock>
    )
}

function ProfileSkeleton() {
    return (
        <>
            <UserImageWrapper>
                <Skeleton className="userImage" variant="circle" />
            </UserImageWrapper>
            <UserInfoBox>
                <InfoItemWrapper>
                    <Skeleton className="textSkeleton" variant="text" />
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <Skeleton className="textSkeleton" variant="text" />
                    <Skeleton className="textSkeleton" variant="text" />
                    <Skeleton className="textSkeleton" variant="text" />
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <Skeleton className="textSkeleton" variant="text" />
                </InfoItemWrapper>
            </UserInfoBox>
        </>
    )
}

export default UserProfile;