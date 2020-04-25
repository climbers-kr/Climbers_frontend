import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {green} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Carousel from '../common/Carousel';
import {withRouter} from 'react-router-dom';

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
    avatar: {
        backgroundColor: green[500],
    },
}));

/*
* const TagItem=React.memo(({tag, onRemove}) => (
    <Tag onClick={()=> onRemove(tag)}>#{tag}</Tag>
));
* */
function PostContents({postContent, history}) {
    const classes = useStyles();

    const { publishedDate, user, tags, imgUrlList, body, _id}=postContent;

    useEffect(()=>{
        //console.dir(imgUrlList.length);
    }, [imgUrlList]);

    const onClickCommentIcon=()=>history.push(`/community/@${user.username}/${_id}`);

    return (
        <>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={user.username}
                subheader={new Date(publishedDate).toLocaleDateString()}
            />
            { imgUrlList.length > 0 && (
                <Carousel
                    className={classes.media}
                    imgUrlList={imgUrlList}
                    title="Paella dish"
                />
            )}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={onClickCommentIcon}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
        </>
    );
}
//export default withRouter(React.memo(PostContents));
export default withRouter(PostContents);