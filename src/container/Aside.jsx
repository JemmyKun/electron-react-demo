import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const menuList = [
	{
		path: '/',
		name: 'page1',
		icon: 'calendar'
	},
	{
		path: '/main/page2',
		name: 'page2',
		icon: 'mail'
	},
	{
		path: '/main/chart',
		name: 'chart',
		icon: 'bar-chart'
	},
	{
		path: '/main/hooks',
		name: 'hooks',
		icon: 'appstore',
	}
];

const Aside = (props) => {
	const [curPath, setCurPath] = useState('/');

	useEffect(
		() => {
			// console.log('curPath:', curPath);
		},
		[curPath]
	);

	return (
		<div className="aside-container">
			<Menu
				style={{ width: '100%', height: '100%' }}
				defaultSelectedKeys={['/']}
				defaultOpenKeys={['/page']}
				mode={'inline'}
			>
				{
					menuList.map((item) => {
						let clName = curPath === item.path ? 'active' : '';
						let children = item.children || [];
						let { name, icon, path } = item;
						if (children.length === 0) {
							return (
								<Menu.Item key={path} className={clName} onClick={(e) => {
									props.goPage(e, item.path);
									setCurPath(item.path);
								}}>
									<Icon type={icon} />
									{name}
								</Menu.Item>
							)
						} else {
							return (
								<SubMenu key={path} title={<span><Icon type={icon} /><span>{name}</span></span>} onClick={(e) => {
									props.goPage(e, item.path);
									setCurPath(item.path);
								}}>
									{
										children.map(val => {
											let { name, path } = val;
											return (
												<Menu.Item key={path}>{name}</Menu.Item>
											)
										})
									}
								</SubMenu>
							)
						}
					})
				}
			</Menu>
		</div>
	);
};

export default Aside;
