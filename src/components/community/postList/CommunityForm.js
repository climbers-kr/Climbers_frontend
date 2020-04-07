import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostListItem from "./PostListItem";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
       // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        //position: 'relative'
    },
    loaderBox: {
        //background: 'pink',
        margin: 'auto',
        //top: '-10px',
        //position: 'absolute'
        position: 'relative'
    },
    loader: {
        top: '-15px',
        position: 'absolute',
        background: 'yellow',
    }
}));

const CommunityForm=({loading, loading2, error, posts, user, loader,containerRef})=>{
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} ref={containerRef}>
                {!loading && posts && (
                    posts.map(post => (
                        <PostListItem post={post} key={post._id}/>
                    ))
                )}
                <div className={classes.loaderBox}
                    ref={loader}
                >
                    {loading && (
                        <CircularProgress />
                    )}
                    {loading2 && (
                        <CircularProgress className={classes.loader}/>
                    )}

                </div>
            </div>

        </>
    )
};

export default CommunityForm;

