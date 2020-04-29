import React from 'react';
import {Route, Switch} from 'react-router-dom';
import UserProfilePage from "./UserProfilePage";

const User=({match})=>{
    return (
        <Switch>
            <Route component={UserProfilePage} path={`${match.path}/:userId`} exact/>
        </Switch>

    );
};
export default User;