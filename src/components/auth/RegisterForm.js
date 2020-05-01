import React, {useCallback} from 'react';
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

const Footer=styled.div`
    margin-top: 2rem;
    text-align: right;
    a{
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.gray[9]};
        }
    }
`;
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
const RegisterForm=(
    {
        type,
        form,
        onChange,
        onSubmit,
        error,
        step,
        usernameError,
        onChangeNumberButtonClick,
        changeNumber
    })=> {
    const classes = useStyles();

    //const text='로그인';
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                SIGN UP
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
                    <FirstStepForm
                        onChange={onChange}
                        form={form}
                        usernameError={usernameError}
                    />
                )}
                { step > 1 && (
                    <SecondStepForm
                        onChange={onChange}
                        form={form}
                        onChangeNumberButtonClick={onChangeNumberButtonClick}
                        changeNumber={changeNumber}
                    />
                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}


            </form>
        </div>
    );
};
const FirstStepForm=({onChange, form, usernameError})=>{
    const classes = useStyles();
    return (
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
                autoFocus
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
                onChange={onChange}
                value={form.username}
            />
            {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
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
                회원가입
            </Button>
            <Footer container>
                <Link to="/login">LOGIN</Link>
            </Footer>

        </>
    )
};
const SecondStepForm=({onChange, form, onChangeNumberButtonClick, changeNumber})=>{
    const classes = useStyles();
    return (

        <>
            {!changeNumber ? (
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
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={onChangeNumberButtonClick}>
                                전화번호 업데이트
                            </Button>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <>
                    <Typography className={classes.helpText} variant="h6">
                        휴대폰 번호 변경
                    </Typography>
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
                        autoFocus
                        onChange={onChange}
                        value={form.phone}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={onChangeNumberButtonClick}
                        //type="submit"
                    >
                        변경
                    </Button>
                </>
            )}
        </>
    )
};


export default RegisterForm;