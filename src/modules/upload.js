import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, call, put} from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as uploadAPI from '../lib/api/upload';
import {useSelector} from 'react-redux';
import {startLoading, finishLoading} from "../modules/loading";


const [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAILURE] = createRequestActionTypes(
    'upload/UPLOAD',
);

const SUBMIT='upload/SUBMIT';
const SELECT_IMAGE='upload/SELECT_IMAGE';

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const submitImageList=createAction(SUBMIT, ({ imgCount, imgList }) => ({
    imgCount,
    imgList,
}));

function* uploadSingleImage(action) {

    yield put(startLoading(UPLOAD)); //로딩 시작

    console.log('start UPLOAD');
    console.dir(action.payload);

    const fileObject=action.payload;
    const trackProcess=(progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(progressEvent.lengthComputable);
        console.log(percentCompleted);

    }
    console.dir({fileObject, trackProcess});
    const param={
        fileObject: fileObject,
        trackProcess: trackProcess,
    };
    try{
        const response =  yield call(uploadAPI.imageUpload, param);
        console.dir(response);
    }catch(e){

    }
}

function* uploadQueue(action){
    console.log("큐 시작");
    const { imgCount, imgList } = action.payload;
    console.dir(imgCount);
    console.dir(imgList);
    for(let i=0; i< imgCount; i++){
        const fileObject= imgList[i].file;
        //const formData = new FormData();
        //formData.append('imgCollection', fileObject);
        yield put({
            type: UPLOAD,
            payload: fileObject,
        });
    }

}
/*
*
* */
export function* uploadSaga() {
    yield takeLatest(SUBMIT, uploadQueue);
    yield takeLatest(UPLOAD, uploadSingleImage);
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
    },
    resMessage: null,
    status: 'initial', //initial, pending, ready, complete
    uploadError: null,
};

const upload = handleActions(
    {
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
                console.dir(selectedImg)
            draft.queue.imgList.push(selectedImg);
            draft.queue.imgCount++;
        }),
        [SUBMIT]: (state)=>({
            ...state,
            status: 'ready',
        }),
        [UPLOAD]: (state)=>({
            ...state,
            status: 'pending',
        }),




    },
    initialState
);

export default upload;