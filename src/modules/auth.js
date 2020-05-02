import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, call, put} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD='auth/CHANGE_FIELD';
const INITIALIZE_FORM='auth/INITIALIZE_FORM';

const [CHECK_USERNAME, CHECK_USERNAME_SUCCESS, CHECK_USERNAME_FAILURE] = createRequestActionTypes(
    'auth/CHECK_USERNAME',
);

const [NEXT_STEP, NEXT_STEP_SUCCESS, NEXT_STEP_FAILURE] = createRequestActionTypes(
    'auth/NEXT_STEP',
);

const BACK_STEP = 'auth/BACK_STEP';

const [PHONE_AUTH, PHONE_AUTH_SUCCESS, PHONE_AUTH_FAILURE] = createRequestActionTypes(
    'auth/PHONE_AUTH',
);

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN',
);


export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value })=>({
        form, //register, login
        key, //username(email), password, passwordConfirm
        value, //실제 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); //register, login

export const checkUsername=createAction(CHECK_USERNAME, username => username);

export const goNextStep = createAction(NEXT_STEP);

export const goBackStep = createAction(BACK_STEP);

export const requestPhoneAuth = createAction(PHONE_AUTH, phone => phone);

export const register = createAction(REGISTER, ({ phone, username, name, password, validationCode }) => ({
    phone,
    username,
    name,
    password,
    validationCode,
}));

export const login = createAction(LOGIN, ({username, password}) => ({
    username,
    password,
}));

const checkUsernameSaga = createRequestSaga(CHECK_USERNAME, authAPI.checkUserConflict);
const requestPhoneAuthSaga= createRequestSaga(PHONE_AUTH, authAPI.requestPhoneAuth);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
    yield takeLatest(CHECK_USERNAME, checkUsernameSaga);
    //yield takeLatest(NEXT_STEP, goNextStepSaga);
    yield takeLatest(PHONE_AUTH, requestPhoneAuthSaga);
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
    register: {
        phone: '',
        username: '',
        name: '',
        password: '',
        passwordConfirm: '',
        validationCode: '',
        validationCodeTimer: '',
    },
    login: {
        username: '',
        password: '',
    },
    step: 1,
    usernameValidation: false,
    usernameValidationError: null,
    smsValidationError: null,
    auth: null,
    authError: null,
};

const auth=handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: {form, key, value} }) =>
            produce(state, draft => {
                draft[form][key]=value; //예 state.register.username을 바꾼다
            }),
        [INITIALIZE_FORM]: (state, { payload: form })=> ({
            ...state,
            [form]: initialState[form],
            authError: null, //폼 전환 시 회원 인증 에러 초기화
        }),
        //회원가입 성공
        [CHECK_USERNAME_SUCCESS]: (state) =>
            produce(state, draft => {
                draft.usernameValidationError=null;
                draft.usernameValidation=true;
        }),
        //회원가입 실패
        [CHECK_USERNAME_FAILURE]: (state, { payload: error }) =>
            produce(state, draft => {
                draft.usernameValidation=false;
                draft.usernameValidationError=error;
            }),
        [NEXT_STEP]: (state) =>
            produce(state, draft => {
                draft.step=2;
                draft.authError=null;
            }),
        [BACK_STEP]: (state) =>
            produce(state, draft => {
                draft.step=1;
            }),
        [PHONE_AUTH]:(state) =>
            produce(state, draft => {
                draft.register.validationCodeTimer=new Date().getTime();
            }),
        [PHONE_AUTH_SUCCESS]: (state, { payload: response }) =>
            produce(state, draft => {
                draft.usernameValidationError=null;
                draft.usernameValidation=true;
            }),
        //회원가입 성공
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth, //response.data
        }),
        //회원가입 실패
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        //로그인 성공
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        //로그인 실패
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;