const http = require('http');
const server = http.createServer((req, res) => {
    res.write("Hello Wolrd");
    res.end();
})

server.listen(2000)