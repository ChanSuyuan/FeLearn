// 文件操作相关
const fs = require("fs");
/* 
    类似数据库操作 具有 curd  增删改查
    1.文件增加 2.目录操作 
*/
// 1.文件操作
// fs.writeFile("1.txt","这是我写入的字",function(err){
//     if(err){
//         return console.log(err);
//     }
//     console.log("写入成功");
// })

// flag ==> a 是追加写入 r: 读取 w：写入
// fs.writeFile("1.txt","这是我写入的字", {flag:"a"},function(err){
//     if(err){
//         return console.log(err);
//     }
//     console.log("写入成功");
// })

// 1.1文件读取
// fs.readFile("1.txt","utf8",(err,data)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(data); 
// })

//  在所有的文件操作 没有添加 Sync 都是异步 否则 同步，同步不存在回调

// let data = fs.readFileSync("1.txt");
// console.log(data.toString());

// 2.修改文件内容
// 2.1 修改名称
// fs.rename("2.txt","2.html",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("修改成功");
// });
// 2.2 删除
// fs.unlink("2.html",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("删除成功");
// });

//  复制文件 前者为复制对象， 后者为复制命名 先读取 后写入
// fs.copyFile("index.html", "myindex.html", err => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("复制成功");
// });

// 自制复制
// function mycopy(src,dest){
//     fs.writeFileSync(dest,fs.readFileSync(src));
// }
// mycopy("index.html","test.html");


// 目录操作
// 1.创建目录
// fs.mkdir("11",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("创建成功");
// })
// 2.修改目录名称
// fs.rename("11","22",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("修改成功");
// });
// 3.读取目录
// fs.readdir("22",(err,data)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(data);
// })
// 4.删除目录(空文件夹或者空目录才可以进行删除)
// fs.rmdir("22",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("删除成功");
// })

// // 判断文件或者目录是否存在
// fs.exists("index.html",exists=>{
//     console.log(exists);
// });
// // 获取文件或者目录的详细信息
// fs.stat("index.html",(err,stat)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(stat);
//     // 判断是否是文件
//     let res = stat.isFile();
//     console.log(res);
//     // 判断是否是一个目录
//     let res1 = stat.isDirectory();
//     console.log(res1);

// })

// 删除非空文件夹

// 先把目录里的文件删除 -->删除空目录；

function removeDir(path) {
    let data = fs.readdirSync(path);
    // ["33","1.txt","2.html"]
    for (let i = 0; i < data.length; i++) {
        // 是文件或者是目录； --文件 直接删除 目录则继续查找
        let url = path + "/" + data[i];
        let stat = fs.statSync(url);
        if (stat.isDirectory()) {
            // 继续查找
            removeDir(url);
        } else {
            // 文件删除
            fs.unlinkSync(url);
        }

    }
    // 删除空目录
    fs.rmdirSync(path);
}

removeDir("22");
// 在此需要注意的是这会删除相关文件，且该文件是不经过回收站的，执行时需要记得备份.