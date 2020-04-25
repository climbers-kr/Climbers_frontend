import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/community/posts';
import {takeLatest} from 'redux-saga/effects';
import produce from "immer";

const [
    READ_POST,
    READ_POST_SUCCESS,
    READ_POST_FAILURE,
]=createRequestActionTypes('post/READ_POST');
const [
    WRITE_COMMENT,
    WRITE_COMMENT_SUCCESS,
    WRITE_COMMENT_FAILURE,
]=createRequestActionTypes('post/WRITE_COMMENT');

const CHANGE_FIELD='post/CHANGE_FIELD';

const UNLOAD_POST='post/UNLOAD_POST'; //포스트 페이지에서 벗어날 때 데이터 비우기

export const readPost=createAction(READ_POST, id=>id);
export const unloadPost=createAction(UNLOAD_POST);

export const changeField = createAction(
    CHANGE_FIELD,
    ({ key, value })=>({
        key, //comment, like
        value, //실제 바꾸려는 값
    }),
);

export const writeComment=createAction(WRITE_COMMENT, ({postId, comment})=> ({
    postId,
    comment,
}));

const readPostSaga=createRequestSaga(READ_POST, postsAPI.readPost);
const writeCommentSaga=createRequestSaga(WRITE_COMMENT, postsAPI.writeComment);


export function* postSaga(){
    yield takeLatest(READ_POST, readPostSaga);
    yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState={
    post: null,
    reaction: {
        commentInput: '',
        like: false,
    },
    error: null,
};

const post=handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { key, value }}) =>
            produce(state, draft => {
                draft.reaction[key]=value; //예 state.reaction.commentInput 바꾼다
            }),
        [READ_POST_SUCCESS]: (state, {payload: post})=>({
            ...state,
            post,
        }),
        [READ_POST_FAILURE]: (state, {payload: error})=>({
            ...state,
            error,
        }),
        [UNLOAD_POST]: ()=>initialState,
    },
    initialState,
);

export default post;