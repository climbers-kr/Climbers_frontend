import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostListItem from "./PostListItem";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loaderBox: {
        //background: 'pink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80px'
    },
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
                        <CircularProgress />
                    )}

                </div>
            </div>

        </>
    )
};

export default CommunityForm;

