import React from 'react';
import styled from 'styled-components';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const Input=styled.input`
    overflow: hidden;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
`;


const UserImage=styled(Avatar)`
    width: 100px;
    height: 100px;
    @media(max-width: 600px){
        width: 70px;
        height: 70px;
    }
`;
const FormTemplate=styled.div`
    display: flex;
    position: absolute;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    @media(max-width: 600px){
        width: 95%;
    }
`;
const ImageSelector=styled.div`
    width: 150px;
    height: 150px;
    position: relative;
`;

const useStyles = makeStyles(theme => ({
    avatar: {
        width: '100px',
        height: '100px',
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    }
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const EditForm=({onChange, form, onSubmit})=>{
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <FormTemplate>

            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="프로필 편집" {...a11yProps(0)}/>
                <Tab label="비밀번호 변경" {...a11yProps(1)}/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className={classes.paper}>
                    <ImageSelector>
                        <label className={classes.label}>
                            <UserImage  alt="profile-image"  />
                            <p>프로필 사진 바꾸기</p>
                            <Input
                                accept="image/*"
                                type="file"
                                name="imgCollection"
                                multiple
                                onChange={onChange}
                            />
                        </label>
                    </ImageSelector>

                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="이름"
                            name="이름"
                            autoFocus
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="사용자 이름"
                            name="사용자 이름"
                            autoFocus
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="전화번호"
                            label="전화번호"
                            type="tel"
                            id="phone"
                            autoComplete="new-password"
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="성별"
                            label="성별"
                            type="string"
                            id="sex"
                            autoComplete="new-password"
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            완료
                        </Button>
                    </form>
                </div>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        type="password"
                        label="현재 비밀번호"
                        name="현재 비밀번호"
                        autoFocus
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="username"
                        label="새로운 비밀번호"
                        name="새로운 비밀번호"
                        autoFocus
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="new-password-confirm"
                        label="새로운 비밀번호 확인"
                        name="새로운 비밀번호 확인"
                        autoFocus
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        완료
                    </Button>
                </form>
            </TabPanel>
        </FormTemplate>
    );
};

export default EditForm;