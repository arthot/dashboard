import React, { PureComponent, Component } from 'react';
import classnames from 'classnames';

import RestartImg from '../assets/icons/restart.svg?inline';
import PlayImg from '../assets/icons/play.svg?inline';
import PauseImg from '../assets/icons/pause.svg?inline';

const PERIOD = 25;
const NOTIFY = 60;

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
        this.setState({ value }, () => this.pause());
    }

    start() {
        timer = setInterval(() => {
            if (value)
                value = value - 1;
            else
                this.pause();
        }, 1000);
        this.update();
    }

    pause() {
        clearInterval(timer);
        clearInterval(this.state.timer);
        this.setState({ timer: null });
        timer = null;
    }

    componentWillUnmount() {
        this.isDestroyed = true;
        clearInterval(this.state.timer);
    }

    update() {
        this.setState({
            timer: setInterval(() => {
                if (!this.isDestroyed)
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
        const minutes = Math.floor(this.props.value / 60).pad(2);
        const seconds = (this.props.value % 60).pad(2);
        return (
            <div className="page page__center">
                <div className="timer-container">
                    <div className={classnames("timer", {
                        "timer__ending": this.props.value && this.props.value < NOTIFY,
                        "timer__end": !this.props.value,
                    })}>
                        {minutes}:{seconds}
                    </div>
                    <div className="timer-toolbox">
                        <RestartImg className="toolbox-item" onClick={this.props.onRestart} />
                        {!this.props.timer && !!this.props.value &&
                            <PlayImg className="toolbox-item" onClick={this.props.onStart} />}
                        {!!this.props.timer &&
                            <PauseImg className="toolbox-item" onClick={this.props.onPause} />}
                    </div>
                </div>
            </div>
        )
    }
}
