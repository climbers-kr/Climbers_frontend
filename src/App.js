import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/common/CustomTheme'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Community from './pages/community';
import Account from './pages/account';
import User from './pages/user';
import Centers from './pages/centers';
import VirtualizingTest from "./pages/test/VirtualizingTest";
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route component={HomePage} path="/" exact />

                    <Route component={LoginPage} path="/login" />

                    <Route component={RegisterPage} path="/register" />

                    <Route component={Centers} path="/centers" />

                    <Route component={Community} path="/community" />

                    <Route component={VirtualizingTest} path="/test" />

                    <Route component={DashboardPage} path="/dashboard" />

                    <Route component={User} path="/user" />

                    <Route component={Account} path="/accounts" />

                    <Route
                        render={({location})=>(
                            <div>
                                <h2>이 페이지는 존재하지 않습니다.</h2>
                                <p>{location.pathname}</p>
                            </div>
                        )}
                    />
                </Switch>
            </ThemeProvider>
        </>
    );
}
export default App;