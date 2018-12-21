import React, { PureComponent, Component } from 'react';

const PERIOD = 25;

let timer = null;
let value = 60 * PERIOD;

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

export default class TimerComponent extends Component {
    state = { value, timer };

    componentDidMount() {
        if (timer)
            this.update();
    }

    restart() {
        clearInterval(timer);
        value = 60 * PERIOD;
        this.setState({ value }, () => this.start());
    }

    start() {
        timer = setInterval(() => {
            if (value)
                value = value - 1;
            else
                clearInterval(timer)
        }, 1000);
        this.update();
    }

    pause() {
        clearInterval(timer);
        clearInterval(this.state.timer);
        this.setState({ timer: null });
    }

    componentWillUnmount() {
        this.isDestroed = true;
        clearInterval(this.state.timer);
    }

    update() {
        this.setState({
            timer: setInterval(() => {
                if (!this.isDestroed)
                    this.setState({ value })
            }, 1000)
        });
    }

    render() {
        return (
            <Timer
                value={this.state.value}
                onRestart={this.restart.bind(this)}
                onStart={this.start.bind(this)}
                onPause={this.pause.bind(this)}
                timer={this.state.timer}
            />
        )
    }
}

class Timer extends PureComponent {
    render() {
        return (
            <div className="page page__center">
                <div className="timer-container">
                    <div className="timer">{Math.floor(this.props.value / 60).pad(2)}:{(this.props.value % 60).pad(2)}</div>
                    <div className="timer-toolbox">
                        <button onClick={this.props.onRestart}>Restart</button>
                        {!this.props.timer &&
                            <button onClick={this.props.onStart}>Start</button>}
                        {!!this.props.timer &&
                            <button onClick={this.props.onPause}>Pause</button>}
                    </div>
                </div>
            </div>
        )
    }
}
