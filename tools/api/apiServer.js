/**
 * Created by Administrator on 2016/11/22 0022.
 */
import express from 'express';
import Article from '../model/article';
//api  数据路由    用于客户端获取服务端json数据
const Router = express.Router();
Router.route('/article')
.get(async (req,res,next)=>{
    let dataLength = await Article.find();
    dataLength = dataLength.length;
    let data = await Article.find().limit(parseInt(req.query.limit)).skip(parseInt(req.query.limit) * parseInt(req.query.page -1));
    res.json({article:data,count:dataLength});
    next();
});
Router.route('/article/:id')
.get(async(req,res,next)=>{
    const id = req.params.id;
    await Article.findOne({_id:id},(err,data)=>{
        if(err){return next(err);}
        res.json({data:data});
    });
});
export default Router;