import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Login from './Login';

const App = () => {
	return (
		<div className="app-container">
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/login" component={Login} />
			</Switch>
		</div>
	);
};

export default App;
