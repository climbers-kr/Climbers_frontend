import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
        <Route component={HomePage} path="/" exact />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
    </>
  );
}

export default App;
