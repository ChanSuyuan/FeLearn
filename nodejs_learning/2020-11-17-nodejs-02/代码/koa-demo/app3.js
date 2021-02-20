const Koa = require('koa');
const mime = require('./mime.json');
const fs = require('fs');

// 只是初始化了一个 Koa Application 对象，并没有创建 http 服务，也没有监听端口
const server = new Koa();

// 静态代理
server.use(async (ctx, next) => {
    let url = ctx.url;
    if (url.startsWith('/public')) {
        let content = fs.readFileSync('.' + url);
        let lastPoint = url.lastIndexOf('.');
        
        let suffix = url.substring(lastPoint);
        // res.setHeader('content-type', mime[suffix] + ';charset="utf-8"');
        ctx.set('content-type', mime[suffix] + ';charset="utf-8"');
        ctx.body = content;
    } else {
        await next();
    }
});

// 动态处理
server.use((ctx, next) => {
    ctx.body = 'kkb';
});


// 启动了一个基于 http 的 webserver
server.listen(8888);