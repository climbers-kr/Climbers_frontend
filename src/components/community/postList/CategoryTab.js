import React from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WritePostButton from '../common/WritePostButton'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import palette from '../../../lib/styles/palette';

const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

const TopBox=styled.div`
    display: none;
    @media(max-width: 959px){
        background-color: ${palette.gray[0]};
        position: -webkit-sticky; /* 사파리 브라우저 지원 */
        position: sticky;
        top: 4rem;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        &>* {
            flex:1;
            max-width: 180px;
            margin: 10px;
        }
    }
    @media(max-width: 600px){
        top: 3rem;
        padding-top: 0.7rem;
    }                
`;
const useStyles = makeStyles(theme => ({
    leftBox:{
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
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
    rightBox: {
        //backgroundColor: 'gray',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

}));

export default function CategoryTab({ onChangeCategory, category}) {
    const classes = useStyles(theme);

    const handleSelectTab = (event, newValue) => {
        onChangeCategory(newValue);
    };

    const handleSelectChange = (event) => {
        onChangeCategory(event.target.value);
    };
    return (
        <>
            <TopBox>
                <WritePostButton />
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={category}
                        onChange={handleSelectChange}
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="정보">정보</MenuItem>
                        <MenuItem value="문제">문제</MenuItem>
                        <MenuItem value="일상">일상</MenuItem>
                        <MenuItem value="유머">유머</MenuItem>
                    </Select>
                </FormControl>
            </TopBox>
            <div className={classes.leftBox}>
                <div className={classes.tabBox}>
                    <WritePostButton />
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={category}
                        onChange={handleSelectTab}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="All" value={""} />
                        <Tab label="정보" value={"정보"} />
                        <Tab label="문제" value={"문제"} />
                        <Tab label="일상" value={"일상"} />
                        <Tab label="유머" value={"유머"} />
                    </Tabs>
                </div>
            </div>
        </>
    );
}
