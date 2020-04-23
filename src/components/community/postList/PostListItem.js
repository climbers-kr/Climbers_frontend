import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import {green} from '@material-ui/core/colors';
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