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

    // 自定一种规则，凡是以这种规则访问的url，我都给定位到 public 下的对应资源文件中。
    // 静态资源代理
    if (url.startsWith('/public')) {
        let content = fs.readFileSync('.' + url);
        res.write( content);
        return res.end();
    }

    // router 路由系统 => 资源定位，转发

    if (url.startsWith('/users')) {
        res.write( JSON.stringify(users) );
        return res.end();
    }

    if (url.startsWith('/courses')) {
        res.write( JSON.stringify(courses) );
        return res.end();
    }

    
    
});




server.listen(9999, function() {
    console.log('服务启动成功');
});