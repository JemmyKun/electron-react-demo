import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            menuList: [{
                name: 'todo',
                href: '/todo',
                icon: 'calendar'
            }, {
                name: 'page1',
                href: '/page1',
                icon: 'mail'
            },
            {
                name: 'page2',
                href: '/page2',
                icon: 'appstore',
                children: [
                    {
                        name: 'page2-1',
                        href: '/page2',
                        icon: 'appstore',
                    },
                ]
            },
            {
                name: 'page3',
                href: '/page3',
                icon: 'setting'
            },
            {
                name: 'page4',
                href: '/page4',
                icon: 'bar-chart'
            },
            {
                name: 'hooks',
                href: '/hooks',
                icon: 'book'
            },
            ]
        }
    }

    handleClick = (e) => {
        let key = e.key;
        this.props.history.push(key);
    }

    render() {
        const { menuList } = this.state;
        return (
            <div className="aside-container">
                <Menu
                    style={{ width: '100%', height: '100%' }}
                    defaultSelectedKeys={['todo']}
                    defaultOpenKeys={['/page2']}
                    mode={this.state.mode}
                    onClick={this.handleClick}
                >
                    {
                        menuList.map((item, index) => {
                            let children = item.children || [];
                            let { name, icon, href } = item;
                            if (children.length === 0) {
                                return (
                                    <Menu.Item key={href}>
                                        <Icon type={icon} />
                                        {name}
                                    </Menu.Item>
                                )
                            } else {
                                return (
                                    <SubMenu key={href} title={<span><Icon type={icon} /><span>{name}</span></span>}>
                                        {
                                            children.map(val => {
                                                let { name, href } = val;
                                                return (
                                                    <Menu.Item key={href}>{name}</Menu.Item>
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
        )
    }
}

export default Aside;