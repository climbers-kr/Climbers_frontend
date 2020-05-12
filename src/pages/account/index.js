import React from 'react';
import {Route, Switch} from 'react-router-dom';
//import EditProfilePage from "./EditProfilePage";
import EditPasswordPage from "./EditPasswordPage";
import LoadableWrapper from '../../lib/LoadableWrapper';
const EditProfilePage=LoadableWrapper(() => import('./EditProfilePage'));

const Account=({match})=>{
    return (
        <Switch>
            <Route component={EditPasswordPage} path={`${match.path}/password`}/>
            <Route component={EditProfilePage} path={`${match.path}/edit`}/>
        </Switch>

    );
};
export default Account;