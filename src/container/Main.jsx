import React from 'react';
import './app.scss';
import { Switch, Route } from 'react-router';

import Head from './head/Head';
import Aside from './aside/Aside';
import Todo from './todo/Todo';
import Page1 from './page1/Page1';
import Page2 from './page2/Page2';
import Page3 from './page3/Page3';
import Page4 from './page4/Page4';
import Hooks from './hooks/Hooks';

const App = (props) => {
    return (
        <div className="app-container">
            <Head />
            <div className="main-container">
                <div className="app-aside">
                    <Aside history={props.history} />
                </div>
                <div className="app-content">
                    <Switch>
                        <Route path="/todo" component={Todo} />
                        <Route path="/page1" component={Page1} />
                        <Route path="/page2" component={Page2} />
                        <Route path="/page3" component={Page3} />
                        <Route path="/page4" component={Page4} />
                        <Route path='/hooks' component={Hooks} />
                        <Route path="/" component={Todo} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default App;