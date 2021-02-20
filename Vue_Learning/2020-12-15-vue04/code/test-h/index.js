const Koa = require("koa");
const fs = require("fs");

const serve = require("koa-static");

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.use((ctx) => {
  console.log("aaaaa");
  // 怎么处理呢？ 就是把 index.html 返回
  const html = fs.readFileSync("./static/index.html");
  console.log(html);
  ctx.set("Content-Type","text/html")
  ctx.body = html.toString();
});

app.listen(8081, () => {
  console.log("open server localhost:8081");
});
