import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';


export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },

  devtool: 'eval-source-map', // 调试工具

  entry: {
      public:[
      //  设置目标源和热加载源
      'react-hot-loader/patch',   //这个是最新的react热加载插件。目前还是rc版.取代babel-react-hmr
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/index.js') // 定位客户端目标
    ],
      admin:[
          'react-hot-loader/patch',   //这个是最新的react热加载插件。目前还是rc版.取代babel-react-hmr
          'webpack-hot-middleware/client?reload=true',
          path.resolve(__dirname, 'src/admin.js') // 定位客户端目标
      ]
  },
  target: 'web', // 目标是web 服务器
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出编译文件目录
    publicPath: '/', //根目录
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
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
    //  编译模式
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
      {test: /(\.css|\.scss)$/, use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']},
      //编译json
      {test: /\.json$/, use: "json-loader"}
    ]
  }
};
