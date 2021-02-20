// stream 流

const fs = require("fs");

// 以下方法仅仅只是适用在文件内容较少的时候使用,在大容量时推荐使用流 stream
// const fs = require("fs");
// let res = fs.readFileSync("1.txt");
// console.log(res.toString());

// 运用流的方法,相对较为复杂,但性能较好
let rs = fs.createReadStream("65kb");
let ws = fs.createWriteStream("2.txt");
// 管道
rs.pipe(ws);
// let num = 0;
// let str = "";
// // 流会以64KB为一小块进行分割,当读取的文件大小为64kb时,仅循环一次.
// // 会将65KB的文件拆分成两份进行读取.
// rs.on("data", chunk => {
//     num++;
//     str += chunk;
//     // console.log(chunk);
//     console.log(num);
// });
// // 流完成了
// rs.on("end",()=>{
//     console.log(str);
// })
// 创建一个较大文件进行试验
// 通过buffer 创建
// let buffer = Buffer.alloc(65*1024);
// fs.writeFile("65kb", buffer,err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("写入成功");
// });
