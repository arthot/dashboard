import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import App from './app.jsx';

window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

ReactDOM.render(<App />, document.getElementById('app'));
