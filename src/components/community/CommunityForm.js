import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const CommunityForm=({loading, error, posts, user, loader,containerRef})=>{
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} ref={containerRef}>
                {!loading && posts && (
                    posts.map(post => (
                        <PostListItem post={post} key={post._id}/>
                    ))
                )}

                    <div
                        ref={loader}
                    >
                        <span>Loading...</span>
                    </div>


            </div>

        </>
    )
};

export default CommunityForm;

