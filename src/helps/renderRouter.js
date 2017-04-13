/* eslint-disable import/default */
/*前台后台路由客户端路由渲染*/
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from '../store/configureStore';
require('../favicon.ico');
import '../../node_modules/antd/dist/antd.css';
import '../styles/main.scss';
import { syncHistoryWithStore } from 'react-router-redux';
import {signinSuccess} from '../actions/auth';
export default function renderRouter(routes)
{
    const store = configureStore(browserHistory);
    const history = syncHistoryWithStore(browserHistory, store);
    const token = localStorage.getItem('token'); //获取登入状态
    if(token)
    {
        store.dispatch(signinSuccess(token));
    }
    render(
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>, document.getElementById('app')
    );
}
