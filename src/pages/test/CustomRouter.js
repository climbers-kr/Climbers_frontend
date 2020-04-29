import React from 'react';
import {Route, Switch, Router, Link, withRouter} from 'react-router-dom';

import EditAccountPage from '../account/EditAccountPage';
import EditPasswordPage from "../account/EditPasswordPage";

function CustomRouter({history}) {
    return (
        <>
            <Link to="/accounts/password">password</Link>
            <Link to="/accounts/edit">edit</Link>
            <Route component={EditPasswordPage} path="/password"/>
            <Route component={EditAccountPage} path="/edit"/>
        </>
    );
}
export default withRouter(CustomRouter);
