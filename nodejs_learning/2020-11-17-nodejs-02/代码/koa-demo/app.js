const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

// 只是初始化了一个 Koa Application 对象，并没有创建 http 服务，也没有监听端口
const server = new Koa();

const quotes = [

    '虽然我个子矮，但我发际线高啊！',

    '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',

    '善良没用，你得漂亮。',

    '好好活下去 每天都有新打击。',

    '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',

    '世上无难事 只要肯放弃。',

    '加油，你是最胖的！'
];

// 静态代理
server.use( KoaStaticCache('./public', {
    prefix: '/public',
    // gzip 压缩
    gzip: true,
    // 有利于开发中的文件变更
    dynamic: true
}) );

// 动态处理
// server.use((ctx, next) => {
//     ctx.body = 'kkb';
// });

let router = new KoaRouter();

// router.get('/2', async ctx => {
//         ctx.body = users.find(user => user.id == 2);
// });

router.get('/quote', async ctx => {
    ctx.body =  quotes.sort(() => {
            return Math.random() - .5;
        })[0];
})

server.use( router.routes() );

// 启动了一个基于 http 的 webserver
server.listen(8887);