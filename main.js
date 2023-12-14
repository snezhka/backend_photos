const Photo = require('./js/photo.js');
const fs = require('fs');
const http = require("http");
const host = 'localhost';
const port = 8080;
const qs = require('querystring');

const photos = new Array(25).fill(null).map(() => new Photo());
fs.writeFileSync('photos.txt', JSON.stringify(photos));

const requestListener = function (req, res) {
    switch (req.url) {
        case "/photos":
            try {
                const content = fs.readFileSync('photos.txt');
                res.writeHead(200, { 'content-type': 'application/json', 'access-control-allow-origin': '*' });
                res.write(content);
            } catch {
                res.writeHead(500);
                res.write("Error during reading the file");
            }
            res.end();
            break;
        default:
            res.writeHead(404);
            res.write(JSON.stringify({ error: "Resource not found" }));
            res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


