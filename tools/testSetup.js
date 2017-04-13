//测试环境配置
process.env.NODE_ENV = 'test';

//排除测试这些文件
['.css', '.scss', '.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});

//注册babel 以便识别es6 转换es5
require('babel-register')();
