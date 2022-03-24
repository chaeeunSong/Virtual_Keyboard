const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry : "./src/js/index.js",    // 자바스크립트 파일의 진입점을 나타냄
    output : {      // 빌드를 했을때 번들파일 관련 속성을 정해줌
        filename : "bundle.js",     // 번들파일이름
        path : path.resolve(__dirname, "./dist"),   // 번들파일이 생성될 경로
        clean : true    // 경로에 다른파일이 있다면 다 지워주고 새로 생성하는 속성
    },
    devtool : "source-map",     // 빋드한 파일과 원본 파일을 서로 연결해줌
    mode : "development",
    devServer: {
        host : "localhost",
        port : 8080,
        open : true,
        watchFiles : 'index.html'
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : "keyboard",     // html 의 타이틀 (브라우저 상단)
            template : "./index.html",      // 템플릿은 index.html 로
            inject : "body",    // js 파일을 body로 넣을건지 head로 넣을건지
            favicon : "./favicon.ico"
        }),
        new MiniCssExtractPlugin({filename : "style.css"})
    ],
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization: {
        minimizer : [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}