//编译出生产文件配置
/* eslint-disable no-console */
import webpack from 'webpack';
import config from '../webpack.config.prod';
import {chalkError, chalkSuccess, chalkWarning, chalkProcessing} from './chalkConfig';

process.env.NODE_ENV = 'production'; // 环境变量

console.log(chalkProcessing('生成压缩生成文件，这会需要一点时间.....'));

webpack(config).run((error, stats) => {
  if (error) { // 是否编译错误
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();
  //编译状态是否存在错误
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }
  //编译状态是否存在警告
  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('webpack 编译警告:'));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`webpack 状态: ${stats}`);

  // 编译完成后输出提示信息
  console.log(chalkSuccess('你编译的文件存放在 /dist. 目录下面'));

  return 0;
});
