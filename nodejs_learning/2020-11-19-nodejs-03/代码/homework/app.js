const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const quotes = [

    '虽然我个子矮，但我发际线高啊！',

    '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',

    '善良没用，你得漂亮。',

    '好好活下去 每天都有新打击。',

    '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',

    '世上无难事 只要肯放弃。',

    '加油，你是最胖的！'
];

const app = new Koa();

// 设置静态文件资源代理
app.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

// 动态资源处理 koa-router
const router = new KoaRouter();

router.get('/quote', async ctx => {
    ctx.body = quotes.sort(() => {
        return Math.random() - .5;
    })[0];
});

app.use(router.routes());


app.listen(8888);