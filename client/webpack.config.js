const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        clean: true,
    },
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.html$/,
                use: "html-loader",
            },
            {
                test: /\.png|svg|jpeg|jpg|gif$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],

    resolve: {
        modules: [path.resolve(__dirname, "./src"), "node_modules"],
        extensions: ["", ".js", ".jsx", ".json"],
    },
    devServer: {
        static: "./dist",
        open: true,
        hot: true,
    },
};
