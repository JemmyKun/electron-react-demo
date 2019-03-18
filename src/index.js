import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import App from './container/App';
import './asset/reset.scss';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(rootReducers);
console.log('store:',store);

let oldState = {};
// console.log('oldState:',oldState);
store.subscribe(()=>{
    let newStore = store.getState();
    oldState = newStore;
    // console.log('newStore:',newStore);
})


ReactDOM.render(
    <Provider store={store}>
        <HashRouter><App /></HashRouter>
    </Provider>, 
document.getElementById('root'));

serviceWorker.unregister();
