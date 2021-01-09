const http = require('http'),
        fs = require('fs'),
        path = require('path'),
        urlModule = require('url');

const PORT = process.env.PORT || 3000;


class Router {
    listen(port, callback) {
        const handler = (req, res, err) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        };
        return http.createServer(handler).listen({port}, callback)
    }
    // constructor() {}
    get(url, ...callback) {

    }
}


const server = http.createServer((req, res) => {
    const { method, url, headers} = req;
    const reqUrl = urlModule.parse(url, true);

    
    const router = new Router;
    // router.get(1, 2,2,4,5)
    router.listen('6000',
        (res, req) => {
      console.log('hello')
    })

    // router.get(
    //     '/' ,
    //     (req, res, next) => {
    //         console.log(1);
    //         next();
    //     },
    //     (req, res, next) => {
    //         console.log(2);
    //         next();
    //     },
    //     (req, res) => {
    //         res.end();
    //     },
    // );
    
    
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
})
server.listen(PORT);