import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
const TextForm=({onChange})=>{
    const classes = useStyles();
    return (

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

    )
};

export default TextForm;