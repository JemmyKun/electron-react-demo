import React from 'react';
import { Route, Switch } from 'react-router';

import Page from './Page';
import Page2 from './Page2';
import Chart from './Chart';
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
			<div className="app-main">
				<div className="main-side">
					<Aside
						goPage={(e, path) => {
							props.history.push(path);
						}}
						history={props.history}
					/>
				</div>
				<div className="main-content">
					<Switch>
						<Route path="/" exact component={Page} />
						<Route path="/page" component={Page} />
						<Route path="/page2" component={Page2} />
						<Route path="/chart" component={Chart} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Main;
