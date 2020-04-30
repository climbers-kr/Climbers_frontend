import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';


const CHANGE_FIELD='auth/CHANGE_FIELD';
const INITIALIZE_FORM='auth/INITIALIZE_FORM';

const NEXT_STEP='auth/NEXT_STEP';


const [CHECK_USERNAME, CHECK_USERNAME_SUCCESS, CHECK_USERNAME_FAILURE] = createRequestActionTypes(
    'auth/CHECK_USERNAME',
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

export const register = createAction(REGISTER, ({ username, password }) => ({
    username,
    password,
}));

export const login = createAction(LOGIN, ({username, password}) => ({
    username,
    password,
}));

//사가 생성
const checkUsernameSaga = createRequestSaga(CHECK_USERNAME, authAPI.checkDuplicate);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
    yield takeLatest(CHECK_USERNAME, checkUsernameSaga);
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
    register: {
        phone: '',
        username: '',
        password: '',
        passwordConfirm: '',
        validationCode: null,
    },
    login: {
        username: '',
        password: '',
    },
    step: 1,
    usernameValidation: false,
    usernameValidationError: null,
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
                draft.usernameValidation=true;
        }),
        //회원가입 실패
        [CHECK_USERNAME_FAILURE]: (state, { payload: error }) =>
            produce(state, draft => {
                draft.usernameValidation=false;
                console.dir(error)
                draft.authError=error;
                /*
                const errorStatus=error.response.status;
                if(errorStatus===409){
                    draft.authError="이미 사용하고 있는 사용자 이름 입니다."
                } else {
                    draft.authError='잘못된 사용자 이름입니다. 영문자, 숫자를 사용한 형식만 가능합니다.'
                }*/
            }),
        [NEXT_STEP]: (state, { payload: auth }) => ({
            ...state,
            step: 2,
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