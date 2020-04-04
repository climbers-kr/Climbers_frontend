import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CenterListPage from "./pages/CenterListPage";
import CommunityPage from "./pages/CommunityPage";

import WritePage from "./pages/community/WritePage";


import PostListPage from "./pages/community/PostListPage";
import LoadingTestPage from "./pages/test/LoadingTestPage";
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
    return (
        <>

            <Route component={HomePage} path="/" exact/>
            <Route component={LoginPage} path="/login"/>
            <Route component={RegisterPage} path="/register"/>
            <Route component={CenterListPage} path="/centers"/>
            <Route component={CommunityPage} path="/community"/>
            <Route component={WritePage} path="/write"/>
            <Route component={PostListPage} path="/list"/>

            <Route component={LoadingTestPage} path="/test"/>
            <Route component={DashboardPage} path="/dashboard"/>
        </>
    );
}
export default App;