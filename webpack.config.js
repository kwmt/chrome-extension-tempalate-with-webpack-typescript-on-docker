const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        content_script: path.join(__dirname, 'src/content_script.ts'),
        background: path.join(__dirname, "src/background.ts"),
        popup: path.join(__dirname, "src", "popup.ts")
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ],
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', 'js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "popup.html"),
            filename: "popup.html",
            chunks: ["popup"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: "index.html",
            chunks: ["index"]
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
};