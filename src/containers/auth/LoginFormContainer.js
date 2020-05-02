import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeField, initializeForm, login} from "../../modules/auth";
import LoginForm from '../../components/auth/login/LoginForm';
import {check} from '../../modules/user';


const LoginFormContainer = ({ history }) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    };

    //컴포넌트가 처음 렌더링 될 때 form 을 초기화 함
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }else{
            //FIX BUG. 로그인 에러 발생한 상태에서 회원가입 폼으로 넘어가면 authError가 존재한 상태로 넘어가게 된다.
            setError('');
        }
        if(auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if(user) {
            //history.push('/');
            history.goBack();
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <LoginForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginFormContainer);