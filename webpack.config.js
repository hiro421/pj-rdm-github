const webpack = require("webpack");
module.exports = {
    mode: 'development',
    entry: {
        "pj/special/smartbra/asset/js/app": "./src/pj/special/smartbra/asset/js/app.js"
    },
    output:{
        filename: "[name].js",
    },
    devtool:'source-map',
    module:{
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    externals:[
        {
            jquery: 'jQuery'
        }
    ]
};