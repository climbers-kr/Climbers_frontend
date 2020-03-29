import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from "../lib/createRequestSaga";
//import * as postsAPI from '../lib/api/posts';
import { takeLatest, takeEvery, take, call, put } from 'redux-saga/effects';
import {finishLoading, startLoading} from "./loading";

import * as writeAPI from "../lib/api/community/write";
import produce from "immer";

const INITIALIZE='write/INITIALIZE';

const SELECT_IMAGE='write/SELECT_IMAGE';


const CHANGE_FIELD='write/CHANGE_FIELD';
/*포스트 폼 전체를 담당*/
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

/*이미지 리스트 업로드 담당*/
const [
    UPLOAD_QUEUE,
    UPLOAD_QUEUE_SUCCESS,
    UPLOAD_QUEUE_FAILURE,
]= createRequestActionTypes('write/UPLOAD_QUEUE');

/*개별 이미지 파일 업로드 담당*/
const [
    SAVE_FILE,
    SAVE_FILE_SUCCESS,
    SAVE_FILE_FAILURE,
]= createRequestActionTypes('write/SAVE_FILE');

export const initialize=createAction(INITIALIZE);

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const changeField=createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));

export const writePost=createAction(WRITE_POST, ({imgList, body, tags})=> ({
    imgList,
    body,
    tags,
}));
//이미지 파일 리스트 업로드를 위한 큐
function* uploadQueueSaga(action){
    console.log("큐 시작");
    //curOrder 인덱스부터 배열 요소 하나씩 업로드
    const { imgCount, curOrder, imgList } = action.payload;
    console.dir(imgCount);
    console.dir(imgList);
    for(let i=curOrder; i< imgCount; i++){
        yield put({
            type: SAVE_FILE,
            payload: {
                fileObject: imgList[i].file,
                curOrder: i,
            },
        });
    }
}
//개별 파일 업로드
function* saveFileSaga(action) {

    yield put(startLoading(SAVE_FILE));
    console.log('start UPLOAD');
    // console.dir(action.payload);
    try{
        const response =  yield call(writeAPI.imageUpload, action.payload);
        console.dir(response);
        yield put({
            type: SAVE_FILE_SUCCESS,
            payload: {
                response: response.data,
                curOrder: action.payload.curOrder,
            },
        });
    }catch(e){
        console.error(e);
        yield put({
            type: SAVE_FILE_FAILURE,
            payload: e,
            error: true,
        });
    }
    yield put(finishLoading(SAVE_FILE));
}
function* onSaveFileSuccessSaga(action){
    console.log("success");
    //Todo: 업로드 완료된 이미지 프리뷰에 완료 표시, listCompleted에 추가, listToUpload에서 제거

}

const writePostSaga=createRequestSaga(WRITE_POST, writeAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, uploadQueueSaga);
}

const initialState={
    imgQueue: {
        imgList: [],
        listToUpload: [], //Todo: 실패시 다시 업로드 시도
        imgCount: 0,
        curOrder: 0,
        uploadedCount: 0,
        selectedImg: null,
        loadPercent: 0,
        status: 'initial', //initial, pending, ready, complete, failure,
        queueError: null,
    },
    body: '',
    tags: [],
    imgUrlList: [],
    hasImages: false, //선택된 이미지 파일이 있는지
    post: null,
    postError: null,
};

const write=handleActions(
    {
        [INITIALIZE]: state=> initialState,
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
                console.dir(selectedImg);
                draft.imgQueue.imgList.push(selectedImg);
                draft.imgQueue.imgCount++;
                draft.hasImages=true;
            }),
        [UPLOAD_QUEUE]: (state)=>
            produce(state, draft => {
                draft.queue.status='pending';
            }),
        [SAVE_FILE_SUCCESS]: (state, {payload: {curOrder, response}})=>
            produce(state, draft => {
                const queue=draft.imgQueue;
                queue.uploadedCount++;
                queue.imgList[curOrder].done=true;
                queue.listToUpload.splice(
                    queue.listToUpload.findIndex(item => item.id === curOrder),
                    1
                );
            }),
        [WRITE_POST]: (state, {payload: {imgList, imgCount}})=>
            produce(state, draft=> {
                const queue=draft.imgQueue;
                queue.status='ready';
                queue.listToUpload=imgList;
                //post, postError을 초기화
                draft.post=null;
                draft.postError=null;
            }),
        [CHANGE_FIELD]: (state, {payload: {key, value}})=>({
            ...state,
            [key]: value, //특정 key 값을 업데이트
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post})=> ({
            ...state,
            post,
        }),
        [WRITE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError,
        }),
    },
    initialState,
);

export default write;