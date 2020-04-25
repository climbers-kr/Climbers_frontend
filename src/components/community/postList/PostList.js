import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostListItem from "./PostListItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';

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
const StyledCard=styled(Card)`
    margin-bottom: 10px;
    border: 1.5px solid transparent;
    border-image: linear-gradient(to left, #77a1d3, #79cbca, #e684ae);
    border-image-slice: 1;
    border-image-width: 1.5px;
`;

const PostList=({loading, loading2, error, posts, user, loader,containerRef})=>{
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} ref={containerRef}>

                    {!loading && posts && (
                        posts.map(post => (
                            <StyledCard key={post.postContent._id}>
                                <PostListItem
                                    post={post}
                                />
                            </StyledCard>
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

