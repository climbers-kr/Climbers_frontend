import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Carousel from "../centers/centerList/Carousel";



const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    media: {
        //paddingTop: '56.25%', // 16:9
        //flex:1,
        height: '1000px',
    },
    content: {
        flex: 1,
        background: 'blue',
    },

}));

export default function CenterCard({center}) {
    const classes = useStyles();


    return (
        <div>
            <Card className={classes.root}>
                { center.imgUrlList.length > 0 && (
                    <Carousel
                        className={classes.media}
                        imgUrlList={center.imgUrlList}
                        title="Paella dish"
                    />
                )}
                <CardContent className={classes.content}>
                    <Typography variant="body1" component="h1">
                        {center.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {center.locationObject.query}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}
