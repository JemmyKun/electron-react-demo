import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.scss';

import Main from './Main';
import Login from './Login';

const App = () => {
	return (
		<div className="app-container">
			<Switch>
				<Route path="/" component={Main} />
				<Route path="/login" component={Login} />
				<Route exact component={Main} />
			</Switch>
		</div>
	);
};

export default App;
