import React, { useState, useEffect } from 'react';

const pathData = [
	{
		path: '/',
		name: 'page'
	},
	{
		path: 'page',
		name: 'page'
	},
	{
		path: 'page2',
		name: 'page2'
	},
	{
		path: 'chart',
		name: 'chart'
	}
];

const Aside = (props) => {
	const [ curPath, setCurPath ] = useState('');

	useEffect(
		() => {
			console.log('curPath:', curPath);
		},
		[ curPath ]
	);

	return (
		<ul className="aside-container">
			{pathData.map((item, index) => {
				let clName = curPath === item.path ? 'active link-item' : 'link-item';

				return (
					<li
						className={clName}
						key={index}
						onClick={(e) => {
							props.goPage(e, item.path);
							setCurPath(item.path);
						}}
					>
						<span>{item.name}</span>
					</li>
				);
			})}
		</ul>
	);
};

export default Aside;
