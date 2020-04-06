import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/community/posts';
import {takeLatest, call, put,select} from 'redux-saga/effects';
import {finishLoading, startLoading } from "./loading";

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
]=createRequestActionTypes('posts/LIST_POSTS');

const [
    READ_MORE,
    READ_MORE_SUCCESS,
    READ_MORE_FAILURE,
]=createRequestActionTypes('posts/READ_MORE');

const SCROLL_BOTTOM='posts/SCROLL_BOTTOM';

export const listPosts=createAction(
    LIST_POSTS,
    ({tag, username, page}) => ({tag, username, page}),
);

export const readMore=createAction(
    READ_MORE,
    ({tag, username, page}) => ({tag, username}),
);

export const scrollBottom=createAction(SCROLL_BOTTOM,
    ({tag, username, page}) => ({tag, username, page}),
);

const listPostsSaga=createRequestSaga(LIST_POSTS, postsAPI.listPosts);
const readMorePostsSaga=createRequestSaga(READ_MORE, postsAPI.listPosts);
/*
function* readMorePostsSaga(action){
    //export default function createRequestSaga(type, request) {
        const SUCCESS = `posts/READ_MORE_SUCCESS`;
        const FAILURE = `posts/READ_MORE_FAILURE`;

        //return function*(action) {
            yield put(startLoading(READ_MORE)); //로딩 시작
            console.dir(action.payload);

            try{
                const response =  yield call( postsAPI.listPosts, action.payload);
                console.dir(response);
                yield put({
                    type:SUCCESS,
                    payload: response.data,
                    meta: response,
                });
            }catch (e) {
                console.dir(e);
                yield put({
                    type: FAILURE,
                    payload: e,
                    error: true,
                });
            }
            yield put(finishLoading(READ_MORE)); //로딩 끝
        //};
    //}
}*/

function* scrollBottomSaga(action) {
    console.dir(action);
    const state=yield select();

    console.dir(state);
    const isLoading=state.loading['posts/LIST_POSTS'];
    const postsState=state.posts;
    if(!isLoading && postsState.posts && postsState.lastPage!==action.payload.page) {
        //Todo: lastPage 인 경우 다 읽었다고 띄우기, 스크롤 감지 멈추기
        console.dir(postsState.lastPage);
        console.dir(action.payload.page);
        yield call(readMorePostsSaga, action);
        //console.dir(response);
    }else {
        console.log('로딩 중');
    }
}
export function* postsSaga(){
    yield takeLatest(LIST_POSTS, listPostsSaga);
    yield takeLatest(SCROLL_BOTTOM, scrollBottomSaga);
}

const initialState={
    posts: null,
    error: null,
    lastPage: 1,
    page: 1, //Todo: backend api response 값으로 읽은 페이지 수 가져오기
};

const posts=handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, {payload: posts, meta: response}) => ({
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [READ_MORE_SUCCESS]: (state, {payload: posts, meta: response}) => ({
            ...state,
            posts: state.posts.concat(posts),
            lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
        }),
    },
    initialState,
);

export default posts;