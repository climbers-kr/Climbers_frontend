import Loadable from 'react-loadable';
import React from "react";

export default function LoadableWrapper( getComponent ){
    return Loadable({
        loader: () => getComponent(),
        loading() {
            return <div>Loading...</div>
        }
    })
}