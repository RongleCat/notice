const px2rem = require('postcss-px2rem-exclude')

const postcss = px2rem({
    remUnit: 75,
    exclude: /node_modules|vant/i
})

module.exports = {
    baseUrl: './',
    outputDir: './build',
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/function.scss";`
            }
        }
    },
    devServer: {
        disableHostCheck: true
    }
}