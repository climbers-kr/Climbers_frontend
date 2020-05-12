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
const SELECT_IMAGE_CANCEL='userProfileEdit/SELECT_IMAGE_CANCEL';
const CHANGE_FIELD='userProfileEdit/CHANGE_FIELD';


const [
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
] = createRequestActionTypes('userProfileEdit/LOAD_PROFILE');
/*프로필 사진 변경*/
const [
    SAVE_IMAGE,
    SAVE_IMAGE_SUCCESS,
    SAVE_IMAGE_FAILURE,
] = createRequestActionTypes('userProfileEdit/SAVE_IMAGE');
/*포스트 폼 전체를 담당*/
const [
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
] = createRequestActionTypes('userProfileEdit/UPDATE_PROFILE');


export const initialize=createAction(INITIALIZE);

export const selectImage = createAction(SELECT_IMAGE, selectedImg => selectedImg);

export const selectImageCancel=createAction(SELECT_IMAGE_CANCEL);

export const saveImage = createAction(SAVE_IMAGE);

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

function* saveImageSaga(){
    const fileObject=yield select(state=> state.userProfileEdit.imgQueue.selectedImg);
    console.dir(fileObject)
    yield put(startLoading(SAVE_IMAGE));
    try{
        const response=yield call (authAPI.updateProfileImg, {
            fileObject
        });
        console.dir(response);
        console.dir(response.data.url);
        yield put({
            type: SAVE_IMAGE_SUCCESS,
            payload: response.data.url,
        });
    }catch(e){
        yield put({
            type: SAVE_IMAGE_FAILURE,
            payload: e,
            error: true,
        })
    }
    yield put(finishLoading(SAVE_IMAGE));
}

function* updateProfileSaga(action){
    console.dir(action)
    yield put(startLoading(UPDATE_PROFILE));
    const { imgList, body, tags, centerTag, category } = action.payload;


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
//const saveImageSaga=createRequestSaga(LOAD_PROFILE, authAPI.updateProfileImg);

export function* userProfileEditSaga() {
    yield takeLatest(LOAD_PROFILE, loadProfileSaga);
    yield takeLatest(SAVE_IMAGE, saveImageSaga);

}

const initialState={
    imgQueue: {
        selectedImg: null,
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
                if (selectedImg.name && selectedImg.name.match(/.(jpg|jpeg|png|gif)$/i) && (selectedImg.size <= 3*1024*1024)) {
                    draft.imgQueue.selectedImg=selectedImg;
                    draft.imgQueue.selectError=false;
                }else{
                    //Todo: 이미지 파일이 아닌 파일 선택하면 에러 메세지 보여주기
                    draft.imgQueue.selectError=true;
                }
            }),
        [SELECT_IMAGE_CANCEL]: (state) =>
            produce(state, draft => {
                draft.imgQueue.selectedImg=null;
            }),
        [SAVE_IMAGE_SUCCESS]: (state, {payload: url})=>
            produce(state, draft => {
                console.log(url)
                const queue = draft.imgQueue;
                queue.status = 'complete';
                queue.selectedImg = null;
                draft.profileImgUrl = url;
            }),
        [SAVE_IMAGE_FAILURE]: (state, {payload: queueError}) =>
            produce(state, draft=> {
                draft.imgQueue.queueError=queueError;
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
    },
    initialState,
);

export default userProfileEdit;