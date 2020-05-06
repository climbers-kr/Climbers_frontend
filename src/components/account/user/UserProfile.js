import React from 'react';
import LabelTypography from './molecules/LabelTypography';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const UserProfileBlock=styled.div`
    display: grid;
    background: #f4f4f4;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    //margin: 2rem;
`;
const UserInfoBox=styled.div`
    margin: 2rem 0;
    //background: #f48bf4;
    display: flex;
    flex-direction: column;
`;
const InfoItemWrapper=styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    .chip {
      margin: 0 1rem;
      background: linear-gradient(to bottom, #EAECC6, #2BC0E4);
    }
`;
const UserImage=styled(Avatar)`
    margin: 4rem auto;
    //padding: 10px;
    width: 150px;
    height: 150px;
    @media(max-width: 600px){
        width: 70px;
        height: 70px;
    }
`;

function UserProfile({user}){
    return (
        <UserProfileBlock>
            <UserImage/>
            <UserInfoBox>
                <InfoItemWrapper>
                    <Typography variant="h5" component="h1">
                        Username
                    </Typography>
                    <Chip className="chip" size="small" label="Lv.1"/>
                    <Button variant="contained" size="small" color="primary">follow</Button>
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <LabelTypography
                        label="게시물"
                        value="some"
                    />
                    <LabelTypography
                        label="팔로워"
                        value="some"
                    />
                    <LabelTypography
                        label="팔로우"
                        value="some"
                    />
                </InfoItemWrapper>
                <Typography variant="subtitle1">
                    Name
                </Typography>
            </UserInfoBox>
        </UserProfileBlock>
    )
}

export default UserProfile;