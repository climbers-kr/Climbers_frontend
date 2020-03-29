import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CenterListPage from "./pages/CenterListPage";
import CommunityPage from "./pages/CommunityPage";
import TestPage from "./pages/TestPage";
import WritePage from "./pages/community/WritePage";

import WritePostPage_temp from "./pages/community/WritePostPage_temp";

function App() {
    return (
        <>

            <Route component={HomePage} path="/" exact/>
            <Route component={LoginPage} path="/login"/>
            <Route component={RegisterPage} path="/register"/>
            <Route component={CenterListPage} path="/centers"/>
            <Route component={CommunityPage} path="/community"/>
            <Route component={TestPage} path="/test"/>
            <Route component={WritePage} path="/write"/>
            <Route component={WritePostPage_temp} path="/newPost"/>
        </>
    );
}
export default App;