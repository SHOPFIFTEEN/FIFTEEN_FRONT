const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.jsx"
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: "/node_modules",
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: 'css-loader'
        }]
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname + "/public/"),
        publicPath: "/",
        inline: false,
        hot: true,
        host: "localhost",
        port: 3001
    },
}