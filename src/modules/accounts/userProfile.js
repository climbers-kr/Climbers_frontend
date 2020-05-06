import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from "../../lib/createRequestSaga";
import { takeLatest, takeEvery, take, call, put, select } from 'redux-saga/effects';
import {finishLoading, startLoading} from "../loading";
import * as usersAPI from "../../lib/api/user";
import produce from "immer";

const INITIALIZE='userProfile/INITIALIZE';
const SELECT_IMAGE='userProfile/SELECT_IMAGE';
const CHANGE_FIELD='userProfile/CHANGE_FIELD';

const [
    READ_PROFILE,
    READ_PROFILE_SUCCESS,
    READ_PROFILE_FAILURE,
] = createRequestActionTypes('userProfile/READ_PROFILE');
const [
    UPLOAD_QUEUE,
    UPLOAD_QUEUE_SUCCESS,
    UPLOAD_QUEUE_FAILURE,
] = createRequestActionTypes('userProfile/UPLOAD_QUEUE');

const UNLOAD_PROFILE='userProfile/UNLOAD_PROFILE'; //포스트 페이지에서 벗어날 때 데이터 비우기

export const initialize=createAction(INITIALIZE);

export const readProfile=createAction(READ_PROFILE, username => username);

export const unloadProfile=createAction(UNLOAD_PROFILE);

export const changeField=createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));

const readProfileSaga=createRequestSaga(READ_PROFILE, usersAPI.loadProfileByUsername);

export function* userProfileSaga() {
    yield takeLatest(READ_PROFILE, readProfileSaga);
}

const initialState={
    userProfile: null,
    profileError: null,
};

const userProfile=handleActions(
    {
        [INITIALIZE]: state=> initialState,
        [READ_PROFILE_SUCCESS]: (state, {payload: userProfile})=>({
            ...state,
            userProfile: userProfile, //특정 key 값을 업데이트
        }),
        [UNLOAD_PROFILE]: ()=>initialState,
    },
    initialState,
);

export default userProfile;