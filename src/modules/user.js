import {createAction, handleActions} from 'redux-actions';
import {takeLatest, call, put} from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import {createRequestActionTypes} from "../lib/createRequestSaga";
import {startLoading, finishLoading} from "../modules/loading";


const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로코침 이후 임시 로그인 처리
//회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);
const CHECK_TEMP_FAILURE='user/CHECK_TEMP_FAILURE';
const LOGOUT= 'user/LOGOUT';


export const tempSetUser = createAction(TEMP_SET_USER, user=>user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);


function* checkSaga(action) {
    yield put(startLoading(CHECK)); //로딩 시작
    try{
        const response =  yield call(authAPI.check, action.payload);
        yield put({
            type: CHECK_SUCCESS,
            payload: response.data,
        });
    }catch (e) {
        console.dir(e);
        if(!e.response){
            //handle Error: Request aborted
            yield put({
                type: CHECK_TEMP_FAILURE,
                payload: e,
                error: true,
            });
        }else{
            const errorStatus=e.response.status;
            console.log('errorStatus--',errorStatus);
            if(errorStatus === 401 || 403){
                yield put({
                    type: CHECK_FAILURE,
                    payload: e,
                    error: true,
                });
            }
        }
    }
    yield put(finishLoading(CHECK)); //로딩 끝
}

function checkFailureSaga() {
    try{
        localStorage.removeItem('user'); //localstorage에서 user를 제거
    } catch (e) {
        console.log('localStorage is not working');
    }
}



function* logoutSaga() {
    try{
        yield call(authAPI.logout); //logout API 호출
        localStorage.removeItem('user'); //localstorage 에서 user 제거
    }catch(e){
        console.log(e);
    }
}


export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    user: null,
    checkError: null,
};

export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_TEMP_FAILURE]: (state, { payload: error }) => ({
            ...state,
            checkError: error,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        }),
    },
    initialState,
);