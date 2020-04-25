import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/community/posts';
import {takeLatest, call, put,select} from 'redux-saga/effects';
import produce from "immer";

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
]=createRequestActionTypes('posts/LIST_POSTS');
const [
    GET_POSTS_COMMENTS,
    GET_POSTS_COMMENTS_SUCCESS,
    GET_POSTS_COMMENTS_FAILURE,
]=createRequestActionTypes('posts/GET_POSTS_COMMENTS');
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
const CHANGE_FIELD='posts/CHANGE_FIELD';

export const scrollBottom=createAction(SCROLL_BOTTOM,
    ({tag, username}) => ({tag, username}),
);

const listPostsSaga=createRequestSaga(LIST_POSTS, postsAPI.listPosts);

const readMorePostsSaga=createRequestSaga(READ_MORE, postsAPI.listPosts);

export const changeField = createAction(
    CHANGE_FIELD,
    ({ id, key, value })=>({
        id, //postId
        key, //comment, like
        value, //실제 바꾸려는 값
    }),
);

function* scrollBottomSaga(action) {
    console.dir(action);
    const state=yield select();

    console.dir(state);
    const isLoading=state.loading['posts/LIST_POSTS'];
    const postsState=state.posts;
    if(!isLoading && postsState.posts && postsState.lastPage!==postsState.page) {
        //Todo: lastPage 인 경우 다 읽었다고 띄우기, 스크롤 감지 멈추기
        console.dir(postsState.lastPage);
        console.dir(postsState.page);
        console.dir(action.payload);

        yield call(readMorePostsSaga, {
            payload: {
                ...action.payload,
                page: postsState.page+1,
            }
        });
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
    reaction: {},
    error: null,
    lastPage: 1,
    page: 1, //Todo: backend api response 값으로 읽은 페이지 수 가져오기
};

const posts=handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, {payload: posts, meta: response}) => {
            const postsObject=posts.map(({comments, ...post})=>(
                {
                    postContent: {...post},
                    comments: comments,
                }
            )); //comments 배열과 그 외의 프로퍼티 분리

            return {
                ...state,
                posts :postsObject,
                lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
            }
        },
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [READ_MORE_SUCCESS]: (state, {payload: posts, meta: response}) => {
            const postsObject=posts.map(({comments, ...post})=>(
                {
                    postContent: {...post},
                    comments: comments,
                }
            )); //comments 배열과 그 외의 프로퍼티 분리
            //console.dir(postsObject);
            return {
                ...state,
                posts: state.posts.concat(postsObject),
                page: state.page+1, //test
                lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
            }
        },
        [CHANGE_FIELD]: (state, { payload: { id, key, value }}) =>
            produce(state, draft => {
                draft.reaction[id]={
                    [key]: value,
                } //예 state.reaction.commentInput 바꾼다
            }),

    },
    initialState,
);

export default posts;