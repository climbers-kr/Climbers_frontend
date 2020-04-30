import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from "@material-ui/core/Button";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import HorizontalLabelStepper from './Stepper';

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


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //background: 'skyblue',
        padding: 0,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    helpText: {
        margin: theme.spacing(2),
    },
    gridButtonBox: {
        marginTop: theme.spacing(2),
        '& > *': {
            padding: theme.spacing(1),
        }

    },
    repeatButton: {
        alignSelf: 'flex-start'
    }
}));
const RegisterForm=({ type, form, onChange, onSubmit, error, step, usernameValidation })=> {
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
            <HorizontalLabelStepper
                step={step}
                autoComplete="phone"
                id="phone"
                onChange={onChange}
                value={form.phone}
            />
            <form className={classes.form} noValidate onSubmit={onSubmit}>

                { (step===1) && (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="전화번호"
                            type="tel"
                            autoComplete="phone"
                            id="phone"
                            onChange={onChange}
                            value={form.phone}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="사용자 이름"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={onChange}
                            value={form.username}
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={onChange}
                            value={form.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="비밀번호 확인"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="new-password"
                            onChange={onChange}
                            value={form.passwordConfirm}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {text}
                        </Button>

                    </>
                )}
                { step > 1 && (
                    <>
                        <Typography className={classes.helpText} variant="h6">
                            문자 메시지로 전송된 코드를 입력하세요
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="인증번호"
                            name="validationCode"
                            autoFocus
                            type="number"
                            onChange={onChange}
                            value={form.validationCode}
                        />
                        <Button
                            color="primary"
                            className={classes.repeatButton}
                        >
                            인증 코드 재전송
                        </Button>
                        <Grid container className={classes.gridButtonBox}>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    href="#"
                                    color="primary"
                                    fullWidth
                                >
                                    다음
                                </Button>
                            </Grid>
                            <Grid item xs={8}>
                                <Button fullWidth variant="contained" to="/register">전화번호 업데이트</Button>
                            </Grid>
                        </Grid>

                    </>

                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}

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

export default RegisterForm;