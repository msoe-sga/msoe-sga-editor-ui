const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html'
});

const miniCssPlugin = new MiniCssWebpackPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssWebpackPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssWebpackPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        htmlPlugin,
        miniCssPlugin
    ]
};
