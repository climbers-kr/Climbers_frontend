import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Rating from '@material-ui/lab/Rating';
import ShareIcon from '@material-ui/icons/Share';
import Carousel from "../centers/centerList/Carousel";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import styled from 'styled-components';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withRouter } from 'react-router-dom';
import LinkWrapperActionArea from './LinkWrapperActionArea'

const Title=styled.h1`
    font-size: 1.5rem;
    //background-color: #61dafb;
    margin-bottom: 0;
  
`;
const Address=styled.p`
    //flex: 1;
    //background-color: #fb61d4;
`;
const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    controls: {
        display: 'flex',
        //background: 'blue',
        position: 'relative',
    },
    icon: {
        padding: 0,
    },
    badge: {
        position: 'absolute',
        right: 25,
    }

}));

const CenterCard= ({center, history}) => {
    const classes = useStyles();
    const onClick=(e)=>{
        console.log('card clicked');
        history.push('/')
    }

    return (
        <>
            <Card className={classes.root}>
                <LinkWrapperActionArea>
                    { center.imgUrlList.length > 0 && (
                        <Carousel
                            imgUrlList={center.imgUrlList}
                            title="Paella dish"
                        />
                    )}
                    <CardContent className={classes.content}>
                        <Title>
                            {center.title}
                        </Title>
                        <Rating name="size-small" defaultValue={2} size="small" />
                        <Address>
                            {center.locationObject.query}
                        </Address>
                    </CardContent>
                </LinkWrapperActionArea>
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
}
export default withRouter(CenterCard);