import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Carousel from '../../common/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CenterInfo from './CenterInfo';
import CommunityContainer from "../../../containers/community/CommunityContainer";


const CarouselWrapper=styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    @media(min-width: 600px){
        align-self: start;
        width: 65%;
    }
`;
const PostListBlock=styled.div`
    
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    //background: #4eeb39;
    width: 100%;
    padding: 20px;
    @media(min-width: 600px){
        width: 65%;
        padding: 30px;
        
    }
`;
const StyledTabs=styled(Tabs)`
    //background-color: rgba(255,255,255,0.46);
    margin-bottom: 10px;
    
`;

const StyledTab=styled(Tab)`
    color: rgb(255,255,255);
    
`;
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));


export default function CenterViewer({center, loading, error, children, post}){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
                <CarouselWrapper>
                    {center && <Carousel imgUrlList={center.imgUrlList} />}
                </CarouselWrapper>


                {center && (
                    <CenterInfo center={center}/>
                )}
                <PostListBlock>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='secondary'
                        textColor='secondary'
                        centered
                    >
                        <StyledTab label="문제" />
                        <StyledTab label="피드" />
                        <StyledTab label="후기" />
                    </StyledTabs>
                    <CommunityContainer/>
                </PostListBlock>

        </>
    )
}
