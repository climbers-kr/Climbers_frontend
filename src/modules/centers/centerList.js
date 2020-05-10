import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as centersAPI from '../../lib/api/centers';
import {takeLatest, call, put, select} from 'redux-saga/effects';

const [
    LIST_CENTERS,
    LIST_CENTERS_SUCCESS,
    LIST_CENTERS_FAILURE,
]=createRequestActionTypes('centerList/LIST_CENTERS');

const [
    READ_MORE,
    READ_MORE_SUCCESS,
    READ_MORE_FAILURE,
]=createRequestActionTypes('centerList/READ_MORE');

const SCROLL_BOTTOM='centerList/SCROLL_BOTTOM';

export const listCenters=createAction(
    LIST_CENTERS,
    ({sido, sigungu, page}) => ({sido, sigungu, page}),
);

export const scrollBottom=createAction(SCROLL_BOTTOM,
    ({sido, sigungu}) => ({sido, sigungu}),
);

const listCentersSaga=createRequestSaga(LIST_CENTERS, centersAPI.listCenters);
const readMoreCentersSaga=createRequestSaga(READ_MORE, centersAPI.listCenters);

function* scrollBottomSaga(action) {
    console.dir(action);
    const state=yield select();

    console.dir(state);
    const isLoading=state.loading['centerList/LIST_CENTERS'];
    const centersState=state.centerList;
    if(!isLoading && centersState.centers && centersState.lastPage!==centersState.page) {
        //Todo: lastPage 인 경우 다 읽었다고 띄우기, 스크롤 감지 멈추기
        console.dir(centersState.lastPage);
        console.dir(centersState.page);
        console.dir(action.payload);

        yield call(readMoreCentersSaga, {
            payload: {
                ...action.payload,
                page: centersState.page+1,
            }
        });
    }else {
        console.log('로딩 중');
    }
}
export function* centerListSaga(){
    yield takeLatest(LIST_CENTERS, listCentersSaga);
    yield takeLatest(SCROLL_BOTTOM, scrollBottomSaga);
}

const initialState={
    sido: null, //시도
    sigungu: null, //시군구
    centers: null,
    search: '', //암장 이름 검색
    error: null,
    lastPage: 1,
    page: 1, //Todo: backend api response 값으로 읽은 페이지 수 가져오기
};

const centerList=handleActions(
    {
        [LIST_CENTERS_SUCCESS]: (state, {payload: centers, meta: response}) => ({
            ...state,
            centers,
            lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
        }),
        [LIST_CENTERS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [READ_MORE_SUCCESS]: (state, {payload: centers, meta: response}) => ({
            ...state,
            centers: state.centers.concat(centers),
            page: state.page+1, //test
            lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
        }),
    },
    initialState,
);

export default centerList;