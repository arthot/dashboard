import React from "react";
import { NavLink } from 'react-router-dom';

import ClockImg from '../assets/icons/clock.svg?inline';
import TimerImg from '../assets/icons/stopwatch.svg?inline';

const App = () => (
    <nav className="nav">
        <NavLink className="nav-item" activeClassName="nav-item__active" to="/clock">
            <ClockImg />
        </NavLink>
        <NavLink className="nav-item" activeClassName="nav-item__active" to="/timer">
            <TimerImg />
        </NavLink>
    </nav>
);

export default App;
