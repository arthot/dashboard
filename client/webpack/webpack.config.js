const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const fileLoaderOptions = {
    name: 'assets/[name]-[hash:8].[ext]',
    publicPath: '/'
};

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'

    return {
        entry: './src/index.js',
        output: {
            publicPath: devMode ? '/' : ''
        },
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
                    test: /.svg$/,
                    oneOf: [
                        {
                            resourceQuery: /inline/,
                            use: 'svg-react-loader'
                        },
                        {
                            use: {
                                loader: 'file-loader',
                                options: fileLoaderOptions
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: fileLoaderOptions
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader'
                    }
                }
            ]
        },
        devServer: {
            port: 8181,
            host: '0.0.0.0',
            disableHostCheck: true,
            hot: true,
            stats: 'minimal',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css'
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        }
    };
};
