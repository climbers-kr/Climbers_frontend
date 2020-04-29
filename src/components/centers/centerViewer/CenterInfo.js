import React from 'react';
import styled from 'styled-components';
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

const CenterInfoBlock=styled.div`

    padding: 0 10px 0 10px;
    display: flex;
    flex-direction: column;
    
    background: white;
    border-radius: 20px;
    @media(max-width: 600px){
        width: 90%;
        margin-top: 15px;
    }
    @media(min-width: 600px){
        align-self: flex-start;
        width: calc(35% - 10px);
        position: -webkit-sticky; /* 사파리 브라우저 지원 */
        position: sticky;
        right: 0; /* ie test */
        top: 4rem;
    }
`;
const useStyles = makeStyles((theme) => ({
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


export default function CenterInfo({center, loading, error, children}){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
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

        </>
    )
}
