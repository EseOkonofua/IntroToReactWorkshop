const path = require('path');

module.exports = {
    //Entry point of the react application.
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'), //Output folder for compiled application.
        filename: 'bundle.js' //File name for compiled app.
    },
    mode: process.env.NODE_ENV || 'development', //Mode for built in webpack optimizations
    resolve: {
        //Settings for how modules are resolved.(Where webpack goes to look for imports)
        modules: [path.resolve(__dirname, 'src'), 'node_modules'] 
    },
    devServer: {     
        contentBase: path.join(__dirname, 'public'), //Where static files will be served from.
        port: 3000 //Port of webpack server
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    }
};