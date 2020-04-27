import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostListItem from "./PostListItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import ErrorMessage from "../../common/ErrorMessage";

const PostListBlock=styled.div`
    flex: 1;
    justify-content: center;
    margin-right: 1rem;
    margin-left: 1rem;   
`;

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
        <PostListBlock>
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
            { error && (
                <ErrorMessage>
                    {error.message}
                </ErrorMessage>
            ) }
        </PostListBlock>
    )
};

export default PostList;

