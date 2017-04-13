import Category from '../model/category';
export default class CategoryController
{
    constructor(){}
    // 创建文章类型
    async createCategory(req,res,next)
    {
        const name = req.body.categoryname;
        const path = req.body.path;
        const desc = req.body.desc;
        await Category.findOne({name:name},(err,data)=>{
            if(err){return next(err);}
            if(data)
            {
                return res.status(422).send({error:"你输入的类型已经存在"});
            }
            const category = new Category({
                name:name,
                path:path,
                desc:desc
            });
            category.save((err)=>{
                if(err){return next(err);}
                res.status(200).send({msg:"存储成功"});
            });
        });
    }
    // 获取所有文章类型
    async fetchCategory(req,res,next)
    {
        if(req.headers.authorization)
        {
            res.json({category:await Category.find()});
        }else
        {
            res.status(401).send({err:"没有权限"});
        }
        next();
    }
    // 编辑类型
    async editCategory(req,res,next)
    {
        let id = req.params.id;
        const name = req.body.categoryname;
        const path = req.body.path;
        const desc = req.body.desc;
         await Category.findByIdAndUpdate({_id:id},{name:name,path:path,desc:desc},(err)=>{
            if(err){next(err);}
            res.status(200).send({msg:"修改成功"});
        });
    }
    // 删除文章类型
    async deleteCategory(req,res,next)
    {
         let id = req.params.id;
        await Category.findByIdAndRemove({_id:id},(err)=>{
            if(err){return next(err);}
            res.status(200).send({msg:"删除成功"});
        });
    }
}