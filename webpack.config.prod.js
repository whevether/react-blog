import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';     //css 插件
import autoprefixer from 'autoprefixer';
import path from 'path';
// 设置node.js生产环境变量
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  resolve: {
    //识别扩展文件名
     extensions: ['*', '.js', '.jsx', '.json']
  },
  //开启调试

  //生成用于调试的源
  devtool: 'source-map',
  entry: {
    public:[path.resolve(__dirname, 'src/index.js')],
    admin:[path.resolve(__dirname, 'src/admin.js')]
  },
  target: 'web', // 目标是web服务
  output: {
    //输出目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // 编译环境变量
    new webpack.DefinePlugin(GLOBALS),

    // 生成css 文件
    new ExtractTextPlugin('[name].css'),
    //优化编译插件
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/',
        postcss: () => [autoprefixer],
      }
    })
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']},
      //  编译字体文件
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      //图片文件
      {test: /\.(jpe?g|png|gif)$/i,use: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/,use: 'file-loader?name=[name].[ext]'},
      //编译css 或者sass
      {test: /(\.css|\.scss)$/, use: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')},
      // {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']},
      //编译json
      {test: /\.json$/, use: "json-loader"}
    ]
  }
};
