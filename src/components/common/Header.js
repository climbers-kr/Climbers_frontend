import React from 'react';
import LinkWrapperButton from "./LinkedButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    userInfo: {
        marginRight: theme.spacing(2),
    }
}));



const Header = ({ user, onLogout }) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    {user ? (
                        <>
                            <Typography variant="h7" className={classes.userInfo}>
                                {user.username}
                            </Typography>
                            <Button color="inherit" variant="outlined" onClick={onLogout}>Logout</Button>
                        </>
                    ): (
                        <>
                            <LinkWrapperButton color="inherit" variant="outlined" to="/login">Login</LinkWrapperButton>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;