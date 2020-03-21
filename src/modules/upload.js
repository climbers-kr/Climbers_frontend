import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, call, put} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";

import {useSelector} from 'react-redux';
import {startLoading, finishLoading} from "../modules/loading";
import * as authAPI from '../lib/api/auth';

const [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAILURE] = createRequestActionTypes(
    'upload/UPLOAD',
);

const SUBMIT='upload/SUBMIT';
const SELECT_IMAGE='upload/SELECT_IMAGE';

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const submitButton=createAction(SUBMIT);
function* uploadSingleImage(action) {
    yield put(startLoading(UPLOAD)); //로딩 시작
    try{
        const response =  yield call(authAPI.check, action.payload);
    }catch(e){

    }
}

function* uploadQueue(action){
    console.log("큐 시작");

    console.log(this.imgCount)
    if(this.imgCount){

    }
}
export function* uploadSaga() {
    yield takeLatest(SUBMIT, uploadQueue);
}
const testObject= {
    first: 'first field',
    second: 'second field',
}
const initialState = {
    queue: {
        imgList: [],
        uploadedList: null,
        imgCount: 0,
        curIndex: 0,
        uploadedCount: 0,
        selectedImg: null,
        loadPercent: 0,
        testObject: testObject,
    },
    resMessage: null,
    status: 'initial', //initial, pending, ready, complete
    uploadError: null,
    testObject: testObject,
    imgList2: [],
};

const upload = handleActions(
    {
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
            draft.queue.imgList.push(selectedImg);
            draft.queue.imgCount++;
        }),



    },
    initialState
);

export default upload;