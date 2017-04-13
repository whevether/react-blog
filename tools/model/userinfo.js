import mongoose from 'mongoose';
// 我的个人信息
const userInfo = mongoose.Schema({
    name:{type:String,unique:true},
    age:Number,
	sex:String,
    hobby:String,
    specialty:String,
    occupation:String
});
const UserInfo = mongoose.model('userinfo',userInfo);
export default UserInfo;