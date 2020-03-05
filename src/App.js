import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";



function App() {
  return (
    <>
        <Route component={HomePage} path="/" exact/>
        <Route component={SecondPage} path="/login"/>
    </>
  );
}

export default App;
