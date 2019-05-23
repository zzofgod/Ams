import React from 'react'
import { Menu, Icon } from 'antd';
import { Wrapper, Title } from '../../style'
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class Header extends React.Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Wrapper>
                <Title>Article MS</Title>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="container" />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5"><Icon type="unordered-list" /><Link style={{ "display": "inline" }} to="/article/list">文章列表</Link></Menu.Item>
                        <Menu.Item key="6"><Icon type="plus" /><Link style={{ "display": "inline" }} to="/article/add">添加文章</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>
                </Menu>
            </Wrapper>
        )
    }
}

export default Header