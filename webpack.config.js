const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        loader: ["@babel/polyfill", "./client/react/loader.jsx"]
    },
    output: {
        filename: 'bundle.js',
        publicPath: "/",
        path:  path.resolve(__dirname, 'public/bundle'),

    },
    resolve: {
        extensions: [".js", ".jsx", ".styl"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env",  "@babel/preset-react"]
                        }
                    }
                ],
                exclude: /node_modules/
            },

            {
                test: /\.styl$/,
                use: [ //use if apply many loaders
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ]
            }
        ]
    },
    devtool: "cheap-module-eval-source-map"
};
