import React, { PureComponent, Component } from 'react';
import wretch from 'wretch';

export default class LoginComponent extends Component {
    state = {};

    onSignIn(form) {
        wretch('/api/auth/signin')
            .post(form)
            .unauthorized(() => this.setState({ error: 'Invalid creds' }))
            .error(code => this.setState({ error: 'Error ' + code }))
            .res(() => this.setState({ error: '' }));

    }

    render() {
        return (
            <Login
                onSignIn={this.onSignIn.bind(this)}
                error={this.state.error}
            />
        )
    }
}

class Login extends PureComponent {
    onSubmit(ev) {
        ev.preventDefault();
        this.props.onSignIn({
            login: ev.target.login.value,
            pass: ev.target.pass.value,
        });
    }

    render() {
        return (
            <div className="page page__center">
                <form onSubmit={this.onSubmit.bind(this)} className="form login-form">
                    <div className="form-row">
                        <input type="text" placeholder="Login" name="login" required />
                    </div>
                    <div className="form-row">
                        <input type="password" placeholder="Password" name="pass" required />
                    </div>
                    <div className="form-row">
                        <button type="submit">Sign in</button>
                        {!!this.props.error && <span className="form-error">{this.props.error}</span>}
                    </div>
                </form>
            </div>
        )
    }
}
