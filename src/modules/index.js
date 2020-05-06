import {combineReducers} from "redux";
import {all} from 'redux-saga/effects';
import auth, {authSaga} from './auth';
import loading from './loading';
import user, {userSaga} from './user';
import write, {writeSaga} from "./write";
import posts, {postsSaga} from "./posts";
import post, {postSaga} from "./post";
import saveCenter, {saveCenterSaga} from "./admin/saveCenter";
import centerList, {centerListSaga} from "./centers/centerList";
import home, {homeSaga} from "./home";
import center, {centerSaga} from "./centers/center";
import userProfileEdit, {userProfileEditSaga} from './accounts/userProfileEdit';
import userProfile, {userProfileSaga} from "./accounts/userProfile";

const rootReducer=combineReducers({
    auth,
    loading,
    user,
    write,
    posts,
    post,
    saveCenter,
    centerList,
    center,
    home,
    userProfileEdit,
    userProfile,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        writeSaga(),
        postsSaga(),
        postSaga(),
        saveCenterSaga(),
        centerListSaga(),
        centerSaga(),
        homeSaga(),
        userProfileEditSaga(),
        userProfileSaga(),
    ]);
}

export default rootReducer;