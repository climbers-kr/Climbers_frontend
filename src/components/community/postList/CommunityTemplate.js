import React from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import AlignItemList from '../../common/AlignItemList';
import {createGlobalStyle} from 'styled-components';
import palette from '../../../lib/styles/palette';

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		background-color: ${palette.gray[0]};
	}
`;
const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '6rem',
        display: 'flex',
        flexDirection: 'row',
        //background: 'skyblue',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            width: '80%',
            maxWidth: '650px',
            margin: 'auto',
            marginTop: '6rem',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '4rem',
            flexDirection: 'column',
            width: '100%',
        },
    },
    leftBox:{
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    rightBox: {
        //backgroundColor: 'gray',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

}));

export default function CommunityTemplate({children}) {
    const classes = useStyles(theme);

    return (
        <>
            <GlobalStyle/>
            <div className={classes.root}>
                {children}
                <div className={classes.rightBox}>
                    <AlignItemList/>
                </div>
            </div>
        </>
    );
}
