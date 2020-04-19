import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as centersAPI from '../../lib/api/centers';
import {takeLatest} from 'redux-saga/effects';

const [
    READ_CENTER,
    READ_CENTER_SUCCESS,
    READ_CENTER_FAILURE,
]=createRequestActionTypes('center/READ_CENTER');
const UNLOAD_CENTER='center/UNLOAD_CENTER'; //포스트 페이지에서 벗어날 때 데이터 비우기


export const readCenter=createAction(READ_CENTER, id=>id);
export const unloadCenter=createAction(UNLOAD_CENTER);

const readCenterSaga=createRequestSaga(READ_CENTER, centersAPI.readCenter);
export function* centerSaga(){
    yield takeLatest(READ_CENTER, readCenterSaga);
}

const initialState={
    center: null,
    error: null,
};

const center=handleActions(
    {
        [READ_CENTER_SUCCESS]: (state, {payload: center})=>({
            ...state,
            center,
        }),
        [READ_CENTER_FAILURE]: (state, {payload: error})=>({
            ...state,
            error,
        }),
        [UNLOAD_CENTER]: ()=>initialState,
    },
    initialState,
);

export default center;