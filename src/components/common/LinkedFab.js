import { Link } from 'react-router-dom';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab:{
        //margin: '2rem',
        width: '90%',
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

    const classes = useStyles();
    return(

        <Fab component={renderLink} {...buttonProps} className={classes.fab}>
            <AddIcon className={classes.extendedIcon}/>
            { props.children }
        </Fab>
    )


}

export default LinkWrapperFab;