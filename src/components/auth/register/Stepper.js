import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //background: 'blue',
        padding: 0,
        margin: 0,
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper:{
        //background: 'pink',
        margin: 0,
        padding: 'theme.spacing(1) 0',
    }
}));

function getSteps() {
    return ['정보 입력', '전화번호 인증', '가입 완료!'];
}
export default function HorizontalLabelStepper({step}) {
    const classes = useStyles();
    const steps = getSteps();

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepper} activeStep={step-1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}