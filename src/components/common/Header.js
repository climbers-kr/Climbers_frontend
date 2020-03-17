import React from 'react';
import LinkWrapperButton from "./LinkedButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
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
    },

}));



const Header = ({ user, onLogout }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
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
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>

            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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
                    <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
                        {fullList('top')}
                    </Drawer>

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;