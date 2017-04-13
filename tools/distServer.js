import express from 'express';   //生产环境服务端
import path from 'path';
import open from 'open';
import compression from 'compression';
import bodyParser from 'body-parser';
/*eslint-disable no-unused-vars*/ 
import React from 'react';
//mongodb连接接
import mongoose from 'mongoose';
const port = 3000;
const app = express();
//连接mongodb   记录下。这里使用数据库登入验证必须在 mongo 里面对应的数据库添加用户角色权限。  例如:use blog 进入后createUser({});添加;如果不进入添加就直接添加到admin 管理员里面了.   
//1   如果使用mongoose 组件链接。密码不能有特殊字符。最好就是英文和数字;whevether4798:k3s5fnn8z
mongoose.connect('mongodb://whevether4798:k3s5fnn8z@localhost:27017/blog');
app.set("dist", path.resolve(__dirname,"../dist"));
//设置视图承载容器类型
app.set('view engine', 'pug');
app.use(compression());
app.use(express.static('dist'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//前台路由 请求
import Index from './api/index';
app.use(Index);

//API 数据服务端路由
import apiRouter from './api/apiServer';
app.use('/api',apiRouter);
//登入验证路由
import Auth from './api/admin/auth';
app.use('/auth',Auth);
// 后台路由 
import Admin from './api/admin';
app.use(Admin);
app.listen(port, function(err) {
  /*eslint-disable no-console*/
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
