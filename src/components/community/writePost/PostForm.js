import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin: {

    },
}));
const PostForm=({onChange, onSubmit, post})=>{
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
                margin="normal"
                fullWidth
                id="postText"
                label="공유할 텍스트"
                name="postText"
                autoFocus
                onChange={onChange}
                multiline
            />
            <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
            >게시</Button>
            </form>
        </div>
    )
};

export default PostForm;