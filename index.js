const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    urlModule = require('url');

const PORT = process.env.PORT || 3000;


const server = http.createServer((req, res) => {
    const { method, url, headers} = req;
    const reqUrl = urlModule.parse(url, true);

    
    const Router = {
        get: (url, callback) => {}
    
    const router = new Router();
    
    router.get(
        '/' ,
        (req, res, next) => {
            console.log(1);
            next();
        },
        (req, res, next) => {
            console.log(2);
            next();
        },
        (req, res) => {
            res.end();
        },
    );
    
    
    switch (method) {
        case 'GET':
            console.log(headers['content-type']);


            if(reqUrl.query){
                for (el in reqUrl.query){
                    console.log(el + ": " + reqUrl.query[el]);
                }
            }
    }



    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let contentType = "text/html";

    const ext = path.extname(filePath);

    switch (ext) {
        case '.css':
            contentType = "text/css";
            break;
        case '.js':
            contentType = "text/javascript";
            break;
        default:
            contentType = "text/html";
            break;
    }

    if (!ext) {
        filePath += '.html'
    }
    ;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end("404");
                } else {
                    res.writeHead(500, {"Content-Type": contentType});
                    res.end(content);
                }
            });
        } else {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(data);
        }
        ;
    });
}).listen(PORT);
