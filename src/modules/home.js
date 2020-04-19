import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import {takeLatest, call, put,select} from 'redux-saga/effects';
import * as centersAPI from '../lib/api/centers';

const [
    LIST_CENTERS,
    LIST_CENTERS_SUCCESS,
    LIST_CENTERS_FAILURE,
]=createRequestActionTypes('home/LIST_CENTERS');


export const listCenters=createAction(
    LIST_CENTERS,
    ({sido, sigungu, page}) => ({sido, sigungu, page}),
);

const listCentersSaga=createRequestSaga(LIST_CENTERS, centersAPI.listCenters);


export function* homeSaga(){
    yield takeLatest(LIST_CENTERS, listCentersSaga);

}

const initialState={
    sido: null, //시도
    sigungu: null, //시군구
    centers: null,
    events: null,
    feeds: null,
    centerError: null,
};
const home=handleActions(
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

    },
    initialState,
);

export default home;