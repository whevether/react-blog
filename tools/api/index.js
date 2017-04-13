/**
 * Created by keep_wan on 2017/1/10.
 */
import express from 'express';
import RouterHandle from '../helps/routerHandle';
import routes from '../../src/router/router';
const Router = express.Router();
Router.get('/',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"我的博客");
});
Router.get('/home',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"博客主页");
});
Router.get('/protfolio',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"我的github项目");
});
Router.get('/services',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"博客文章");
});
Router.get('/about',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"个人简历");
});
Router.get('/signin',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"登入");
});
Router.get('/401Page',(req,res,next)=>{
    const html = 'index';
    const src = 'public.js';
    const css = 'public.css';
    RouterHandle(routes,req,res,next,html,src,css,"没有权限页面");
});

export default Router;