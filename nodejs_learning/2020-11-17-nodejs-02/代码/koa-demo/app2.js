const Koa = require('koa');

// 只是初始化了一个 Koa Application 对象，并没有创建 http 服务，也没有监听端口
const server = new Koa();

// use 接收的是一个函数，这个函数我们通常称为：中间件函数
// 中间件并不是循环依次执行的，里面不是for
// 控制中间件的执行，假设其中一个中间件执行以后，不需要执行后续的中间件了
let content = '';
server.use(async function(ctx, next) {    // next => 下一个中间件函数
    console.log('有人访问了1');
    content = 'a';
    // ctx.response.body = content;    // res.end(content);
    ctx.body = content;
    await next();
    // ...
    console.log('123');
});

server.use(function(ctx, next) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('有人访问了2');
            content += 'b';
            ctx.body = content;
            resolve();
        }, 1000);
    })
});

// 启动了一个基于 http 的 webserver
server.listen(8888);