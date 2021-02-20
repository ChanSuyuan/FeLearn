
//通过require引入http 模块
const http = require('http');
const fs = require('fs');
// 创建Server对象
const server = http.createServer(function(req,res){
    console.log('有人发送了一个请求');
    let url = req.url;
    console.log('url',url);
    if(url.startsWith('.' + url)){
        let content = fs.readFileSync('.' + url);
        res.write(content);
        return res.end();
    }
    if(url.startsWith('/quote')){
        // res.setHeader('content-type','text/javascript');
        let content = fs.readFileSync('./quote/quote.html');
        res.write(content);
        return res.end();
    }
 
})
   // 监听端口
   server.listen(8888,function(){
    console.log('服务已经启动');
});

// function quote(){
//     const quotes = [
    
//         '虽然我个子矮，但我发际线高啊！',
      
//         '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',
      
//         '善良没用，你得漂亮。',
      
//         '好好活下去 每天都有新打击。',
      
//         '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',
      
//         '世上无难事 只要肯放弃。',
      
//         '加油，你是最胖的！'
//       ];
//     const i = Math.floor(Math.random()*(quotes.length - 1));
//     console.log(quotes[i]);
//     }