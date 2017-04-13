import mongoose from 'mongoose';
// 文章类型模型
const category = mongoose.Schema({
    name:{type:String,unique:true},
    path:String,
    desc:String
});
const Category = mongoose.model('category',category);
export default Category;