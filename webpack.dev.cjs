const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.cjs');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public')
        },
        port: 3003,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
});