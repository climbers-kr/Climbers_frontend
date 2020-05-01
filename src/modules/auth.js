import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, call, put} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';
import * as postsAPI from "../lib/api/community/posts";


const CHANGE_FIELD='auth/CHANGE_FIELD';
const INITIALIZE_FORM='auth/INITIALIZE_FORM';

const [CHECK_USERNAME, CHECK_USERNAME_SUCCESS, CHECK_USERNAME_FAILURE] = createRequestActionTypes(
    'auth/CHECK_USERNAME',
);
const [CHECK_PHONE, CHECK_PHONE_SUCCESS, CHECK_PHONE_FAILURE] = createRequestActionTypes(
    'auth/CHECK_PHONE',
);
const [NEXT_STEP, NEXT_STEP_SUCCESS, NEXT_STEP_FAILURE] = createRequestActionTypes(
    'auth/NEXT_STEP',
);

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

export const requestPhoneAuth = createAction(PHONE_AUTH, phone => phone);

export const register = createAction(REGISTER, ({ username, password }) => ({
    username,
    password,
}));

export const login = createAction(LOGIN, ({username, password}) => ({
    username,
    password,
}));

function* goNextStepSaga(action) {
    console.log("goNextStepSaga called", action)
    //Todo: action.payload 에 들어가야 할것- phone
    try{
        const response=yield call (requestPhoneAuthSaga, action);

        console.dir(response);

        //Todo: step=2 변경
        //Todo: call request phone validation api
        return true;

    }catch(e){
        console.error(e);
        /*
        yield put({
            type: SAVE_FILE_FAILURE,
            payload: e,
            error: true,
        });*/
        return false;
    }
}

const checkUsernameSaga = createRequestSaga(CHECK_USERNAME, authAPI.checkUserConflict);
//const checkPhoneConflictSaga = createRequestSaga(CHECK_PHONE, authAPI.checkPhoneConflict);
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
        password: '',
        passwordConfirm: '',
        validationCode: '',
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
                draft.usernameValidationError=null;
                draft.usernameValidation=true;
        }),
        //회원가입 실패
        [CHECK_USERNAME_FAILURE]: (state, { payload: error }) =>
            produce(state, draft => {
                draft.usernameValidation=false;
                draft.usernameValidationError=error;
            }),
        [NEXT_STEP]: (state, { payload: auth }) =>
            produce(state, draft => {
                draft.step=2;
                draft.authError=null;
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