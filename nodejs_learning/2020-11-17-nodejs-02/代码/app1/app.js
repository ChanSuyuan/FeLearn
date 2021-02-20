const http = require('http');
const fs = require('fs');
const mime = require('./mime.json');    // node会把json格式的数据自动转成 对象

// console.log('mime', mime);
// console.log(mime['.json']);

/**
 * 三个部分
 *  1、行
 *  2、头
 *  3、正文
 * 
 * 数据包：{line: '', header: '', body: ''}
 */

const quotes = [

    '虽然我个子矮，但我发际线高啊！',

    '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',

    '善良没用，你得漂亮。',

    '好好活下去 每天都有新打击。',

    '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',

    '世上无难事 只要肯放弃。',

    '加油，你是最胖的！'
];

const server = http.createServer((req, res) => {

    let url = req.url;
    if (url.startsWith('/public')) {
        let content = fs.readFileSync('.' + url);

        // url中最后一个  . 出现的位置
        let lastPoint = url.lastIndexOf('.');
        // 获取当前url中表示的文件后缀
        let suffix = url.substring(lastPoint);
        // console.log('suffix', suffix);
        // 根据后最从 mime 中获取对应 MIME 类型

        res.setHeader('content-type', mime[suffix] + ';charset="utf-8"');
        res.end(content);
    }

    if (url.startsWith('/quote')) {

        res.setHeader('content-type', 'text/html;charset="utf-8"');

        let quote = quotes.sort(() => {
            return Math.random() - .5;
        })[0];
        
        res.end(quote);
    }
});

server.listen(8888);