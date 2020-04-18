import {combineReducers} from "redux";
import {all} from 'redux-saga/effects';
import auth, {authSaga} from './auth';
import loading from './loading';
import user, {userSaga} from './user';
import write, {writeSaga} from "./write";
import posts, {postsSaga} from "./posts";
import saveCenter, {saveCenterSaga} from "./admin/saveCenter";
import centerList, {centerListSaga} from "./centers/centerList";
import home, {homeSaga} from "./home";

const rootReducer=combineReducers({
    auth,
    loading,
    user,
    write,
    posts,
    saveCenter,
    centerList,
    home,
});


export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        writeSaga(),
        postsSaga(),
        saveCenterSaga(),
        centerListSaga(),
        homeSaga(),
    ]);
}


export default rootReducer;