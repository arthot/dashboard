import React from 'react';

export const LoginContext = React.createContext({ user: undefined });

export class UserStore extends React.Component {
    state = {
        user: undefined
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ user: { token } });
        }
    }

    save(user) {
        localStorage.setItem('token', user.token);
        this.setState({ user });
    }

    render() {
        return (
            <LoginContext.Provider value={{
                user: this.state.user,
                save: this.save.bind(this),
            }}>
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}
