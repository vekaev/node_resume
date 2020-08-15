const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;


// fs.readFile()

const server = http.createServer((req, res) => {
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

    if (!ext){
        filePath +='.html'
    };

    fs.readFile(filePath, (err, data) => {
        if (err){
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end("404");
                }else {
                    res.writeHead(500, {"Content-Type": contentType});
                    res.end(content);
                }
            });
        } else{
            res.writeHead(200, {"Content-Type": contentType});
            res.end(data);
        };
    });
});


server.listen(PORT);