module.exports = {
    // options...
    devServer: {
        proxy: {
            '/': {
                target: 'http://beruvyhodnoy.ru/',
                changeOrigin: true,
            }
        }
    }
}