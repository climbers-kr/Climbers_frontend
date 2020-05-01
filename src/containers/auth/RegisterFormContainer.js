import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, register, goNextStep, checkUsername, requestPhoneAuth} from "../../modules/auth";
import RegisterForm from '../../components/auth/RegisterForm';
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
        setError(null);
        dispatch(goNextStep());
        dispatch(requestPhoneAuth({ phone: phone }));
    };
    const onChangeNumberButtonClick=()=>{
        if(changeNumber){
            const { phone } = form;
            if(!isMobilePhone(phone,'ko-KR')){
                setError('올바른 연락처를 입력해주세요.');
                return;
            }
            setError(null);
            dispatch(requestPhoneAuth({ phone: phone }));
            setChangeNumber(false);
        }else {
            setChangeNumber(true);
        }
    };

    //회원가입 성공/실패 처리
    useEffect(()=> {
        if(usernameValidationError) {
            //계정명이 이미 존재할 때
            console.dir(usernameValidationError);
            if(usernameValidationError.response.status === 409) {
                setUsernameError('이미 존재하는 계정명입니다.');
            }else {
                setUsernameError('잘못된 사용자 이름입니다. 4~20자의 영문자, 숫자를 사용한 형식만 가능합니다.');
            }
        }else{
            //FIX BUG. 로그인 에러 발생한 상태에서 회원가입 폼으로 넘어가면 authError가 존재한 상태로 넘어가게 된다.
            setUsernameError('');
            setError('');
        }
    }, [usernameValidation, usernameValidationError, dispatch]);

    useEffect(()=> {
        /*
        if(authError) {
            console.log('계정명이 이미 존재할 때');
            //계정명이 이미 존재할 때
            console.dir(authError);
            if(authError.response.status === 409) {
                setError('이미 존재하는 계정명입니다.');
                return;
            }else {
                setError('잘못된 사용자 이름입니다. 영문자, 숫자를 사용한 형식만 가능합니다.');
                return;
            }
            //기타 이유
            setError('회원가입 실패');
            return;
        }else{
            console.dir("testsetestst");
            //FIX BUG. 로그인 에러 발생한 상태에서 회원가입 폼으로 넘어가면 authError가 존재한 상태로 넘어가게 된다.
            setError('');
        }*/
        if(auth) {
            console.log('회원가입 성공');
            console.log(auth);
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
            onChangeNumberButtonClick={onChangeNumberButtonClick}
            changeNumber={changeNumber}
        />
    );
};

export default withRouter(RegisterFormContainer);