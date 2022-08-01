module.exports = function(app) {
    app.use((req, res, next) => {
        res.removeHeader('Cross-Origin-Resource-Policy');
        res.removeHeader('Cross-Origin-Embedder-Policy');
        next();
    })
}

/*
{"/": {"target": "http://localhost:1235","changeOrigin": false, "headers": {"Access-Control-Allow-Origin": "*"}}}
 */