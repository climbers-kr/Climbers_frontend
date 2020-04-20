import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Carousel from '../../common/Carousel';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import Collapse from '@material-ui/core/Collapse';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CallIcon from '@material-ui/icons/Call';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined';
const Responsive=styled.div`
    display: flex;
    background-color: black;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media(min-width: 960px) {
      width: 80%;
    }
    @media(min-width: 1280px) {
      max-width: 1024px;
    }
`;
const CenterViewerBlock=styled(Responsive)`
    width: 100%;
   
    overflow: no-content;
    margin: 4rem auto 0 auto;
    background-color: #315ced;
    //max-height: 40vw;
    @media(max-width: 600px){
      flex-direction: column;
     
      margin-top: 3rem;
    }
   
`;
const CenterInfoBlock=styled.div`

    padding: 0 10px 0 10px;
    width: 30%;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    background: #eb679d;
    border-radius: 20px;
    @media(min-width: 600px){
        align-self: start;
    }
    //margin: 10px;
`;
const CarouselWrapper=styled.div`
border-radius: 10px;
overflow: hidden;
    flex: 2;
    width: 100%;
    @media(min-width: 600px){
        align-self: start;
    }
`;

const PriceExpansion=styled.div`
    display: flex;
    flex-direction: row;
    
`;
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        //background: 'red',
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    title: {
        fontSize: 'large',
        fontWeight: 'bold',
    },
    textWrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    priceList:{
        alignSelf: 'end'
    },
    siteList: {
        display: 'flex',
        flexDirection: 'column',
    },
    memberAvatar: {
        marginBottom: '10px',
        marginLeft: '10px',
    },
}));


export default function CenterViewer({center, loading, error, children}){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
            <CenterViewerBlock>
                <CarouselWrapper>
                    {center && <Carousel imgUrlList={center.imgUrlList} />}
                </CarouselWrapper>
                {center && (
                    <CenterInfoBlock>
                        <p className={classes.title}>{center.title}</p>

                        <div className={classes.textWrapper}>
                            <LocationOnIcon className={classes.icon}/>
                            <p>{ center.location}</p>
                        </div>
                        <div className={classes.textWrapper}>
                            <CallIcon className={classes.icon}/>
                            <p>{ center.contact}</p>
                        </div>
                        <div className={classes.textWrapper}>
                            <HomeOutlinedIcon className={classes.icon}/>
                            <div className={classes.siteList}>
                                { center.sites.map((site, index)=>(
                                    <a key={index} href={site} >
                                        {site}
                                    </a>
                                ))}
                                { center.sites.map((site, index)=>(
                                    <a key={index} href={site}>
                                        {site}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className={classes.textWrapper}>
                            <EventNoteOutlinedIcon className={classes.icon}/>

                            <p>가격</p>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>

                        </div>
                        <Collapse className={classes.priceList} in={expanded} timeout="auto" unmountOnExit>
                            <ul>
                                { center.prices.map((price, index)=>(
                                    <li key={price._id}>
                                        {`${price.period}: ${price.price}`}
                                    </li>
                                ))}
                            </ul>
                        </Collapse>
                        <div className={classes.textWrapper}>
                            <AccessibilityNewOutlinedIcon className={classes.icon}/>
                            <p>멤버</p>
                        </div>

                        <AvatarGroup className={classes.memberAvatar} max={3}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </AvatarGroup>
                    </CenterInfoBlock>
                )}

            </CenterViewerBlock>
    )
}
