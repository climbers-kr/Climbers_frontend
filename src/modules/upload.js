import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, takeEvery, take, call, put} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as uploadAPI from '../lib/api/upload';
import {startLoading, finishLoading} from "../modules/loading";


const [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAILURE] = createRequestActionTypes(
    'upload/UPLOAD',
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
            type: UPLOAD,
            payload: {
                fileObject: imgList[i].file,
                curOrder: i,
            },
        });
    }
}

function* uploadSingleImage(action) {

    yield put(startLoading(UPLOAD));
    console.log('start UPLOAD');
   // console.dir(action.payload);
    try{
        const response =  yield call(uploadAPI.imageUpload, action.payload);

        yield put({
            type: UPLOAD_SUCCESS,
            payload: response.data,
            curOrder: action.payload.curOrder,
        });
        console.dir(response);
        console.dir(action.payload.curOrder);
    }catch(e){
        console.error(e);
        yield put({
            type: UPLOAD_FAILURE,
            payload: e,
            error: true,
        });
    }
    yield put(finishLoading(UPLOAD));
}

function onUploadSuccess(){
    console.log("success");
    //Todo: 업로드 완료된 이미지 프리뷰에 완료 표시, listCompleted에 추가, listToUpload에서 제거
}
/*
*
* */
export function* uploadSaga() {
    yield takeLatest(SUBMIT, uploadQueue);
    yield takeEvery(UPLOAD, uploadSingleImage);
    yield takeLatest(UPLOAD_SUCCESS, onUploadSuccess);
}

const initialState = {
    queue: {
        imgList: [],
        listToUpload: [],
        listCompleted: [],
        imgCount: 0,
        curOrder: 0,
        uploadedCount: 0,
        selectedImg: null,
        loadPercent: 0,
    },
    isSelected: false, //선택된 이미지 파일이 있는지
    resMessage: null,
    status: 'initial', //initial, pending, ready, complete, failure
    uploadError: null,
};

const upload = handleActions(
    {
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
                console.dir(selectedImg);
            draft.queue.imgList.push(selectedImg);
            draft.queue.imgCount++;
            draft.isSelected=true;
        }),
        [SUBMIT]: (state)=>({
            ...state,
            status: 'ready',
        }),
        [UPLOAD]: (state)=>({
            ...state,
            status: 'pending',
        }),
        [UPLOAD_SUCCESS]: (state)=>({
            ...state,
            status: 'ready',
        }),




    },
    initialState
);

export default upload;