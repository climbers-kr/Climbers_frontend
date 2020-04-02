import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridList from '@material-ui/core/GridList';
import PostListItem from "./postList/PostListItem";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: '1rem',
        backgroundColor: 'red',
    },
    paper: {

        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '650px',

        //width: '100%',
        //flexGrow: 1,
        //width: '650px',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    gridList: {}
}));
const CommunityForm=({loading, error, posts, user})=>{
    const classes = useStyles();
    let numbers = [1, 2, 3, 4, 5];
    const menus = ["Menu1", "Menu2", "Menu3", "Menu4"]
    const menuList = menus.map((menu) => (<PostListItem/>));
    return (
        <>
            <div className={classes.root}>
                {!loading && posts && (
                    posts.map(post => (
                        <PostListItem post={post} key={post._id}/>
                    ))
                )}
            </div>
        </>
    )
};

export default CommunityForm;
/*
const TempCard=()=>{
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item  sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Standard license
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Full resolution 1920x1080 • JPEG
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: 1030114
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}*/

