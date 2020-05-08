import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from "../../lib/createRequestSaga";
import { takeLatest, takeEvery, take, call, put, select } from 'redux-saga/effects';
import {finishLoading, startLoading} from "../loading";
import * as authAPI from "../../lib/api/auth";
import produce from "immer";

const INITIALIZE='userProfileEdit/INITIALIZE';
const SELECT_IMAGE='userProfileEdit/SELECT_IMAGE';
const CHANGE_FIELD='userProfileEdit/CHANGE_FIELD';

const [
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
] = createRequestActionTypes('userProfileEdit/LOAD_PROFILE');
const [
    UPLOAD_QUEUE,
    UPLOAD_QUEUE_SUCCESS,
    UPLOAD_QUEUE_FAILURE,
] = createRequestActionTypes('userProfileEdit/UPLOAD_QUEUE');
/*포스트 폼 전체를 담당*/
const [
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
] = createRequestActionTypes('userProfileEdit/UPDATE_PROFILE');


/*개별 이미지 파일 업로드 담당*/
const [
    SAVE_FILE,
    SAVE_FILE_SUCCESS,
    SAVE_FILE_FAILURE,
]= createRequestActionTypes('userProfileEdit/SAVE_FILE');

export const initialize=createAction(INITIALIZE);

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const loadProfile=createAction(LOAD_PROFILE);

export const changeField=createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));

export const writePost=createAction(UPDATE_PROFILE, ({imgList, body, tags , centerTag, category})=> ({
    imgList,
    body,
    tags,
    centerTag,
    category,
}));
//이미지 파일 리스트 업로드를 위한 큐
function* uploadQueueSaga(selectedImg){
    console.log("큐 시작");

        console.dir(selectedImg);
        const response=yield call (saveFileSaga, {
            type: SAVE_FILE,
            payload: {
                fileObject: selectedImg.file,
            },
        });
        if(!response){
            yield put({
                type: UPLOAD_QUEUE_FAILURE
            });
            return false;
        }
    yield put({
        type: UPLOAD_QUEUE_SUCCESS
    });
    return true;
}
//개별 파일 업로드
function* saveFileSaga(action) {
    try{
        const response = yield call(authAPI.updateProfileImg, action.payload);
        console.dir(response);console.dir(response.data.url);
        yield put({
            type: SAVE_FILE_SUCCESS,
            payload: {
                url: response.data.url,
                //curOrder: action.payload.curOrder,
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

function* updateProfileSaga(action){
    console.dir(action)
    yield put(startLoading(UPDATE_PROFILE));
    const { imgList, body, tags, centerTag, category } = action.payload;

    if(imgList.length !== 0){
        const isUploaded=yield call (uploadQueueSaga, imgList);
        if(!isUploaded) {
            yield put({
                type: UPDATE_PROFILE_FAILURE,
                payload: 'IMAGE UPLOAD QUEUE ERROR'
            });
            return -1;
        }
    }
    const imgUrlList=yield select(state=> state.write.imgUrlList);

    try{
        const response=yield call (authAPI.updateProfile, {
            imgUrlList,
            body,
            tags,
            centerTag,
            category,
        });
        console.dir(response);
        yield put({
            type: UPDATE_PROFILE_SUCCESS,
            payload: response.data,
        });
    }catch(e){
        yield put({
            type: UPDATE_PROFILE_FAILURE,
            payload: e,
            error: true,
        })
    }
    yield put(finishLoading(UPDATE_PROFILE));

}
const loadProfileSaga=createRequestSaga(LOAD_PROFILE, authAPI.loadProfile);

export function* userProfileEditSaga() {
    yield takeLatest(LOAD_PROFILE, loadProfileSaga);
    yield takeLatest(UPLOAD_QUEUE, uploadQueueSaga);

}

const initialState={
    imgQueue: {
        selectedImg: null,
        imageToUpload: null,
        selectError: null,
        status: 'initial', //initial, pending, ready, complete, failure,
        queueError: null,
    },
    username: '',
    phone: '',
    name: '',
    sex: '',
    lv: '',
    introduction: '',
    location: '',
    profileImgUrl: null,
    profile: null,
    profileError: null,
};

const userProfileEdit=handleActions(
    {
        [INITIALIZE]: state=> initialState,
        [LOAD_PROFILE_SUCCESS]: (state, {payload: profile})=>({
            ...state,
            phone: profile.phone,
            name: profile.name,
            sex: profile.sex,
            lv: profile.lv,
            introduction: profile.introduction,
            location: profile.location,
            profileImgUrl: profile.profileImgUrl,
        }),
        [CHANGE_FIELD]: (state, {payload: {key, value}})=>({
            ...state,
            [key]: value, //특정 key 값을 업데이트
        }),
        [SELECT_IMAGE]: (state, { payload: selectedImg }) =>
            produce(state, draft => {
                console.dir(selectedImg);
                if (selectedImg.file.name && selectedImg.file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                    //파일 확장자 검증
                    //draft.imgQueue.imgList.push(selectedImg);
                    //draft.imgQueue.imgCount++;
                    //draft.hasImages=true;
                    draft.imgQueue.imageToUpload=selectedImg;
                }else{
                    //Todo: 이미지 파일이 아닌 파일 선택하면 에러 메세지 보여주기
                    console.log("ONLY IMAGE FILE ACCECPTED");
                    draft.imgQueue.selectError=true;
                }
            }),
        [SAVE_FILE_SUCCESS]: (state, {payload: {url, curOrder}})=>
            produce(state, draft => {
                const queue=draft.imgQueue;
                queue.status='complete';
                queue.uploadedCount++;
                //queue.imgList[curOrder].done=true;
                /*
                queue.listToUpload.splice(
                    queue.listToUpload.findIndex(item => item.id === curOrder),
                    1
                );
                draft.imgUrlList[curOrder]=url;*/
            }),
        [UPDATE_PROFILE]: (state, {payload: {imgList}})=>
            produce(state, draft=> {
                const queue=draft.imgQueue;
                queue.status='ready';
                queue.listToUpload=imgList;
                //post, postError을 초기화
                draft.post=null;
                draft.postError=null;
            }),
        [UPDATE_PROFILE_SUCCESS]: (state, {payload: post})=>
            produce(state, draft=> {
                draft.post=post;
            }),
        [UPDATE_PROFILE_FAILURE]: (state, {payload: postError}) => produce(state, draft=> {
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

export default userProfileEdit;