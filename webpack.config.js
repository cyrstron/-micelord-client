const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const cssLoaders = [{
    loader: MiniCssExtractPlugin.loader, 
  }, { 
    loader: 'css-loader', 
    options: {
      modules: true,    
      localIdentName: '[name]__[local]___[hash:base64:5]',
      sourceMap: true
    } 
  }
];

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin(),
    ],
    extensions: ['.ts', '.tsx', '.js', '.css', '.js.map'],    
    symlinks: false,
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),      
    }
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        }
      },      
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.scss$/,
        use: [
          ...cssLoaders,
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },
      {
        test: /\.js\.map$/,
        use: "source-map-loader",
        enforce: "pre",
        include: path.join(__dirname, '/node_modules/@micelord')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({      
      filename: "style.css",
      chunkFilename: "[name].css"
    }),    
    new Dotenv({
      path: './.env',
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/auth': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/static': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  },
  devtool: 'eval-source-map',
}