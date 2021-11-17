import React, {useEffect} from 'react';
import { render } from 'react-dom';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';

import {Navigation} from "./components/Navigation";
import pngPath from '../images/bg2.jpeg';
import svgPath from '../images/iconPro.svg';
import {pagesList} from './data';
import s from './style.css';

const App = () => {

    useEffect(() => {
        console.log('App mounted');
    }, []);

    return (
        <>
            <header>
                <Navigation />
            </header>
            <section>
                <p>Content is HERE!</p>
                <Switch>
                    {pagesList.map(({url, component}) => (
                        <Route
                            exact
                            path={url}
                            key={url}
                            component={component}
                        />
                    ))}
                    <Redirect to='/' />
                </Switch>
            </section>
            <div className={s.app} style={{'--app-color': '#f8d303'}}>
                <h3 className={s.title}>This is React</h3>
                <p className={s.line} />
                <p><img src={pngPath} /></p>
                <p><img src={svgPath} /></p>
                <span className={s.svgIcon} />
                <div className={s.jpegIcon} />
            </div>
            <footer>Example Ltd. & Co. a.k.a Test Group</footer>
        </>
    )
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
  );