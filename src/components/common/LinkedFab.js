import { Link } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',

    },
    tabBox:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10rem',
        marginTop:'10rem',
    },
    tabs: {

        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'yellow',

    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab:{
        margin: '0.5rem',
    }
}));
function LinkWrapperFab(props) {
    const { to, ...buttonProps } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );


/*
    return (
        <Button component={renderLink} {...buttonProps}>
            { props.children }
        </Button>
    );*/
    const classes = useStyles();
    return(

        <Fab component={renderLink} {...buttonProps} className={classes.fab}>
            <AddIcon className={classes.extendedIcon}/>
            { props.children }
        </Fab>
    )


}

export default LinkWrapperFab;