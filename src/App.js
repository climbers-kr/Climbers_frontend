import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";



function App() {
  return (
    <>
        <Route component={HomePage} path="/" exact/>
        <Route component={LoginPage} path="/login"/>
    </>
  );
}

export default App;
