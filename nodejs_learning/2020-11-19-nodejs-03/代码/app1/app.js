const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const nunjucks = require('nunjucks');

let categories = require('./data/categories.json');
let items = require('./data/items.json');

const app = new Koa();

// 设置静态文件资源代理
app.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

// 动态资源处理 koa-router
const router = new KoaRouter();

// 配置模板引擎
nunjucks.configure('./templates', {
    watch: true,
    noCache: true
});

// 首页
router.get('/', async ctx => {
    // 1、获取当前页面所需要的动态数据：商品分类数据、商品列表数据
    // categories, items

    // 2、通过后端模板引擎对数据和模板文件进行渲染，得到最终返回给前端的页面
    ctx.body = nunjucks.render('index.html', {
        categories,
        items 
    });
});

app.use(router.routes());


app.listen(8888);