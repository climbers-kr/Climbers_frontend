import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from "../containers/auth/RegisterFormContainer";


const RegisterPage=()=>{
    return (
        <AuthTemplate>
            <RegisterForm />
        </AuthTemplate>
    );
};

export default RegisterPage;