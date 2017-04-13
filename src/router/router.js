/**
 * Created by Administrator on 2016/11/16 0016.
 * 前台客户端路由
 */
import React from 'react';
import {IndexRoute,Route} from 'react-router';
import App from '../containers/app';
import HomePage from '../containers/homePage';
import ProtfolioPage from '../containers/protfolioPage';
import ErrorPage from '../components/404';
import ServicesPage from '../containers/servicesPage';
import SigninPage from '../components/auth/singin';
import AboutPage from '../components/about';
//没有权限访问页面
import Error401Page from '../components/admin/401';
// 文章详情页
import DetailsPage from '../components/details';
export default (
    <Route name="app" path="/" components={App}>
        <IndexRoute components={HomePage}/>
        <Route path="home" components={HomePage}/>
        <Route path="protfolio" components={ProtfolioPage}/>
        <Route path="services" components={ServicesPage}/>
        {/*文章详情页*/}
        <Route path="services/:details" components={DetailsPage}/>
        <Route path="about" components={AboutPage} />
        <Route path="signin" components={SigninPage} />
        <Route path="401Page"  components={Error401Page}/>
        <Route path="*" components={ErrorPage}/>
    </Route>

);