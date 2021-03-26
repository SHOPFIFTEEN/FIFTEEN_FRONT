const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        index: "./src/index.js"
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: '[name].bundle_[chunkhash].js',
        path: path.resolve(__dirname + "/build")
    },
    devServer: {
        contentBase: path.resolve("./build"),
        index: "index.html",
        port: 3000
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                loader: 'babel-loader',
                options: {
                    compact: true,
                    presets: [
                        ['@babel/preset-env', {
                            targets: {"browsers": ["last 2 versions", ">= 5% in KR"]},
                            modules: false,
                            "corejs": "2",
                            useBuiltIns: 'usage'

                        }],
                        '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader']
            }, {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[hash].[ext]',
                    limit: 10000,
                },
            }
        ]
    },


    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html', // public/index.html 파일을 읽는다.
            filename: 'index.html', // output으로 출력할 파일은 index.html 이다.
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};