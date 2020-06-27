const path = require("path"); // Connects path utility to webpack config
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Connects html plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Connects mini-css plugin
const autoprefixer = require("autoprefixer"); // Connects css autoprefixer
const cssnano = require("cssnano"); // Connects css minifier

module.exports = {
    entry: { main: "./src/scripts/index.js" }, // Entry point for WebPack to start building
    output: {
        path: path.resolve(__dirname, "dist"), // Cannot use relative ./ path
        filename: "main.js"
    }, // Output location and name of bundled file
    module: {
        rules: [
            {
                test: /\.js$/, // Regex searches for all js files
                loader: "babel-loader", // All files processed by babel-loader
                exclude: "/node_modules/" // except for those in the node modules folder
            },
            {
                test: /\.(png|svg|jpg|gif|woff2)$/, // Finds these file types and loads them with file-loader
                loader: "file-loader"
            },
            {
                test: /\.html$/, // Finds HTML files and loads them with html-loader
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html" // Path to main html file
        }),
        new MiniCssExtractPlugin(), // Connects the CSS plugin
        autoprefixer,
        cssnano({ preset: "default" })
    ]
}