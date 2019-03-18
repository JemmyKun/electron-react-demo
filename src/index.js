import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import {HashRouter,BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter >
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);

serviceWorker.unregister();
