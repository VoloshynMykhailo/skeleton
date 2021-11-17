import React from 'react';
import Loadable from 'react-loadable';

import {Loading} from "../../components/Loading";

const LoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */'./Component'),
    loading: Loading,
    delay: 1000,
});

export const Home = () => {
    return <LoadableComponent />
};