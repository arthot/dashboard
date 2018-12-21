import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import todoApp from './reducers';

import NavMenu from './components/NavMenu';
import Login from './components/Login';
import Clock from './components/Clock';
import { UserStore, LoginContext } from './login';

const store = createStore(todoApp);

const App = () => (
    <div className="app-content app-content__black">
        <NavMenu />
        <main className="app-body">
            <LoginContext.Consumer>
                {({ user }) => !user ?
                    <Login /> :
                    (
                        <Switch>
                            <Redirect exact from="/" to="/clock" />
                            <Route path="/clock" component={Clock} />
                        </Switch>
                    )
                }
            </LoginContext.Consumer>
        </main>
    </div>
)

const Root = () => (
    <Provider store={store}>
        <Router>
            <UserStore>
                <App />
            </UserStore>
        </Router>
    </Provider>
)

export default hot(module)(Root);
