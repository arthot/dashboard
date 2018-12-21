import React from "react";
import { NavLink } from 'react-router-dom';

const App = () => (
    <nav className="nav">
        <NavLink className="nav-item" to="/clock">Clock</NavLink>
        <NavLink className="nav-item" to="/timer">Timer</NavLink>
    </nav>
);

export default App;
