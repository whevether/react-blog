/**
 * Created by keep_wan on 2017/1/7.
 * 后台 header
 */
import React from 'react';
import {Menu,Icon} from 'antd';
import {Link,IndexLink} from 'react-router';
//由于后台先渲染。所以action 必须放在header 里面
//头部工具条
class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
   
    handleClick(e)
    {
        this.props.actions.adminClickMenu(e.key);
    }

    render()
    {
        const {user}  = this.props;
        return(
            <header id="navbar">
                    <div className="navbar-content ">
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.props.actives]}
                            mode="horizontal"
                        >
                            <Menu.Item key="signin">
                                <IndexLink to="/admin"><Icon type="team" />{user}</IndexLink>
                            </Menu.Item>
                            <Menu.Item key="signup">
                                <Link to="/admin/signup">注册<Icon type="heart-o" /></Link>
                            </Menu.Item>
                            <Menu.Item key="logout">
                                <Link to="/admin/signout">注销<Icon type="logout" /></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
            </header>
        );
    }
}
Header.propTypes = {
    actions:React.PropTypes.object.isRequired,
    actives:React.PropTypes.string.isRequired,
    user:React.PropTypes.string,
    isAuth:React.PropTypes.bool,
    adminClickMenu:React.PropTypes.func

};

export default Header;



