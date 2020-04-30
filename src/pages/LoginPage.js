import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from "../containers/auth/LoginFormContainer";


const LoginPage=()=>{
    return (
        <AuthTemplate>
            <LoginForm />
        </AuthTemplate>
    );
};

export default LoginPage;