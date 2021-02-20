// 这个文件是要被 node 环境去运行的

// 首先通过 require 引入 http 模块
const http = require('http');
const fs = require('fs');

let users = ['dahai', 'zishu'];
let courses = ['javascript', 'node.js'];

// 创建一个 Server 对象，该对象提供了用于操作网络（网卡）相关接口方法
// http.createServer() => http.Server 对象
const server = http.createServer(function(req, res) {
    // req: http.IncomingMessage => 对客户端请求数据的封装
    // res: http.ServerResponse => 对服务端输出相关的数据和方法进行封装
    // 这个是请求回调函数，当有客户端请求到该服务的时候，则会执行
    console.log('有人发送了一个请求');

    // 当前客户端请求的方法和请求的url是什么
    // console.log(req.method, req.url);
    let url = req.url;  // req.url 是 URL path 以后的部分
    console.log('url', url);

    // router 路由系统 => 资源定位，转发

    if (url.startsWith('/users')) {
        res.write( JSON.stringify(users) );
        return res.end();
    }

    if (url.startsWith('/courses')) {
        res.write( JSON.stringify(courses) );
        return res.end();
    }

    if (url.startsWith('/index.css')) {
        res.write(`
            body {
                color: red;
            }
        `);
        return res.end();
    }

    if (url.startsWith('/kaikeba')) {
        let logo = fs.readFileSync('./logo.png');
        res.write(logo);
        return res.end();
    }
    

    // 通过网卡向客户端写入数据
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="/index.css">
        </head>
        <body>
            <h1>${Math.random()}</h1>
            <img src="/kaikeba" />
        </body>
        </html>
    `);
    // 数据写入完成
    res.end();
});

// console.log('Nodejs');

// 监听网卡指定的端口
// 端口：一台电脑下会有多个网卡（传输网络数据的硬件设备），同时一台电脑上又会存在N多的需要使用网络的软件，比如qq、微信、浏览器……
// 使用网络传输数据的软件就会特别的多，为了保证数据不乱套（微信能读取所有网卡数据，那么就意味这个软件可以获取其它软件的数据）
// 为了把数据与对应的软件进行绑定，创建了端口的概念，每一个软件就指定一个端口用于数据传输
server.listen(9999, function() {
    console.log('服务启动成功');
});