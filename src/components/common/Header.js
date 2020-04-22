import React from 'react';
import LinkWrapperButton from "./LinkedButton";
import Button from "@material-ui/core/Button";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {Link} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import url from '../../images/ClimbersLogo.png';


const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });
const useStyles = makeStyles(theme => ({
    appBar:{
        background: '#414449',
        position: 'fixed',
    },
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
        color: 'white',
    },
    link: {
        margin: theme.spacing(1, 1.5),
        textDecoration: 'none',
        color: 'white',
    },
    menuLink: {
        color: 'black',
        textDecoration: 'none',
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
    const [state, setState] = React.useState({
        top: false,
    });
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



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
                    <Link to="/centers">
                        암장 정보
                    </Link>
                </ListItem>
                <ListItem button >
                    <Link to="/events">
                        이벤트
                    </Link>
                </ListItem>
                <ListItem button >
                    <Link to="/community">
                        커뮤니티
                    </Link>
                </ListItem>
                <ListItem button >
                    <Link to="/friends">
                        친구 찾기
                    </Link>
                </ListItem>
                <ListItem button >
                    <Link to="/market">
                        모임/대회
                    </Link>
                </ListItem>
            </List>

        </div>
    );

    return (
        <>
            <AppBar className={classes.appBar}>
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


                    <Link className={classes.title} to="/" >
                        <img src={url} alt="logo" width="112" height="28" />
                    </Link>
                        <nav className={classes.menuItem}>
                            <Link to="/centers" className={classes.link}>
                                암장 정보
                            </Link>
                            <Link to="/events" className={classes.link}>
                                이벤트
                            </Link>
                            <Link to="/community" className={classes.link}>
                                커뮤니티
                            </Link>
                            <Link to="/friends" className={classes.link}>
                                친구 찾기
                            </Link>
                            <Link variant="button" color="inherit" to="/market" className={classes.link}>
                                모임/대회
                            </Link>
                        </nav>


                    {user ? (
                        <>
                            <Button
                                className={classes.userInfo}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                {user.username}
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link variant="button" to="/accounts/edit" className={classes.menuLink}>
                                                            마이 페이지
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            <Button color="secondary" variant="outlined" onClick={onLogout}>Logout</Button>
                        </>
                    ): (
                        <>
                            <LinkWrapperButton color="secondary" variant="outlined" to="/login">Login</LinkWrapperButton>
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