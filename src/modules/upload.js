import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, takeEvery, take, call, put} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as uploadAPI from '../lib/api/upload';
import {startLoading, finishLoading} from "../modules/loading";

//UPLOAD=> 이미지 파일 업로드, PUBLISH
const [UPLOAD_SINGLE_IMG, UPLOAD_SINGLE_IMG_SUCCESS, UPLOAD_SINGLE_IMG_FAILURE] = createRequestActionTypes(
    'upload/UPLOAD_SINGLE_IMG',
);

const SUBMIT='upload/SUBMIT';
const SELECT_IMAGE='upload/SELECT_IMAGE';

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const submitImageList=createAction(SUBMIT, ({ imgCount, curOrder, imgList }) => ({
    imgCount,
    curOrder,
    imgList,
}));

function* uploadQueue(action){
    console.log("큐 시작");
    //curOrder 인덱스부터 배열 요소 하나씩 업로드
    const { imgCount, curOrder, imgList } = action.payload;
    console.dir(imgCount);
    console.dir(imgList);
    for(let i=curOrder; i< imgCount; i++){
        yield put({
            type: UPLOAD_SINGLE_IMG,
            payload: {
                fileObject: imgList[i].file,
                curOrder: i,
            },
        });
    }
}

function* uploadSingleImage(action) {

    yield put(startLoading(UPLOAD_SINGLE_IMG));
    console.log('start UPLOAD');
   // console.dir(action.payload);
    try{
        const response =  yield call(uploadAPI.imageUpload, action.payload);
        console.dir(response);
        yield put({
            type: UPLOAD_SINGLE_IMG_SUCCESS,
            payload: {
                response: response.data,
                curOrder: action.payload.curOrder,
            },
        });
    }catch(e){
        console.error(e);
        yield put({
            type: UPLOAD_SINGLE_IMG_FAILURE,
            payload: e,
            error: true,
        });
    }
    yield put(finishLoading(UPLOAD_SINGLE_IMG));
}

function onUploadSingleImgSuccess(action){
    console.log("success");
    //Todo: 업로드 완료된 이미지 프리뷰에 완료 표시, listCompleted에 추가, listToUpload에서 제거

}
/*
*
* */
export function* uploadSaga() {
    yield takeLatest(SUBMIT, uploadQueue);
    yield takeEvery(UPLOAD_SINGLE_IMG, uploadSingleImage);
    yield takeEvery(UPLOAD_SINGLE_IMG_SUCCESS, onUploadSingleImgSuccess);
}

const initialState = {
    queue: {
        imgList: [],
        listToUpload: [], //Todo: 실패시 다시 업로드 시도
        imgCount: 0,
        curOrder: 0,
        uploadedCount: 0,
        selectedImg: null,
        loadPercent: 0,
        status: 'initial', //initial, pending, ready, complete, failure
    },
    title: '',
    body: '',
    tags: [],
    hasImages: false, //선택된 이미지 파일이 있는지
    resMessage: null,
    uploadError: null,
};

const upload = handleActions(
    {
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
                console.dir(selectedImg);
            draft.queue.imgList.push(selectedImg);
            draft.queue.imgCount++;
            draft.hasImages=true;
        }),
        [SUBMIT]: (state, {payload: {imgList, imgCount}})=>
            produce(state, draft=> {
                const queue=draft.queue;

                queue.status='ready';
                queue.listToUpload=imgList;
            }),
        [UPLOAD_SINGLE_IMG]: (state)=>
            produce(state, draft => {
                draft.queue.status='pending';
            }),
        [UPLOAD_SINGLE_IMG_SUCCESS]: (state, {payload: {curOrder, response}})=>
            produce(state, draft => {
                const queue=draft.queue;
                //queue.status='ready';
                queue.uploadedCount++;
                queue.imgList[curOrder].done=true;
                queue.listToUpload.splice(
                    queue.listToUpload.findIndex(item => item.id === curOrder),
                    1
                );

            }),

    },
    initialState
);

export default upload;