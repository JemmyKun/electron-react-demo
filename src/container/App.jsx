import React from 'react';
import './app.scss';
import { Switch, Route } from 'react-router';

import Main from './Main';

const App = () => {
    return (
        <div className="app-container">
            <Switch>
                <Route path="/main" exact component={Main} />
                <Route path="/" component={Main} />
            </Switch>
        </div>
    )
}

export default App;