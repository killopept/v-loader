const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'


const Baseconfig  = {
  entry: path.resolve(__dirname,'./src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // devtool: 'inline-source-map',
  module: {
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack VUE',
      // template: 'src/public.html'
    }),
    new CleanWebpackPlugin(['dist']),
    // new webpack.HotModuleReplacementPlugin()
  ]
}

if(!isDev) {
  module.exports = merge(Baseconfig, {
    mode: 'production',
    devtool: 'source-map', // 打包后面错误的指向方便调试
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  })
}else {
  module.exports = merge(Baseconfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: 8000,
      contentBase: './dist',
      host: '0.0.0.0',
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  })
}