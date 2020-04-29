import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider }from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from './modules';
import {tempSetUser, check} from './modules/user';


const sagaMiddleware = createSagaMiddleware();
const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
    try{
        const user=JSON.parse(localStorage.getItem('user'));
        if (!user) return; //로그인 상태가 아니라면 아무것도 안함

        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    }catch(e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
