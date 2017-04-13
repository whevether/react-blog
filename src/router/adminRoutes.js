/**
 * Created by keep_wan on 2017/1/10.
 * 后台客户端路由
 */
import React from 'react';
import {Route,IndexRoute} from 'react-router'; //IndexRoute,
import AdminPage from '../containers/admin/Admin';
/*登入注册，注销*/
import SignupPage from '../components/auth/singup';
import SignoutPage from '../components/auth/signout';
import AuthComponent from '../components/auth/RequireAuth';
import IndexPage from '../containers/admin/index';
import AddPage from '../containers/admin/adduserinfo';
import EditPage from '../components/admin/edituserinfo';
// 文章页面
import ArticlePage from '../components/admin/article/article';
import ArticleCreatePage from '../components/admin/article/create';
import ArticleEditPage from '../components/admin/article/edit';
// 文章类型
import CategoryPage from '../components/admin/category/category';
import CategoryCreatePage from '../components/admin/category/create';
import CategoryEditPage from '../components/admin/category/edit';
// 上传图片
import UploadPage from '../components/admin/upload/upload';
export default (
    <Route name="admin" breadcrumbName="后台主页" path="/admin" components={AuthComponent(AdminPage)}>
        <IndexRoute components={AuthComponent(IndexPage)}/>
        <Route path="signup" breadcrumbName="注册页面" components={SignupPage}/>
        <Route path="signout" breadcrumbName="注销页面" components={SignoutPage}/>
        <Route path="index/adduserinfo" breadcrumbName="添加用户信息" components={AuthComponent(AddPage)}/>
        <Route path="index/edituserinfo/:id" breadcrumbName="编辑用户信息" components={AuthComponent(EditPage)}/>
        <Route path="article" breadcrumbName="文章列表" components={AuthComponent(ArticlePage)}/>
        <Route path="article/create" breadcrumbName="创建文章" components={AuthComponent(ArticleCreatePage)}/>
        <Route path="article/edit/:id" breadcrumbName="编辑文章" components={AuthComponent(ArticleEditPage)}/>
        <Route path="category" breadcrumbName="文章类型" components={AuthComponent(CategoryPage)} />
        <Route path="category/create" breadcrumbName="创建类型" components={AuthComponent(CategoryCreatePage)} />
        <Route path="category/edit/:id" breadcrumbName="编辑类型" components={AuthComponent(CategoryEditPage)} />  
        <Route path="upload" breadcrumbName="上传图片" components={AuthComponent(UploadPage)} />
    </Route>
);
