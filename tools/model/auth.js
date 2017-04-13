/**
 * Created by keep_wan on 2016/12/25.
 * 验证用户登入模型
 */
//mongoose
import mongoose from 'mongoose';
//hash加密密码
import bcrypt from 'bcrypt-nodejs';
//数据表(模型)字段
const userSchema = mongoose.Schema({
    name:String,
    email:{type:String,unique:true,lowercase:true},
    password:String
});

// 保存並加密密碼鈎子
userSchema.pre('save', function(next) {
    // 獲取用戶賬戶
    const user = this;

    // 生成10位數加密
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // 哈希加密
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // 賬戶密碼
            user.password = hash;
            next();
        });
    });
});
//對比賬戶密碼
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

// 創建模型類
const ModelClass = mongoose.model('user', userSchema);

// 公開
export default ModelClass;
