import React from 'react';
import LinkWrapperButton from "../components/common/LinkedButton";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ScopedCssBaseline from '@material-ui/core/CssBaseline';
import Theming from "../components/common/test";

const useStyles = makeStyles(theme => ({
    container: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    child: {
        margin: theme.spacing(2),
    },
}));

const HomePage=()=>{
    const classes = useStyles();
    return (
        <Container  component="main" maxWidth="xs">
            <ScopedCssBaseline />
            <div className={classes.paper}>
                <LinkWrapperButton
                    to="/login"
                    className={classes.child}
                    variant="contained"
                    color="primary"
                    size="small"
                >test</LinkWrapperButton>
                <LinkWrapperButton
                    to="/login"
                    className={classes.child}
                    variant="contained"
                    color="primary"

                >test</LinkWrapperButton>
                <LinkWrapperButton
                    to="/login"
                    className={classes.child}
                    variant="outlined"
                    color="secondary"
                    size="large"
                >test</LinkWrapperButton>
                <Button
                    variant="outlined"
                    color="secondary"
                    href="/login"
                    className={classes.child}
                >
                    Button
                </Button>

                <Link to="/login">Link</Link>
                <Theming>test</Theming>
            </div>
        </Container>
    );
};

export default HomePage;