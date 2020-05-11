import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import {takeLatest, call, put,select} from 'redux-saga/effects';
import * as centersAPI from '../lib/api/centers';
import * as postsAPI from '../lib/api/community/posts';

const [
    LIST_CENTERS,
    LIST_CENTERS_SUCCESS,
    LIST_CENTERS_FAILURE,
]=createRequestActionTypes('home/LIST_CENTERS');

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
]=createRequestActionTypes('home/LIST_POSTS');

export const listCenters=createAction(
    LIST_CENTERS,
    ({sido, sigungu, page}) => ({sido, sigungu, page}),
);

export const listPosts=createAction(
    LIST_POSTS,
    ({tag, username, category}) => ({tag, username, category}),
);

const listCentersSaga=createRequestSaga(LIST_CENTERS, centersAPI.listCenters);
const listPostsSaga=createRequestSaga(LIST_POSTS, postsAPI.listPosts);

export function* homeSaga(){
    yield takeLatest(LIST_CENTERS, listCentersSaga);
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState={
    sido: null, //시도
    sigungu: null, //시군구
    centers: null,
    posts: null,
    events: null,
    feeds: null,
    centerError: null,
    postsError: null,
};
const home=handleActions(
    {
        [LIST_CENTERS_SUCCESS]: (state, {payload: centers}) => ({
            ...state,
            centers,
        }),
        [LIST_CENTERS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [LIST_POSTS_SUCCESS]: (state, {payload: posts}) => ({
            ...state,
            posts,
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default home;