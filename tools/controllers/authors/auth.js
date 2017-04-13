/**
 * Created by keep_wan on 2016/12/25.
 * 密碼驗證策略
 */

import passport from 'passport';
import User from '../../model/auth';
import config from '../../config/config';//密鑰
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import LocalStrategy from 'passport-local';
//創建本地策略
const localOption = {usernameField:'email'};
const localLogin = new LocalStrategy(localOption,async function (email,password,done) {
    //查找賬戶
     await User.findOne({email:email},(err,user)=>{
        if(err){return done(err);}
        if(!user){return done(null,false);}

    //    對比密碼
        user.comparePassword(password,(err,ismMatch)=>{
            if(err){return done(err);}
            if(!ismMatch){return done(null,false);}
            return done(null,user);
        });
    });
});
//令牌策略
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions,async function(payload, done) {
    //查看jwt id 是否已經存在數據庫中 如果存在就放權
    await User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});
//加入密碼驗證中間件
passport.use(jwtLogin);
passport.use(localLogin);