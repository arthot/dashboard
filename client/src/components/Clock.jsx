import React, { PureComponent, Component } from 'react';
import format from 'date-fns/format';
import gb from 'date-fns/locale/en-GB';

export default class ClockComponent extends Component {
    state = { date: new Date() };

    componentDidMount() {
        this.timer = setInterval(() => this.setState({ date: new Date() }), 1000 * 10);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <Clock
                date={this.state.date}
            />
        )
    }
}

class Clock extends PureComponent {
    render() {
        return (
            <div className="page page__center">
                <div className="clock-container">
                    <div className="clock-time">{format(this.props.date, 'p', { locale: gb })}</div>
                    <div className="clock-date">{format(this.props.date, 'PPPP', { locale: gb })}</div>
                </div>
            </div>
        )
    }
}
