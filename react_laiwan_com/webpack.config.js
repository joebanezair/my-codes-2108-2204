const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        // 打包后的文件改成固定名.命中缓存
        filename: 'laiwanpai.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'remark-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                loader: 'style-loader',
            }, {
                test: /\.css$/,
                loader: 'css-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: '来玩', // title
            template: 'index.html', // 模版文件
            favicon: './src/source/icon.png',
            meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        }),
    ],
};
