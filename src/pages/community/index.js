import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CommunityPage from "./CommunityPage";
import PostPage from "./PostPage";
import WritePage from "./WritePage";

const Community=({match})=>{
    return (
        <Switch>
            <Route component={CommunityPage} path={`${match.path}`} exact/>
            <Route component={PostPage} path={`${match.path}/@:username/:postId`}/>
            <Route component={WritePage} path={`${match.path}/write`} />
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
export default Community;