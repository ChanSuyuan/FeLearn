const Koa = require("koa");
const Router = require("koa-router");
const nunjucks = require("koa-nunjucks-2");
let app = new Koa();
let router = new Router();
app.use(nunjucks({
    ext:"html", //.njk
    path:__dirname + "/views",
    nunjucksConfig:{
        trimBlocks : true //防止XSS泄漏
    }
}))
router.get("/",async ctx=>{
    // ctx.body = "Hello";
    await ctx.render("index",{
        username:"张三",
        num:2,
    });
})
router.get("/son1",async ctx=>{
    await ctx.render("son1");
})
router.get("/import",async ctx=>{
    await ctx.render("import");
})
app.use(router.routes());
app.listen(3000);