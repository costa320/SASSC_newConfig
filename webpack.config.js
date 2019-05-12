const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require('dotenv');

const _HtmlWebPackPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "index.html"
});
const _MiniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "[id].css"
});




module.exports = env => {
    /*
         const envKeys = Object.keys(env).reduce((prev, next) => {
             prev[`process.env.${next}`] = JSON.stringify(env[next]);
             return prev;
         }, {}); */
    const DefinePlugin = new webpack.DefinePlugin({
        'process.env': {
            enviroment: JSON.stringify(env.enviroment)
        }
    });

    return {
        entry: "./src/index.jsx",
        devtool: 'source-map',

        output: {
            path: path.resolve(__dirname, "build"),
            filename: 'js/main.js',
            publicPath: '/'
        },
        module: {
            rules: [{
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }, {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: "[local]___[hash:base64:5]"
                    }
                }, {
                    loader: "less-loader"
                }]
            }, {
                test: /\.(ttf|eot|woff2?)$/,
                loaders: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        name: "./fonts/[name].[ext]"
                    }
                }]
            }, {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }]

        },
        optimization: {
            /*  splitChunks: {
                 chunks: 'all'
             } */
        },
        devServer: {

            historyApiFallback: true,

            contentBase: path.join(__dirname, 'build'),
            compress: true,
            port: 5000
        },
        plugins: [_HtmlWebPackPlugin, DefinePlugin, _MiniCssExtractPlugin]
    }
};