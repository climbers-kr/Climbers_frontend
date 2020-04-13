import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CenterListPage from "./pages/centers/CenterListPage";
import CommunityPage from "./pages/community/CommunityPage";
import WritePage from "./pages/community/WritePage";

import VirtualizingTest from "./pages/test/VirtualizingTest";
import DashboardPage from "./pages/admin/DashboardPage";

import EditAccountPage from './pages/account/EditAccountPage';

function App() {
    return (
        <>

            <Route component={HomePage} path="/" exact/>
            <Route component={LoginPage} path="/login"/>
            <Route component={RegisterPage} path="/register"/>
            <Route component={CenterListPage} path="/centers"/>
            <Route component={CommunityPage} path="/community"/>
            <Route component={WritePage} path="/write"/>


            <Route component={VirtualizingTest} path="/test"/>
            <Route component={DashboardPage} path="/dashboard"/>
            <Route component={EditAccountPage} path="/accounts/edit"/>
        </>
    );
}
export default App;