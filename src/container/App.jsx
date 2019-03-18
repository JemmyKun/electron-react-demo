import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';

const App = () => {
	return (
		<div className="app-container">
			<Switch>
				<Route path="/" component={Main} />
				<Route path="/" exact component={Main} />
			</Switch>
		</div>
	);
};

export default App;
