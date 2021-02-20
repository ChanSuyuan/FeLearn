const Koa = require('koa');
const mime = require('./mime.json');
const fs = require('fs');


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

server.use(async (ctx,next)=>{
    let url = ctx.url;
    if(url.startsWith('/public')){
        let content = fs.readFileSync('.' + url);
        let lastPoint = url.lastIndexOf('.');
        let suffix = url.substring(lastPoint);
        ctx.set('content-type',mime[suffix] + ';charset ="UTF-8" ')
        ctx.body = content;

    }if(url.startsWith('/quote')){
        res.setHeader('content-type', 'text/html;charset="utf-8"');

        let quote = quotes.sort(() => {
            return Math.random() - .5;
        })[0];
        
        res.end(quote);
    }
});
server.use((ctx,next)=>{
    ctx.body = 'csy';
});

server.listen(8888);