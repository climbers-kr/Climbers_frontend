import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from "@material-ui/core/Button";
import LinkedButton from '../common/LinkedButton';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
/*
    회원가입 또는 로그인 폼을 보여준다
*/

const AuthFormBlock=styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
        text-align: center;
    }
`;


/*스타일링된 input*/
const StyledInput=styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    //margin-top: 1rem;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    &+&{
        margin-top: 1rem;
    }
`;




//폼 하단에 로그인 혹은 회원가입 링크를 보여줌
const Footer=styled(Grid)`
    margin-top: 2rem;
    //text-align: right;
    a{
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWithMarginTop=styled(Button)`
    margin-top: 1rem;
`;

const textMap={
    login: '로그인',
    register: '회원가입',
};



/*에러를 보여준다*/
const ErrorMessage=styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;


const useStyles = makeStyles(theme => ({
    container: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const AuthForm=({ type, form, onChange, onSubmit, error })=> {
    const classes = useStyles();
    const text=textMap[type];
    //const text='로그인';
    return (
        <div className={classes.paper}>
            <h3>로그인</h3>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChange}
                />
                {type === 'register' && (
                    <TextField
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        onChange={onChange}

                    />
                )}
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <LinkedButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {text}
                </LinkedButton>
                <Footer container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        {type === 'login' ? (
                            <Link to="/register">회원가입</Link>
                        ) : (
                            <Link to="/login">로그인</Link>
                        )}
                    </Grid>
                </Footer>
            </form>
        </div>
    );
};

export default AuthForm;