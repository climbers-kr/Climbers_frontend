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
import Skeleton from "@material-ui/lab/Skeleton";

const ContentHeader=styled.div`
    //height: 9vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //background: #61dafb;
    @media(max-width: 350px){
       height: 10vh;
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderImageSlice: 1,
        borderImage: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae);',
        borderImageWidth: '1px',
        //boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
        height: '100%',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            maxHeight: '110px',
        },
    },
    controls: {
        display: 'flex',
        //background: 'yellow',
        position: 'relative',
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
            //maxHeight: '5px',
        },
    }
}));


const SkeletonCenterCard= () => {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <Skeleton animation="wave" variant="rect" width='100%' height='50%' />
                <CardContent className={classes.content}>
                    <ContentHeader>
                        <Skeleton />
                        <Rating className={classes.rating} name="size-small" defaultValue={2} size="small" />
                    </ContentHeader>
                    <Skeleton width='60%'/>
                    <Skeleton width='60%'/>
                </CardContent>

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
        </>
    );
};
export default SkeletonCenterCard;