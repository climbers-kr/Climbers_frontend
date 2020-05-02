import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import HorizontalLabelStepper from './Stepper';
import FirstStepForm from './FirstStepForm';
import ErrorMessage from '../ErrorMessage';
import Loadable from "react-loadable";

const SecondStepForm = Loadable({
    loader: () => import('./SecondStepForm'),
    loading() {
        return <CircularProgress color="secondary" />
    }
}); //SecondStepForm 코드 스플리팅
const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    timer: {
        color: 'red',
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
        form,
        onChange,
        onSubmit,
        error,
        step,
        usernameError,
        onRepeatRequestPhoneAuth,
        onChangeNumberButtonClick,
        onSubmitValidationCode,
        changeNumber
    })=> {

    const classes = useStyles();

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
            <>
                { (step===1) && (
                    <FirstStepForm
                        onChange={onChange}
                        onSubmit={onSubmit}
                        form={form}
                        usernameError={usernameError}
                        classes={classes}
                        error={error}
                    />
                )}
                { (step===2) && (
                    <SecondStepForm
                        onChange={onChange}
                        form={form}
                        onRepeatRequestPhoneAuth={onRepeatRequestPhoneAuth}
                        onChangeNumberButtonClick={onChangeNumberButtonClick}
                        onSubmitValidationCode={onSubmitValidationCode}
                        changeNumber={changeNumber}
                        classes={classes}
                        error={error}
                    />
                )}
            </>
        </div>
    );
};

export default RegisterForm;