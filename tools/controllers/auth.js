/**
 * Created by keep_wan on 2016/12/26.
 */
//jwt 令牌分发
import jwt from  'jwt-simple';
//user 模型
import User from '../model/auth';
import config from '../config/config';
export default class AuthControll
{
    constructor(){}
    //分发令牌

    /*eslint-disable no-unused-vars */
    async signIn(req,res,next)
    {
        await User.findOne({email:req.body.email},(err,user)=>{
            /*eslint-disable no-console*/
           if(err){console.log(err);}
           res.json({token:tokenForUser(req.user)});
        });
    }
    async signUp(req,res,next)
    {
        //客户端请求的email(账户) 和密码
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.username;
        if (!email || !password) {
            return res.status(422).send({error: "你的账户用户名或密码不正确"});
        }
        await User.findOne({email: email}, (err, existingUser) => {
            if (err) {
                return next(err);
            }
            //   判断是否存在账户
            if (existingUser) {
                return res.status(422).send({error: "你输入的账户已经存在"});
            }
            const user = new User({
                email: email,
                password: password,
                name:name
            });
            //   保存
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json({token:tokenForUser(user)});
            });
        });
    }
//    获取用户信息
   async fetchUser(req,res,next)
    {
        const email = req.user.email;
        await User.findOne({email:email},(err,user)=>{
           if(err){return next(err);}
           res.json({user:user});
        });
    }
}
export function tokenForUser(user)
{
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id,iat:timestamp,user:user.name},config.secret);
}
