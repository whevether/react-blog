/**
 * Created by keep_wan on 2017/1/2.
 */
import express from 'express';
import AuthControll from '../../controllers/auth';
require('../../controllers/authors/auth');
//密碼驗證插件
import passport from 'passport';
//路由处理程序

//控制器實例
const authControll = new AuthControll();
//本地驗證策略
const requireSignin = passport.authenticate('local',{session:false});
const Router = express.Router();

//登入
Router.post("/signin",requireSignin,authControll.signIn);
//客户注册路由
Router.post('/signup',authControll.signUp);

export default Router;