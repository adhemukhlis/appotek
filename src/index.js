import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "semantic-ui-css/semantic.css";
import Route from "./route/route";
import Auth from "./route/auth";
import './index.css';

ReactDOM.render(<Route />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
