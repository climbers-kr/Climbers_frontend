import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, register} from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {withRouter} from 'react-router-dom';


const RegisterForm = ({ history }) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        //하나라도 비어 있다면
        if([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if(password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            changeField({ form: 'register', key: 'password', value: '' });
            changeField({ form: 'register', key: 'passwordConfirm', value: '' });
            return;
        }
        dispatch(register({ username, password }));
    };

    //컴포넌트가 처음 렌더링 될 때 form 을 초기화 함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    //회원가입 성공/실패 처리
    useEffect(()=> {
        if(authError) {
            console.log('계정명이 이미 존재할 때');
            //계정명이 이미 존재할 때
            console.dir(authError);
            if(authError.response.status === 409) {
                setError('이미 존재하는 계정명입니다.');
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
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);