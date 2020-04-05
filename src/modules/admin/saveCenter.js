import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest, takeEvery, take, call, put, select } from 'redux-saga/effects';
import {finishLoading, startLoading} from "./loading";
import * as postsAPI from "../lib/api/community/posts";
import produce from "immer";

const initialState={
    imgQueue: {
        imgList: [],
        listToUpload: [], //Todo: 실패시 다시 업로드 시도
        imgCount: 0, //temp
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