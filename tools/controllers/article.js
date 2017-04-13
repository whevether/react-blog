import Article from '../model/article';
export default class ArticleController
{
    constructor(){}
    async createArticle(req,res,next)
    {
        const title = req.body.title;
        const desc = req.body.desc;
        const content = req.body.editor;
        const date = req.body.createdate;
        const category = req.body.category;
        const author = req.body.author;
        await Article.findOne({title:title},(err,data)=>{
            if(err){return next(err);}
            if(data)
            {
                return res.status(422).send({error:"你输入的文章已经存在"});
            }
            const article = new Article({
                title:title,
                desc:desc,
                content:content,
                createdate:date,
                author:author,
                category:category
            });
            article.save((err)=>{
                if(err){return next(err);}
                res.status(200).send({msg:"存储成功"});
            });
        });
    }
    async fetchArticle(req,res,next)
    {
        if(req.headers.authorization)
        {
            res.json({article:await Article.find()});
        }else
        {
            res.status(401).send({err:"没有权限"});
        }
        next();
    }
    // 编辑文章
    async editArticle(req,res,next)
    {
        let id = req.params.id;
        const title = req.body.title;
        const desc = req.body.desc;
        const content = req.body.editor;
        const date = req.body.createdate;
        const category = req.body.category;
        const author = req.body.author;
        await Article.findByIdAndUpdate({_id:id},{
            title:title,desc:desc,content:content,date:date,
            category:category,author:author},(err)=>{
                if(err){next(err);}
                res.status(200).send({msg:"修改成功"});
            });
    }
    // 删除文章
    async deleteArticle(req,res,next)
    {
         let id = req.params.id;
        await Article.findByIdAndRemove({_id:id},(err)=>{
            if(err){return next(err);}
            res.status(200).send({msg:"删除成功"});
        });
    }
}