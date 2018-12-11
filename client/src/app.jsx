import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavMenu from './components/NavMenu';

const App = () => (
    <Router>
        <div className="app-content">
            <NavMenu />
            <Route exact path="/" component={() => <div>HI!</div>} />
        </div>
    </Router>
);

export default hot(module)(App);
