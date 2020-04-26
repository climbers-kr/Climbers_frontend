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
    WRITE_COMMENT,
    WRITE_COMMENT_SUCCESS,
    WRITE_COMMENT_FAILURE,
]=createRequestActionTypes('posts/WRITE_COMMENT');
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
    ({ index, key, value })=>({
        index,
        key, //comment, like
        value, //실제 바꾸려는 값
    }),
);
export const writeComment=createAction(WRITE_COMMENT, ({index, postId, comment})=> ({
    index,
    postId,
    comment,
}));
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

function* writeCommentSaga(action) {
    //Note: reaction 로딩 상태는 loading 모듈이 아닌 posts 배열 각각의 요소 내부에서 관리
    try{
        const response = yield call(postsAPI.writeComment, action.payload);
        console.dir(response);
        yield put({
            type: WRITE_COMMENT_SUCCESS,
            payload: {
                index: action.payload.index,
                comments: response.data,
            },
            meta: response,
        });
    }catch (e) {
        console.dir(e);

        yield put({
            type: WRITE_COMMENT_FAILURE,
            payload: {
                index: action.payload.index,
                postError: e,
            },
            error: true,
        });
    }
}
export function* postsSaga(){
    yield takeLatest(LIST_POSTS, listPostsSaga);
    yield takeLatest(SCROLL_BOTTOM, scrollBottomSaga);
    yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState={
    //Note: reaction 로딩 상태는 loading 모듈이 아닌 posts 배열 각각의 요소 내부에서 관리
    posts: null,
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
            ));
            return {
                ...state,
                posts: state.posts.concat(postsObject),
                page: state.page+1, //test
                lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
            }
        },
        [CHANGE_FIELD]: (state, { payload: { index, key, value }}) =>
            produce(state, draft => {
                draft.posts[index].reaction={
                    [key]: value,
                }
            }),
        //Note: reaction 로딩 상태는 loading 모듈이 아닌 posts 배열 각각의 요소 내부에서 관리
        [WRITE_COMMENT]: (state, {payload: {index}})=>
            produce(state, draft=> {
                draft.posts[index].commentsLoading=true; //로딩 시작
            }),
        [WRITE_COMMENT_SUCCESS]: (state, {payload: {index, comments}})=>
            produce(state, draft=> {
                console.dir(index);
                console.dir(comments);
                draft.posts[index].comments=comments;
                draft.posts[index].reaction={
                    comments: "",
                };
                draft.posts[index].commentsLoading=false; //로딩 끝
            }),
        [WRITE_COMMENT_FAILURE]: (state, {payload: {index, postError}}) =>
            produce(state, draft=> {
                console.log(index);
                console.log(postError);
                draft.posts[index].commentsLoading=false; //로딩 끝
                draft.error=postError;
        }),

    },
    initialState,
);

export default posts;