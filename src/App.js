import React from 'react';
import {Route} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/common/CustomTheme'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CenterListPage from "./pages/centers/CenterListPage";
import CommunityPage from "./pages/community/CommunityPage";
import WritePage from "./pages/community/WritePage";

import VirtualizingTest from "./pages/test/VirtualizingTest";
import DashboardPage from "./pages/admin/DashboardPage";

import EditAccountPage from './pages/account/EditAccountPage';
import CenterPage from "./pages/centers/CenterPage";
import PostPage from "./pages/community/PostPage";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Route component={HomePage} path="/" exact/>
                <Route component={LoginPage} path="/login"/>
                <Route component={RegisterPage} path="/register"/>
                <Route component={CenterListPage} path="/centers" exact/>
                <Route component={CenterPage} path="/centers/:centerId" />

                <Route component={CommunityPage} path="/community" exact/>
                <Route component={PostPage} path="/community/@:username/:postId"/>

                <Route component={WritePage} path="/write"/>

                <Route component={EditAccountPage} path="/accounts/edit"/>
                <Route component={VirtualizingTest} path="/test"/>
                <Route component={DashboardPage} path="/dashboard"/>
                <Route path="/accounts">
                    <Route component={EditAccountPage} path="/edit"/>
                </Route>
            </ThemeProvider>

        </>
    );
}
export default App;
// <Route component={EditAccountPage} path="/accounts/edit"/>