import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {green} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Carousel from './Carousel';
import Input from '@material-ui/core/Input';
import PostContents from './PostContents';

import CommentInputContainer from "../../../containers/community/readPost/CommentInputContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        border: '1.5px solid',
        borderImageSlice: 1,
        borderImage: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae);',
        borderImageWidth: '1.5px',
    },
    media: {
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: green[500],
    },
}));

export default function PostListItem({post}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { publishedDate, user, tags, imgUrlList, body, _id}=post;

    useEffect(()=>{
        console.dir(imgUrlList.length);
    }, [imgUrlList]);
    return (
        <Card className={classes.root}>
            <PostContents post={post}/>
            <CommentInputContainer/>
        </Card>
    );
}