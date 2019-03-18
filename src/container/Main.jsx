import React from 'react';
import { Route, Switch } from 'react-router';

import Page from './Page';
import Page2 from './Page2';
import Chart from './Chart';
import Hooks from './Hooks';
import Head from './Head';
import Aside from './Aside';

const Main = (props) => {
	return (
		<div className="app-container">
			<div className="app-head">
				<Head
					history={props.history}
					goPage={(e, path) => {
						props.history.push(path);
					}}
				/>
			</div>
			<div className="main-container">
				<div className="app-aside">
					<Aside
						goPage={(e, path) => {
							props.history.push(path);
						}}
						history={props.history}
					/>
				</div>
				<div className="app-content">
					<Switch>
						<Route path="/" exact component={Page} />
						<Route path="/main/page" component={Page} />
						<Route path="/main/page2" component={Page2} />
						<Route path="/main/chart" component={Chart} />
						<Route path="/main/hooks" component={Hooks} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Main;
