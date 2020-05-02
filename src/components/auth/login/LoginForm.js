import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import palette from '../../../lib/styles/palette';
import Button from "@material-ui/core/Button";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

/*
    회원가입 또는 로그인 폼을 보여준다
*/
const textMap={
    login: 'LOGIN',
    register: 'SIGN UP',
};
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

/*에러를 보여준다*/
const ErrorMessage=styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;
const PhoneAuthInputBox=styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    //background: #ebb263;
    width: 100%;
    align-items: center;
    
    h3{
      //background: red;
      text-align: right;
      margin-right: 1rem;
    }
`;

const useStyles = makeStyles(theme => ({
    paper: {
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
const LoginForm=({ type, form, onChange, onSubmit, error, step })=> {
    const classes = useStyles();
    const text=textMap[type];
    const [value, setValue] = React.useState();
    React.useEffect(()=>{
        console.log(value);
    }, [value])
    //const text='로그인';
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {text}
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                { (type === 'login'||step===1) && (
                    <>
                        {type === 'register' && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="phone"
                                type="tel"
                                autoComplete="phone"
                                id="phone"
                                onChange={onChange}
                                value={form.phone}
                            />
                        )}
                        {type === 'register' && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="phone"
                                type="tel"
                                autoComplete="phone"
                                id="phone"
                                onChange={onChange}
                                value={form.phone}
                            />
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={onChange}
                            value={form.username}
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
                            autoComplete="new-password"
                            onChange={onChange}
                            value={form.password}
                        />
                        {type === 'register' && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Password Conform"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-password"
                                onChange={onChange}
                                value={form.passwordConfirm}
                            />
                        )}
                    </>
                )}
                {step>1 && (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={onChange}
                            value={form.username}
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
                            autoComplete="new-password"
                            onChange={onChange}
                            value={form.password}
                        />
                    </>

                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {text}
                </Button>
                <Footer container>
                    <Grid item xs>
                        {type === 'login' ? (
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        ) : (
                            undefined
                        )}

                    </Grid>
                    <Grid item>
                        {type === 'login' ? (
                            <Link to="/register">SIGN UP</Link>
                        ) : (
                            <Link to="/login">LOGIN</Link>
                        )}
                    </Grid>
                </Footer>
            </form>
        </div>
    );
};

export default LoginForm;