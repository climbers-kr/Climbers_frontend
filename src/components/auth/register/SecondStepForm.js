import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import AskModal from "../../common/AskModal";
import ErrorMessage from "../ErrorMessage";

export default function SecondStepForm(
    {
        onChange,
        form,
        onRepeatRequestPhoneAuth,
        onChangeNumberButtonClick,
        onSubmitValidationCode,
        changeNumber,
        classes,
        error
    }) {
    const [modalVisible, setModalVisible]=React.useState(false);
    const onRepeatRequestClick=(e)=>{
        setModalVisible(true);
    };
    const onCancel=()=>{
        setModalVisible(false);
    };
    const onConfirm=()=>{
        setModalVisible(false);
        onRepeatRequestPhoneAuth();
    };
    return (
        <>
            {!changeNumber ? (
                <form className={classes.form} onSubmit={onSubmitValidationCode}>
                    <Typography className={classes.helpText} variant="h6">
                        문자 메시지로 전송된 코드를 입력하세요
                    </Typography>
                    <Timer form={form} classes={classes} />
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
                        onClick={onRepeatRequestClick}
                    >
                        인증 코드 재전송
                    </Button>
                    <Grid container className={classes.gridButtonBox}>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
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
                    <AskModal
                        visible={modalVisible}
                        onConfirm={onConfirm}
                        onCancel={onCancel}
                        title="인증번호 재요청"
                        description="인증번호를 재요청 하시겠습니까?"
                    />
                </form>
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
                    >
                        변경
                    </Button>
                </>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    )
};
const Timer=({form, classes})=>{
    //sms 인증번호 timeout 설정
    const [timer, setTimer]=React.useState('');
    const intervals = {};
    const intervalId=React.useRef(0);
    useEffect(()=> {
        intervalId.current++;
        if(form.validationCodeTimer) {
            const Interval=setInterval(()=>{
                intervals[intervalId]=Interval;

                const distance = 1000*60*5 - (new Date().getTime()-form.validationCodeTimer);
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = ('0'+ Math.floor((distance % (1000 * 60)) / 1000).toString()).slice(-2);

                setTimer(`${minutes}:${seconds}`);

                if(distance < 0){
                    clearInterval(Interval);
                    setTimer('인증 시간 초과');
                }
            }, 1000)
        }
        return () => {
            clearInterval(intervals[intervalId]);
        };
    }, [form.validationCodeTimer]);
    return (
        <Typography className={classes.timer} variant="inherit">
            {timer}
        </Typography>
    )
};