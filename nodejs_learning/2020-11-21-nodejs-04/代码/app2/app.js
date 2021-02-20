const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const nunjucks = require('nunjucks');
const mysql2 = require('mysql2');
const koaBody = require('koa-body');
const parsePath = require('parse-filepath');
const cookieParse = require('cookie-parse');


// 创建数据库链接
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'kkb_13'
});

const app = new Koa();

const key = 'kkb';
app.keys = [key];

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
  
    let categories = [];
  
    let categoryId = ctx.params.id;
  
    let page = ctx.request.query.page;
    if (!page) {
        page = 1;
    }
    

    let prepage = 8;
    let offset = (page - 1) * prepage;

    let sqlCount = 'SELECT count(id) as count FROM `items`'; 
    let [[{count}]] = await query(sqlCount);
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
router.get('/addItem', verify, async ctx => {
    [categories] = await query('SELECT * FROM `categories`');

    ctx.body = nunjucks.render('addItem.html', {
        categories,
        uid: ctx.state.uid
    });
});

// post提交过来的数据进行处理
router.post('/addItem', koaBody({
    // 设置 koaBody 能够解析 formdata 格式的数据
    multipart: true,
    // 设置上传的二进制文件的处理
    formidable: {
        // 上传的二进制文件存储在服务器中的位置
        // 上传后的文件名称是koabody自动重新命名的
        // 上传后文件名称尽量不要使用上传之前的原始文件的名称，因为会有覆盖的问题：c：1.jpg d: 1.jpg
        uploadDir: './public/items',
        keepExtensions: true
    }
}), async ctx => {
    let [categories] = await query('SELECT * FROM `categories`');

    let {categoryId, name, price} = ctx.request.body;
    // let {cover} = ctx.request.files;
    // console.log('cover', cover);
    // 数据库中存储的是文件上传以后在服务器里面的新名字
    let {base: cover} = parsePath(ctx.request.files.cover.path);
    // console.log('cover', cover);


    let [rs] = await query(
        "INSERT INTO `items` (`category_id`, `name`, `price`, `cover`) VALUES (?, ?, ?, ?)",
        [categoryId, name, price, cover]
    );
    // console.log('rs', rs);

    // ctx.body = '<p>添加成功</p><p><a href="/addItem">继续添加</a> | <a href="/">回到首页</a></p>';
    ctx.body = nunjucks.render('message.html', {
        categories,
        message: '<p>添加成功</p><p><a href="/addItem">继续添加</a> | <a href="/">回到首页</a></p>'
    });
});


// 注册界面
router.get('/register', async ctx => {
    [categories] = await query('SELECT * FROM `categories`');

    ctx.body = nunjucks.render('register.html', {
        categories
    });
})

// 注册逻辑
router.post('/register', koaBody(), async ctx => {
    let [categories] = await query('SELECT * FROM `categories`');

    let {username, password, repassword} = ctx.request.body;

    // 处理一下数据校验
    if (!username) {
        return ctx.body = nunjucks.render('message.html', {
            categories,
            message: '用户名不能为空'
        });
    }

    // 检测用户名是否已经被注册
    let [user] = await query(
        'SELECT * FROM `users` where `username`=?',
        [username]
    );

    if (user.length) {
        return ctx.body = nunjucks.render('message.html', {
            categories,
            message: '用户名已经被注册'
        });
    }

    // 保存用户数据
    let [rs] = await query(
        "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)",
        [username, password]
    );

    ctx.body = nunjucks.render('message.html', {
        categories,
        message: '注册成功'
    });
    
})

// 登录页面 
router.get('/login', async ctx => {
    [categories] = await query('SELECT * FROM `categories`');

    ctx.body = nunjucks.render('login.html', {
        categories
    });
})

// 登录逻辑
router.post('/login', koaBody(), async ctx => {
    [categories] = await query('SELECT * FROM `categories`');

    let {username, password} = ctx.request.body;

    let [[user]] = await query(
        'SELECT * FROM `users` where `username`=? AND `password`=? limit 1',
        [username, password]
    );

    if (!user) {
        return ctx.body = nunjucks.render('message.html', {
            categories,
            message: '用户名或密码错误'
        });
    }

    /**
     * HTTP 协议：无状态协议，每次请求实际上是相对独立的，服务端无法获知接收到n次请求之间是否是有关联的
     * 把当前这次请求成功后的用户登录状态发送给客户端，让其在后续的请求中再携带过来
     * cookie
     *  携带存储和发送用户凭证的一个头信息
     */
    // ctx.set('Set-Cookie', 'id='+user.id); // 通过 signed 设置cookie签名，签名：证书
    ctx.cookies.set('id', 1, { signed: true });
    ctx.body = nunjucks.render('message.html', {
        categories,
        message: '登录成功'
    });
})

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

async function verify(ctx, next) {
    // let cookies = cookieParse.parse(ctx.get('Cookie'));
    // let id = ctx.cookies.get('id');
    ctx.state.uid = ctx.cookies.get('id', {
        signed: true
    });
    // 根据uid从数据中获取具体的用户信息，存储在 ctx.state.user = {}  ，以供后续中间件去使用
    // console.log('cookies', cookies);
    console.log('id', ctx.state.uid);
    if (ctx.state.uid) {
        await next();
    } else {
        ctx.set('Location', '/login');
        ctx.status = 301;
        ctx.body = '';
    }
}