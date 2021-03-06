import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Rating from '@material-ui/lab/Rating';
import ShareIcon from '@material-ui/icons/Share';
import Carousel from "./Carousel";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import styled, {css} from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import clsx from "clsx";
const cardStyle=css`
    ${props=> 
        props.coloredborder &&
        css`
            border: 1px solid transparent;
            border-image: linear-gradient(to left, #77a1d3, #79cbca, #e684ae);
            border-image-slice: 1;
        `}
`;

const StyledCard=styled(Card)`
    flex:1;
    display: flex;
    flex-direction: column;
    height: 100%;
    ${cardStyle}
`;
const Title=styled.h1`
    font-size: 1em;
    margin-bottom: 0;
    //flex: 1;
    @media(max-width: 600px){
        font-size: 1em;
    }
`;
const Address=styled.div`
  //flex:1;
  
`;
const ContentHeader=styled.div`
    //height: 9vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //background: #61dafb;
    @media(max-width: 350px){
       //height: 10vh;
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        //boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
    },
    borderColor: {
        border: '1px solid',
        borderImageSlice: 1,
        borderImage: 'linear-gradient(to top, #12c2e9, #c471ed, #f64f59)',
        borderImageWidth: '1px',
        [theme.breakpoints.down('sm')]: {
            border: '1px solid',
            borderImageSlice: 1,
            borderImage: 'linear-gradient(to top, #12c2e9, #c471ed, #f64f59)',
            borderImageWidth: '1px',
        },
},
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        padding: 0,
        //background: 'blue',
        [theme.breakpoints.down('xs')]: {
            maxHeight: '110px',
        },
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        flex: 1,
        display: 'flex',
        overflow: 'hidden', //추가
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


const CenterCard= ({center, history, coloredborder}) => {
    const classes = useStyles();
    const location=center.locationObject;

    return (
        <>
            <Card className={coloredborder? clsx(classes.root, classes.borderColor) : classes.root}>

                { center.imgUrlList.length > 0 && (
                    <Carousel
                        imgUrlList={center.imgUrlList}
                        title="Paella dish"
                        to={`/centers/${center._id}`}
                    />
                )}

                <Link to={`/centers/${center._id}`} className={classes.link}>
                    <CardContent className={classes.content}>
                        <ContentHeader>
                            <Title>
                                {center.title}
                            </Title>
                            <Rating className={classes.rating} name="size-small" defaultValue={2} size="small" />
                        </ContentHeader>
                        <Address>
                            {location.sido} {location.sigungu} {location.bname}
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
        </>
    );
}
export default withRouter(CenterCard);