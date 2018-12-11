const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    // mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new uglify({sourceMap: true})
    ],
    module: {
        rules: [{
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
}