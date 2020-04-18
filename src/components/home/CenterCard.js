import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Rating from '@material-ui/lab/Rating';
import ShareIcon from '@material-ui/icons/Share';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import image from "../../images/homeImage.png";
import image2 from "../../images/homeImage2.png";

import InnerCarousel from "./InnerCarousel";


const Title=styled.h1`
    font-size: 1em;
    margin-bottom: 0;
    //flex: 1;
    @media(max-width: 600px){
        font-size: 1em;
    }
     //background-color: darkorchid;
`;
const Address=styled.p`
  
`;
const CardBox=styled.div`
    
    position: relative;
    height: 100%;
    //background-color: darkorchid;
    
    margin: 0 5px 0 5px;
`;

const MediaBlock=styled.div`
    //flex: 1;
    background: #343132;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderImageSlice: 1,
        borderImage: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae);',
        borderImageWidth: '1px',
        height: '100%',
        //marginBottom:'100px',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        [theme.breakpoints.down('xs')]: {
            maxHeight: '110px',
        },
        //background: 'skyblue',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        flex: 1,
        //background: 'blue',
        display: 'flex',
        overflow: 'hidden',
    },
    controls: {
        display: 'flex',
        //background: 'yellow',
        position: 'relative',
        //flex: 1,
    },
    icon: {
        padding: 0,
    },
    badge: {
        position: 'absolute',
        right: 25,
    },
    rating:{
        [theme.breakpoints.down('xs')]: {
            maxHeight: '5px',
        },
    },

}));


const CenterCard= ({center, history}) => {
    const classes = useStyles();
    //const location=center.locationObject;
    const imgUrlList=[image, image, image2,image,image];
    return (
        <CardBox>
            <Card className={classes.root}>
                <MediaBlock>
                    <InnerCarousel imgUrlList={imgUrlList}/>
                </MediaBlock>

                <Link to='/' className={classes.link}>
                    <CardContent className={classes.content}>
                        <Title>
                            'center.title'
                        </Title>
                        <Rating className={classes.rating} name="size-small" defaultValue={2} size="small" />
                        <Address>
                            'location.sido location.sigungu location.bname'
                        </Address>
                    </CardContent>
                </Link>
                <CardActions className={classes.controls}>
                    <IconButton className={classes.icon} aria-label="add to favorites">
                        <BookmarkBorderIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <Badge color="secondary" badgeContent={'event'} aria-label="add" className={classes.badge} />
                </CardActions>
            </Card>
        </CardBox>
    );
}
export default withRouter(CenterCard);