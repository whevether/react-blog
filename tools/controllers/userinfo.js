import UserInfo from '../model/userinfo';
export default class UserInfoController
{
    constructor(){}
    
    // 保存用户信息
    async saveUserInfo(req,res,next)
    {
        const name = req.body.username;
        const age = req.body.age;
        const sex = req.body.sex;
        const hobby = req.body.hobby;
        const specialty = req.body.specialty;
        const occupation = req.body.occupation; 
        await UserInfo.findOne({name:name},(err,data)=>{
            if(err){return next(err);}
            if(data)
            {
                return res.status(422).send({error:"错误你输入的用户已经存在"});
            }
            const userinfo = new UserInfo({
                name:name,
                age:age,
                sex:sex,
                hobby:hobby,
                specialty:specialty,
                occupation:occupation
            });
            userinfo.save((err)=>{if(err){return err;}res.status(200).send({msg:"存储成功"});});
        });
    }
    // 获取所有用户信息
    async fetchUserInfoAll(req,res,next)
    {
        if(req.headers.authorization)
        {
            res.json({user:await UserInfo.find()});
        }else
        {
            res.status(401).send({err:"没有授权"});
        }
        next();
    }
    // 编辑用户信息
    async editUserInfo(req,res,next)
    {
        let id = req.params.id;
        const name = req.body.username;
        const age = req.body.age;
        const sex = req.body.sex;
        const hobby = req.body.hobby;
        const specialty = req.body.specialty;
        const occupation = req.body.occupation; 
        await UserInfo.findByIdAndUpdate({_id:id},{name:name,age:age,sex:sex,hobby:hobby,specialty:specialty,occupation:occupation},(err)=>{
            if(err){next(err);}
            res.status(200).send({msg:"修改成功"});
        });
        
    }
    //删除user 数据
    async deleteUserInfo(req,res,next)
    {
        let id = req.params.id;
        await UserInfo.findByIdAndRemove({_id:id},(err)=>{
            if(err){return next(err);}
            res.status(200).send({msg:"删除成功"});
        });
    }
}