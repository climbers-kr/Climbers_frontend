import {call, put} from 'redux-saga/effects';
import {startLoading, finishLoading} from "../modules/loading";

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type)); //로딩 시작
        console.dir(action.payload);
        try{
            const response =  yield call(request, action.payload);
            console.dir(response);
            yield put({
                type: SUCCESS,
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
        yield put(finishLoading(type)); //로딩 끝
    };
}