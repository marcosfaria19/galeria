const modoDev = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: './build',
        port: 9000,
        historyApiFallback: true,
    },
    optimization: {
        minimize: true,
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'estilo.css',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: 'src/**/*.html',
                    to: '[name].[ext]',
                },
                {
                    from: 'src/imgs/**/*',
                    to: 'imgs/[name].[ext]',
                },
            ],
        }),
    ],
    module: {
        rules: [{
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)$/,
                type: 'asset/resource',
            },
        ],
    },
};