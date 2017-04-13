import mongoose from 'mongoose';
const article = mongoose.Schema({
    title:{type:String,unique:true},
    author:String,
    desc:String,
    category:String,
    createdate:{ type: Date, default: Date.now },
    content:String
});
const Article = mongoose.model('article',article);
export default Article;