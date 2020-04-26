import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostListItem from "./PostListItem";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: 'red',
        flex: 1,
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


const PostList=({loading, loading2, error, posts, user, loader,containerRef})=>{
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} ref={containerRef}>
                {!loading && posts && (
                    posts.map((post, index) => (
                        <PostListItem
                            key={post.postContent._id}
                            post={post}
                            index={index}
                        />
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

export default PostList;

