import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes,} from "../../lib/createRequestSaga";
import * as saveAPI from '../../lib/api/admin/saveCenter';
import {finishLoading, startLoading} from "../loading";

const INITIALIZE='saveCenter/INITIALIZE';
const SELECT_IMAGE='saveCenter/SELECT_IMAGE';
const CHANGE_FIELD='saveCenter/CHANGE_FIELD';
const SET_LOCATION='saveCenter/SET_LOCATION';

const [
    UPLOAD_QUEUE,
    UPLOAD_QUEUE_SUCCESS,
    UPLOAD_QUEUE_FAILURE,
] = createRequestActionTypes('saveCenter/UPLOAD_QUEUE');
/*포스트 폼 전체를 담당*/
const [
    SAVE_CENTER,
    SAVE_CENTER_SUCCESS,
    SAVE_CENTER_FAILURE,
] = createRequestActionTypes('saveCenter/SAVE_CENTER');

/*개별 이미지 파일 업로드 담당*/
const [
    SAVE_FILE,
    SAVE_FILE_SUCCESS,
    SAVE_FILE_FAILURE,
]= createRequestActionTypes('saveCenter/SAVE_FILE');

export const initialize=createAction(INITIALIZE);

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const changeField=createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));

export const setLocation=createAction(SET_LOCATION, ({data}) => ({
    data,
}));
export const saveCenterRequest=createAction(
    SAVE_CENTER,
    (data)=> (data));

//이미지 파일 리스트 업로드를 위한 큐
function* uploadQueueSaga(imgList){
    console.log("큐 시작");

    for(let i=0; i< imgList.length; i++){
        console.dir(imgList[i]);
        const response=yield call (saveFileSaga, {
            type: SAVE_FILE,
            payload: {
                fileObject: imgList[i].file,
                curOrder: i,
            },
        });
        if(!response){
            yield put({
                type: UPLOAD_QUEUE_FAILURE
            });
            return false;
        }
    }
    yield put({
        type: UPLOAD_QUEUE_SUCCESS
    });
    return true;
}
//개별 파일 업로드
function* saveFileSaga(action) {

    try{
        const response = yield call(saveAPI.imageUpload, action.payload);
        console.dir(response);console.dir(response.data.url);
        yield put({
            type: SAVE_FILE_SUCCESS,
            payload: {
                url: response.data.url,
                curOrder: action.payload.curOrder,
            },
        });
        return true;

    }catch(e){
        console.error(e);
        yield put({
            type: SAVE_FILE_FAILURE,
            payload: e,
            error: true,
        });
        return false;
    }
}

function* saveCenterRequestSaga(action){
    console.dir(action);
    yield put(startLoading(SAVE_CENTER));
    const { imgList } = action.payload;
    delete action.payload.imgList;

    if(imgList.length !== 0){

        const isUploaded=yield call (uploadQueueSaga, imgList);
        if(!isUploaded) {
            yield put({
                type: SAVE_CENTER_FAILURE,
                payload: 'IMAGE UPLOAD QUEUE ERROR'
            });
            return -1;
        }
    }
    const imgUrlList=yield select(state=> state.saveCenter.imgUrlList);
    action.payload.imgUrlList=imgUrlList;
    console.dir(action.payload);

    try{
        const response=yield call (saveAPI.saveCenter, action.payload);
        console.dir(response);
        yield put({
            type: SAVE_CENTER_SUCCESS,
            payload: response.data,
        });
    }catch(e){
        yield put({
            type: SAVE_CENTER_FAILURE,
            payload: e,
            error: true,
        })
    }
    yield put(finishLoading(SAVE_CENTER));
}

//사가 생성
export function* saveCenterSaga(){
    yield takeLatest(SAVE_CENTER, saveCenterRequestSaga);
    yield takeLatest(UPLOAD_QUEUE, uploadQueueSaga);
}

const initialState={
    imgQueue: {
        imgList: [],
        listToUpload: [], //Todo: 실패시 다시 업로드 시도
        imgCount: 0, //temp
        uploadedCount: 0,
        selectedImg: null,
        status: 'initial', //initial, pending, ready, complete, failure,
        queueError: null,
    },
    title: '',
    location: '',
    locationDetail: '',
    locationObject: null,
    sites: [],
    prices: [],
    contact: '',
    time: '',
    imgUrlList: [],
    hasParking: false,
    facility: [],
    imageSource:[],
    hasImages: false, //선택된 이미지 파일이 있는지
    post: null,
    postError: null,
};

const saveCenter=handleActions(
    {
        [INITIALIZE]: state=> initialState,
        [CHANGE_FIELD]: (state, {payload: {key, value}})=>({
            ...state,
            [key]: value, //특정 key 값을 업데이트
        }),
        [SET_LOCATION]: (state, {payload: {data}})=>{
            let fullAddress = data.address;
            let extraAddress = '';

            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            return {
            ...state,
            locationObject: data,
            location: fullAddress,
        }},
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
                console.dir(selectedImg);
                if (selectedImg.file.name && selectedImg.file.name.match(/.(jpg|jpeg|png)$/i)) {
                    //파일 확장자 검증
                    draft.imgQueue.imgList.push(selectedImg);
                    draft.imgQueue.imgCount++;
                    draft.hasImages=true;
                }else{
                    //Todo: 이미지 파일이 아닌 파일 선택하면 에러 메세지 보여주기
                    console.log("ONLY IMAGE FILE ACCECPTED");
                }
            }),
        [SAVE_FILE_SUCCESS]: (state, {payload: {url, curOrder}})=>
            produce(state, draft => {
                const queue=draft.imgQueue;
                queue.uploadedCount++;
                queue.imgList[curOrder].done=true;
                queue.listToUpload.splice(
                    queue.listToUpload.findIndex(item => item.id === curOrder),
                    1
                );
                draft.imgUrlList[curOrder]=url;
            }),
        [SAVE_CENTER]: (state, {payload: {imgList}})=>
            produce(state, draft=> {
                const queue=draft.imgQueue;
                queue.status='ready';
                queue.listToUpload=imgList;
                //post, postError을 초기화
                draft.post=null;
                draft.postError=null;
            }),
        [SAVE_CENTER_SUCCESS]: (state, {payload: post})=>
            produce(state, draft=> {
                draft.post=post;
            }),
        [SAVE_CENTER_FAILURE]: (state, {payload: postError}) => produce(state, draft=> {
            draft.postError=postError;
        }),
        [UPLOAD_QUEUE_SUCCESS]: (state)=>
            produce(state, draft=> {
                draft.imgQueue.status='complete';
            }),
        [UPLOAD_QUEUE_FAILURE]: (state)=>
            produce(state, draft=> {
                draft.imgQueue.status='failure';
            }),
    },
    initialState,
);

export default saveCenter;