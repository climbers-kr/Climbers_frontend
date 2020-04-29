import React from 'react';
import {Route, Switch} from 'react-router-dom';

import CenterListPage from "./CenterListPage";
import CenterPage from "./CenterPage";

const Centers=({match})=>{
    return (
        <Switch>
            <Route component={CenterListPage} path={`${match.path}`} exact/>
            <Route component={CenterPage} path={`${match.path}/:centerId`} exact/>
            <Route
                render={({location})=>(
                    <div>
                        <h2>이 페이지는 존재하지 않습니다.</h2>
                        <p>{location.pathname}</p>
                    </div>
                )}
            />
        </Switch>
    );
};
export default Centers;