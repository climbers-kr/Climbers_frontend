import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import url from '../../images/climbing.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        //maxWidth: "100px",
        flex:1,
        //padding: '1rem'
        margin: '0.5rem',

    },
    media: {
        height: 'auto',
        //paddingTop: '56.25%', // 16:9
        width: '100%',
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
}));

export default function SlideCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
        <Card className={classes.root}>
            <img
                className={classes.media}
                src={url}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body1"  component="h1">
                    K2 climbing Center
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests.
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