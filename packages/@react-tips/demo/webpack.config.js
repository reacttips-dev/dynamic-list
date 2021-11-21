const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:11].css",
            chunkFilename: "[name].[contenthash:11].[id].css",
        })
    ],
    resolve: {
        modules: [
            "node_modules",
            path.join(__dirname)
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
    },
}
