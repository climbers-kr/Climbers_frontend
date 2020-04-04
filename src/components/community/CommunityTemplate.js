import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AlignItemList from '../common/AlignItemList';
import LinkWrapperFab from "../common/LinkedFab";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

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
    topBox: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-around',
            paddingBottom: '0.7rem',
            '&>*':{
                flex:1,
                maxWidth: '180px',
            }
        },
    },
    tabBox: {
        //background: 'gray',
        position: 'fixed',
        width: '15%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '100%',

    },
    postList: {
        //backgroundColor: 'skyBlue',
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        marginRight: '1rem',
        marginLeft: '1rem',

    },
    rightBox: {
        //backgroundColor: 'gray',
        flex: 2,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

}));

export default function CommunityTemplate({children}) {
    const classes = useStyles(theme);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value);
    };
    const [age, setAge] = React.useState('');

    const handleChange2 = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className={classes.root}>
            <div className={classes.topBox}>

                <LinkWrapperFab color="primary" aria-label="add" variant="extended" to="/write">
                    새 게시글
                </LinkWrapperFab>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={age}
                        onChange={handleChange2}
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={10}>정보</MenuItem>
                        <MenuItem value={20}>문제</MenuItem>
                        <MenuItem value={30}>토론</MenuItem>
                        <MenuItem value={40}>이벤트</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={classes.leftBox}>
                <div className={classes.tabBox}>

                    <LinkWrapperFab className={classes.fab} color="primary" aria-label="add" variant="extended" to="/write">
                        새 게시글
                    </LinkWrapperFab>

                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="All" {...a11yProps(0)} />
                        <Tab label="정보" {...a11yProps(1)} />
                        <Tab label="문제" {...a11yProps(2)} />
                        <Tab label="토론" {...a11yProps(3)} />
                        <Tab label="이벤트" {...a11yProps(4)} />
                </Tabs>
                </div>

            </div>
            <div className={classes.postList}>
                {children}
            </div>
            <div className={classes.rightBox}>
                <AlignItemList/>
            </div>
        </div>
    );
}
