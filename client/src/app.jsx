import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavMenu from './components/NavMenu';
import Login from './components/Login';
import Clock from './components/Clock';
import { UserStore, LoginContext } from './login';

const App = () => (
    <div className="app-content app-content__black">
        <NavMenu />
        <main className="app-body">
            <LoginContext.Consumer>
                {({ user }) => !user ?
                    <Login /> :
                    (
                        <Route exact path="/clock" component={Clock} />
                    )
                }
            </LoginContext.Consumer>
        </main>
    </div>
)

const Root = () => (
    <Router>
        <UserStore>
            <App />
        </UserStore>
    </Router>
)

export default hot(module)(Root);
