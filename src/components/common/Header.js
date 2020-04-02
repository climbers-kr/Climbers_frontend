import React from 'react';
import LinkWrapperButton from "./LinkedButton";
import Button from "@material-ui/core/Button";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });
const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
    userInfo: {
        marginRight: theme.spacing(2),
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    menuItem: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

}));


const Header = ({ user, onLogout }) => {
    const classes = useStyles(theme);
    const matches = useMediaQuery('(min-width:768px)');
    const [state, setState] = React.useState({
        top: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const fullList = side => (
        <div
            className={classes.fullList}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button >
                    <ListItemText primary={'암장 정보'} />
                </ListItem>
                <ListItem button >
                    <ListItemText primary={'이벤트'} />
                </ListItem>
                <ListItem button >
                    <ListItemText primary={'커뮤니티'} />
                </ListItem>
                <ListItem button >
                    <ListItemText primary={'친구 찾기'} />
                </ListItem>
                <ListItem button >
                    <ListItemText primary={'중고 장터'} />
                </ListItem>
            </List>

        </div>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer('top', true)}
                        >
                            <MenuIcon />
                        </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                        <nav className={classes.menuItem}>
                            <Link variant="button" color="inherit" href="/centers" className={classes.link}>
                                암장 정보
                            </Link>
                            <Link variant="button" color="inherit" href="/events" className={classes.link}>
                                이벤트
                            </Link>
                            <Link variant="button" color="inherit" href="/community" className={classes.link}>
                                커뮤니티
                            </Link>
                            <Link variant="button" color="inherit" href="/friends" className={classes.link}>
                                친구 찾기
                            </Link>
                            <Link variant="button" color="inherit" href="/market" className={classes.link}>
                                중고 장터
                            </Link>
                        </nav>


                    {user ? (
                        <>
                            <Typography className={classes.userInfo}>
                                {user.username}
                            </Typography>
                            <Button color="inherit" variant="outlined" onClick={onLogout}>Logout</Button>
                        </>
                    ): (
                        <>
                            <LinkWrapperButton color="inherit" variant="outlined" to="/login">Login</LinkWrapperButton>
                        </>
                    )}
                    <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
                        {fullList('top')}
                    </Drawer>

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;