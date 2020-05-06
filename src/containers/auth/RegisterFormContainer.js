import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    changeField,
    initializeForm,
    register,
    goNextStep,
    goBackStep,
    checkUsername,
    requestPhoneAuth
} from "../../modules/auth";
import RegisterForm from '../../components/auth/register/RegisterForm';
import {check} from '../../modules/user';
import {withRouter} from 'react-router-dom';
import isMobilePhone from 'validator/lib/isMobilePhone';
import {debounce} from "lodash";

const RegisterFormContainer = ({ history }) => {
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [changeNumber, setChangeNumber]=React.useState(false);
    const dispatch = useDispatch();
    const {
        form,
        step,
        auth,
        authError,
        user,
        usernameValidation,
        usernameValidationError
    } = useSelector(({ auth, user }) => ({
        form: auth.register,
        step: auth.step,
        auth: auth.auth,
        authError: auth.authError,
        usernameValidation: auth.usernameValidation,
        usernameValidationError: auth.usernameValidationError,
        user: user.user,
    }));
    //컴포넌트가 처음 렌더링 될 때 form 을 초기화 함
    useEffect(() => {
        console.log('initialize')
        dispatch(initializeForm('register'));
    }, [dispatch]);

    const debounceCheckUsername = useRef(debounce((value, name) => {
        //username 중복 확인
        if(name === 'username' && value !== ''){
            //console.log(value);
            dispatch(checkUsername({username: value}));
        }
    }, 700)).current;

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
        debounceCheckUsername(value, name);
    };
    const onSubmit = e => {
        e.preventDefault();
        const { phone, username, password, passwordConfirm } = form;
        //하나라도 비어 있다면
        if([phone, username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if(!isMobilePhone(phone,'ko-KR')){
            setError('올바른 연락처를 입력해주세요.');
            return;
        }
        if(usernameError){
            setError('올바른 사용자 이름을 입력해주세요.');
            return;
        }
        if(password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        const passRule = new RegExp( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/);

        if(!passRule.test(password)) {
            setError('비밀번호는 영문자, 숫자를 포함한 8~20자의 문자열만 가능합니다');
            return;
        }
        setError(null);
        dispatch(goNextStep());
        dispatch(requestPhoneAuth({ phone: phone }));
    };
    const onChangeNumberButtonClick=()=>{
        setError(null);
        if(changeNumber){
            const { phone } = form;
            if(!isMobilePhone(phone,'ko-KR')){
                setError('올바른 연락처를 입력해주세요.');
                return;
            }
            //Todo: 전화번호 변경 확인 모달
            dispatch(requestPhoneAuth({ phone: phone }));
            setChangeNumber(false);
        }else {
            setChangeNumber(true);
        }
    };
    const onRepeatRequestPhoneAuth=()=>{
        const { phone } = form;
        dispatch(requestPhoneAuth({ phone: phone }));
    };
    const onSubmitValidationCode= e =>{
        //step2- sms 인증번호 입력 후 제출
        e.preventDefault();

        const { phone, username, name, password, passwordConfirm, validationCode } = form;
        //하나라도 비어 있다면
        if([phone, username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            dispatch(goBackStep()); //폼 state 초기화 대비
            return;
        }
        if(!validationCode){
            setError('인증번호를 입력해주세요.');
            return;
        }
        setError(null);
        dispatch(register({ phone, username, name, password, validationCode }));
    };
    //회원가입 성공/실패 처리
    useEffect(()=> {
        if(usernameValidationError) {
            if(usernameValidationError.response.status === 409) {
                //계정명이 이미 존재할 때
                setUsernameError('이미 존재하는 계정명입니다.');
            }else {
                setUsernameError('4~20자의 영문자, 숫자를 사용한 형식만 가능합니다 (첫 글자는 영문).');
            }
        }else{
            //FIX BUG. 로그인 에러 발생한 상태에서 회원가입 폼으로 넘어가면 authError가 존재한 상태로 넘어가게 된다.
            setUsernameError('');
            setError('');
        }
    }, [usernameValidation, usernameValidationError, dispatch]);

    useEffect(()=> {
        if(authError) {
            console.log('계정명이 이미 존재할 때');
            //계정명이 이미 존재할 때
            if(authError.response.status === 409) {
                setError('이미 존재하는 계정명입니다.');
                return;
            }else if(authError.response.status === 401){
                setError('잘못된 인증번호 입니다.');
                return;
            }
            //기타 이유
            setError('회원가입 실패');
            return;
        }else{
            //FIX BUG. 로그인 에러 발생한 상태에서 회원가입 폼으로 넘어가면 authError가 존재한 상태로 넘어가게 된다.
            setError('');
        }
        if(auth) {
            console.log('회원가입 성공');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    //user값이 잘 설정되었는지 확인
    useEffect(()=> {
        if(user) {
            history.push('/'); //홈 화면으로 이동
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <RegisterForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            usernameValidation={usernameValidation}
            error={error}
            usernameError={usernameError}
            step={step}
            onRepeatRequestPhoneAuth={onRepeatRequestPhoneAuth}
            onChangeNumberButtonClick={onChangeNumberButtonClick}
            onSubmitValidationCode={onSubmitValidationCode}
            changeNumber={changeNumber}
        />
    );
};

export default withRouter(RegisterFormContainer);