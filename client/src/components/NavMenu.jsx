import React from "react";
import { NavLink } from 'react-router-dom';

const App = () => (
    <nav className="nav">
        <ul>
            <li>
                <NavLink to="/clock">Clock</NavLink>
            </li>
            <li>
                <NavLink to="/timer">Timer</NavLink>
            </li>
        </ul>
    </nav>
);

export default App;
