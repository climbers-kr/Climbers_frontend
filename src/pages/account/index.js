import React from 'react';
import {Route, Switch} from 'react-router-dom';
import EditAccountPage from "./EditAccountPage";
import EditPasswordPage from "./EditPasswordPage";

const Account=({match})=>{
    return (
        <Switch>
            <Route component={EditPasswordPage} path={`${match.path}/password`}/>
            <Route component={EditAccountPage} path={`${match.path}/edit`}/>
        </Switch>

    );
};
export default Account;