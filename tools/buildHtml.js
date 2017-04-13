//编译视图承载容器也就是html到编译文件的目录下面
import fs from 'fs';
import {chalkSuccess} from './chalkConfig';
/*eslint-disable no-console */

fs.readFile('views/index.pug',(err,o) => {
  if (err) {
    return console.log(err);
  }

  let a = o;

  fs.writeFile('dist/index.pug',a,(err)=>{
    if (err) {
      return console.log(err);
    }
    console.log(chalkSuccess('视图承载容器已经成功写入到: /dist'));
  });
});
