const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
// console.log(req.url);

//* ei oo kovin tehokasta tällee mut esimerkkinä
// if (req.url === '/'){
//     fs.readFile(path.join(__dirname, 'Public', 'index.html'), 
//     (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'content-type': 'text/html'});
//             res.end(content);
//         }
//         );
    
// }

// if (req.url === '/about'){
//     const users = [
//         { name: 'Bob Smith', age: '40'},
//         { name: 'John Doe', age: '30'},
//     ];
//     res.writeHead(200, { 'content-type': 'application/json'});
//     res.end(JSON.stringify(users));
// }

// Muodosta polku
let filePath = path.join(__dirname, 
    'Public', 
    req.url === '/' ? 'index.html' : req.url
);

// console.log(filePath);
// res.end();

//Extension path
let extname = path.extname(filePath);

// initial content type
let contentType = 'text/html';

// check ext and set content type
switch(extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentTypententType = 'image/png';
        break;
    case '.jpg':
        contentType = 'image/jpg';
        break;

    }

//read file
fs.readFile(filePath, (err, content) => {
    if (err) {
        if (err.code == 'ENOENT') {
            // page not found
            fs.readFile(path.join(__dirname, 'Public', '404.html'), (err, content) => {
                res.writeHead(200, { 'content-type': 'text/html'});
                res.end(content, 'utf-8');
            })
            } else {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        } else {
            //succeess
          res.writeHead(200, { 'content-type': contentType});
          res.end(content, 'utf-8');

        } 
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`serveri portissa ${PORT}`));