const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: './index_bundle.js'
    },
    resolve: {
        fallback: {
            fs: false
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/react', '@babel/env']
                    }
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[path][name].[ext]",
                            emitFile: true,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ]
};