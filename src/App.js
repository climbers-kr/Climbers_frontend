import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CenterListPage from "./pages/CenterListPage";
import CommunityPage from "./pages/CommunityPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <>

        <Route component={HomePage} path="/" exact />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={CenterListPage} path="/centers" />
        <Route component={CommunityPage} path="/community" />
        <Route component={TestPage} path="/test" />
    </>
  );
}

export default App;
