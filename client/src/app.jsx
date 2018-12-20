import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavMenu from './components/NavMenu';
import Login from './components/Login';


const App = () => (
    <Router>
        <div className="app-content app-content__black">
            <NavMenu />
            <main className="app-body">
                <Route exact path="/" component={Login} />
            </main>
        </div>
    </Router>
);

export default hot(module)(App);
