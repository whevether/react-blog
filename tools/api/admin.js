/**
 * Created by keep_wan on 2017/1/12.
 */
import express from 'express';
const Router = express.Router();
import UserInfo from '../controllers/userinfo';
import Category from '../controllers/category';
import Article from '../controllers/article';
//路由处理程序
import routerHandle from '../helps/routerHandle';
//后台客户端路由
import routes from '../../src/router/adminRoutes';
import passport from 'passport';
import multer from 'multer';
const userInfo = new UserInfo;
const category = new Category;
const article = new Article;
// 上传文件模型
import Upload from '../model/upload';
// import pathIo from 'path';
const requireAuth = passport.authenticate('jwt', { session: false });
//后台服务端渲染
Router.get('/admin',(req,res,next)=>{
        const html = 'index';
        const src = 'admin.js';
        const css = 'admin.css';
        routerHandle(routes,req,res,next,html,src,css,"博客后台管理");
});
// 获取用户信息路由 需要jwt 验证api权限
Router.get('/admin/index',requireAuth,userInfo.fetchUserInfoAll);
// 添加用户信息
Router.route('/admin/index/adduserinfo')
        .post(userInfo.saveUserInfo);
// 编辑用户信息
Router.route('/admin/index/edituserinfo/:id')
        .post(userInfo.editUserInfo);
// 删除数据
Router.route('/admin/index/deleteuserinfo/:id')
        .delete(userInfo.deleteUserInfo);
// 文章
Router.get('/admin/article',requireAuth,article.fetchArticle);
Router.route('/admin/article/create')
        .post(article.createArticle);
Router.route('/admin/article/edit/:id')
        .post(article.editArticle);
Router.route('/admin/article/delete/:id')
        .delete(article.deleteArticle);
// 文章类型
Router.get('/admin/category',requireAuth,category.fetchCategory);
Router.route('/admin/category/create')
        .post(category.createCategory);
Router.route('/admin/category/edit/:id')
        .post(category.editCategory);
Router.route('/admin/category/delete/:id')
        .delete(category.deleteCategory);
//上传图片
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({ storage: storage });
Router.route("/admin/image")
.get(async (req,res,next)=>{
  let dataLength = await Upload.find();
  dataLength = dataLength.length;
//   mongo db skip  offset 是从0开始的.  而分页插件 是从1 开始的.  所以要减去1
// 开发环境会报url 参数错误，不用管它。 生产环境就不会报了。   估计是插件问题.
  let data = await Upload.find().limit(parseInt(req.query.limit)).skip(parseInt(req.query.limit) * parseInt(req.query.page - 1));
  //分页数据
  res.json({images:data,count:dataLength});
  next();
})
.post(upload.single('file'),async (req,res,next)=>{
        const title = req.body.title;
        const desc = req.body.desc; 
        const path = req.file.path;
        const filename = req.file.filename;
        await Upload.findOne({filename:filename},(err,data)=>{
                if(err){return next(err);}
                if(data)
                {
                        return res.status(422).json({error:"存在相同名字的文件"});
                }
                const up = new Upload({
                        title:title,
                        desc:desc,
                        path:path,
                        filename:filename
                });
                up.save((err)=>{
                        if(err){return next(err);}
                        res.status(200).json({msg:filename+"存储成功"});
                });
        });
});
export default Router;