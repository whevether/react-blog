/**
 * Created by keep_wan on 2017/1/7.
 * 后台 header
 */
import React from 'react';
import * as LayoutActions from '../../actions/admin/layout';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import AdminHeader from '../../components/admin/layout/header';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Link,IndexLink} from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//后台主页容器
class AdminLayout extends React.Component
{
    constructor(props,)
    {
        super(props);
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }
    /*eslint-disable no-unused-vars*/
    //切换侧边栏
    handleToggleSidebar(e)
    {
        this.props.actions.adminToggleSidebar(!this.props.layout);
    }
    render()
    {
        const {layout} = this.props;
        return(
            <Layout>
                <Sider
                    collapsible
                    collapsed={layout}
                    onCollapse={this.handleToggleSidebar}
                >
                    <div className="logo" >
                         <Link to="/admin"><img src="https://facebook.github.io/react/img/logo.svg" alt="博客logo" className="brand-icon" /></Link>
                    </div>
                    <Menu theme="dark" mode={this.props.mode} defaultSelectedKeys={['1']} defaultOpenKeys={['users']}>
                         <SubMenu key="users" title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}>
                                <MenuItemGroup title="用户管理">
                                    <Menu.Item key="1"><IndexLink to="/admin">用户列表</IndexLink></Menu.Item>
                                </MenuItemGroup>
                        </SubMenu>
                         <SubMenu key="article" title={<span><Icon type="appstore" /><span className="nav-text">文章管理</span></span>}>
                                <MenuItemGroup title="文章管理">
                                    <Menu.Item key="2"><Link to="/admin/article">文章列表</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="/admin/category">分类列表</Link></Menu.Item>
                                </MenuItemGroup>
                        </SubMenu>
                        <SubMenu key="photos" title={<span><Icon type="picture" /><span className="nav-text">图片管理</span></span>}>
                            <MenuItemGroup title="图片管理">
                                <Menu.Item key="4"><Link to="/admin/upload">图片上传</Link></Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <AdminHeader user={this.props.user} actives={this.props.active} actions={this.props.actions}/>
                    </Header>
                    <Content className="main-content">
                        {/*使用antd 中的路由参数来显示面包屑*/}
                        <Breadcrumb routes={this.props.routes} params={this.props.params} className="breadcrumb"/>
                        <div className="container">
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer className="footer">
                        我的博客后台
                    </Footer>
                </Layout>   
            </Layout>
        );
    }
}
const mapStateToProps = (state)=>{
    let mode = state.adminlayout.sidebarOpen?"vertical":"inline";
    return{
        layout:state.adminlayout.sidebarOpen,
        active:state.adminlayout.active,
        user:state.auth.user,
        mode:mode
    };
};
const mapDispatchToProps = (dispatch)=>{
    return {
        actions:bindActionCreators(LayoutActions,dispatch)
    };
};
AdminLayout.propTypes = {
    layout:React.PropTypes.bool,
    actions:React.PropTypes.object.isRequired,
    children:React.PropTypes.object.isRequired,
    mode:React.PropTypes.string.isRequired,
    active:React.PropTypes.string.isRequired,
    routes:React.PropTypes.arrayOf(Object).isRequired,
    params:React.PropTypes.object.isRequired,
    user:React.PropTypes.string
};
export default connect(mapStateToProps,mapDispatchToProps)(AdminLayout);
