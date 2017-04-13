/*
* 服务端渲染路由处理程序
* */
import React from 'react';
import {renderToString} from 'react-dom/server'; //react 服务端渲染
import {Provider} from 'react-redux'; //数据源容器
import {match,RouterContext,createMemoryHistory} from 'react-router'; //react-router 服务端渲染。和路由上下文。创建history
import {syncHistoryWithStore} from 'react-router-redux';  //异步redux 路由
import configureStore from '../../src/store/configureStore';
/*
    参数:
    1:客户端路由
    2:请求
    3:响应
    4:下一步
    5:渲染载体页面  也就是jade页面
    6.编译后的react 文件
* */
export default function routerHandle(routes,req,res,next,html='index',src,css,title)
{
    //创建历史记录
    const memortHistory = createMemoryHistory(req.url);
    //数据源
    const store = configureStore(memortHistory);
    //hostory
    const history = syncHistoryWithStore(memortHistory,store);
    //react 服务段渲染
    match({history,routes,location:req.url},(error,redirectLocation,renderProps)=>{
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const content = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps}/>
                </Provider>
            );
            res.render(html, {title:title, html: content,src:src,css:css});
            next();
        }
    });
}
