import mongoose from 'mongoose';
const upload = mongoose.Schema({
    filename: {type:String,unique:true},
    path: String,
    desc:String,
    title:String,
    createdate: {type:Date, default:Date.now}
});
const Upload = mongoose.model('upload',upload);
export default Upload;