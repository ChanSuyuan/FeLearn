const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const nunjucks = require('nunjucks');
const mysql2 = require('mysql2');
const koaBody = require('koa-body');

// 创建数据库链接
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'kkb_13'
});

const app = new Koa();

// 设置静态文件资源代理
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

// 动态资源处理 koa-router
const router = new KoaRouter();
// 配置模板引擎
nunjucks.configure('./templates', {
    watch: true,
    noCache: true
});

// 首页
router.get('/:id(\\d*)', async ctx => {
    // 1、获取当前页面所需要的动态数据：商品分类数据、商品列表数据
    // categories, items
    let categories = [];
    // 动态路由中的数据会被koa-router自动解析，并存储到ctx.params 下，它是一个对象，对象中的key就是动态路由:后面的名称
    let categoryId = ctx.params.id;
    // ctx.request.query 存储了url中？后面的内容
    let page = ctx.request.query.page;
    if (!page) {
        page = 1;
    }
    // console.log('categoryId', categoryId);
    // CURD(Create, Update, Read, Delete) (增删改查)
    // C：insert into
    // U: update
    // R: select
    // D: delete
    // connection.query(
    //     'SELECT * FROM `categories`',
    //     function (err, results, fields) {
    //         // 数据库的查询是异步的，数据还没有查询出来的时候，后面的代码就执行完了，后端已经返回了
    //         console.log(results);
    //         console.log(fields);
    //     }
    // );

    // 每页显示的数据条数
    let prepage = 1;
    // 当前页
    // let page = 1;   // page:1 => offset:0, page:2 => offset:5, page:3 => offset:10
    // 偏移
    let offset = (page - 1) * prepage;

    // 查询所有所有的总条数
    let sqlCount = 'SELECT count(id) as count FROM `items`'; 
    let [[{count}]] = await query(sqlCount);
    // console.log('sql', count);
    let pages = Math.ceil((count / prepage));
    

    let sql = 'SELECT * FROM `items` limit '+ prepage +' offset ' + offset;
    if (categoryId) {
        sql = 'SELECT * FROM `items` where `category_id`=? limit 1 offset 1';
    }

    [categories] = await query('SELECT * FROM `categories`');
    [items] = await query(sql, [categoryId]); 

    // 2、通过后端模板引擎对数据和模板文件进行渲染，得到最终返回给前端的页面
    ctx.body = nunjucks.render('index.html', {
        categories,
        items,
        pages,
        page
    });
});

// 通过get方式访问和返回一个添加新商品的页面
router.get('/addItem', async ctx => {
    [categories] = await query('SELECT * FROM `categories`');

    ctx.body = nunjucks.render('addItem.html', {
        categories
    });
});

// post提交过来的数据进行处理
router.post('/addItem', koaBody(), async ctx => {
    // ctx.request.body => koaBody 中间件解析请求正文后数据存储的位置
    // console.log('数据', ctx.request.body);
    let {categoryId, name, price, cover} = ctx.request.body;

    // 对数据进行合法性验证

    // 验证通过，存储到数据库
    let [rs] = await query(
        "INSERT INTO `items` (`category_id`, `name`, `price`, `cover`) VALUES (?, ?, ?, ?)",
        [categoryId, name, price, cover]
    );
    // console.log('rs', rs);

    ctx.body = '<p>添加成功</p><p><a href="/addItem">继续添加</a> | <a href="/">回到首页</a></p>';
});

app.use(router.routes());


app.listen(8888);


function query(sql, prePared) {
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            prePared,
            function(err, results, fields) {
                if (err) {
                    reject(err); 
                } else {
                    resolve([results, fields]);
                }
            }
        ) 
    });
}