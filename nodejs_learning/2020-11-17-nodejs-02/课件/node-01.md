# 从浏览器输入 URL 到页面展示过程的过程中发生了什么？

1、在浏览器地址栏输入 URL 并回车/跳转 发送的时候，浏览器会调用内部资源加载器（类似浏览器内置的下载工具或迅雷等）加载相应资源。

依据协议的不同加载方式也不一样：

​		1、file协议，根据url路径加载本地资源。

​		2、http等协议，根据url加载（下载）网络中的资源。

2、通过IP（如果是域名，则会先通过DNS转成对应IP）定位到指定的目标资源所在的主机，并等待主机处理和响应。

3、主机对每次的请求进行分析，并通过请求携带的端口转发给对应的处理程序（QQ的消息交给QQ这个软件处理，微信的消息交给微信这个软件处理），通常针对 http 这种请求，相关数据交由主机指定的软件进行处理（称为 WebServer APP，如：Nginx、Apache、IIS、Tomcat……）

4、WebServer 分析请求信息，如请求的方式，请求的路径，请求携带的其他各种规定好的或自定的数据。根据这些数据，以及自己定义的业务规则，处理数据，然后进行返回。返回的数据可以是JSON格式的字符串，也可以是HTML格式的字符串，或者各种图片、音频、视频等数据。

5、浏览器接收资源加载器请求（主机返回）的数据，然后根据得到的内容类型进行解析处理。

6、如果浏览器解析过程中，比如解析的是html内容，碰到类似link，script，img等标签，又或者是后续用户的一些行为，如点击a链接，提交一个表单等，再次触发资源加载请求，重复上述步骤……



通常，我们把发送请求（需求）的一方称为：**客户端**。接收请求（提供服务）的一方成为：**服务端**。





# WebServer

WebServer 本质上就是一个软件，一个用来处理网络数据交互的程序，它可以用任何具备网络编程的语言来实现，如：c、c++、java，python，php 等，我们前面介绍的 Node.js 也可以。



# 基于 Node.js 构建 WebServer

Node.js 中已经内置提供了一个模块： `http` ，这个模块就提供了实现 http 所需要的 API：

- 提供了服务端接口，用来响应客户端发送的 http 请求。
- 提供了客户端接口，可以像浏览器一样发送请求到其它服务端。



> https://nodejs.org/dist/latest-v12.x/docs/api/http.html



## 创建 WebServer

我们要创建一个 WebServer，需要使用 `http` 模块下 `http.Server` 类来创建一个 `Server` 对象，我们可以通过一个静态工厂方法 `http.createServer` 来得到该类的实例对象：

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');

// 创建一个 Server 对象
const server = http.createServer();
```

### 端口的意义

一台主机的网卡数量是有限的，不可能为主机上的每一个程序去安装一个网卡。为了解决不同的应用程序共享网卡而不至于数据混乱的问题，系统会准备一批端口（类似银行窗口），由需要使用端口进行数据通信的程序去申请（监听），申请成功以后，就可以进行网络数据交互了。

通常，监听端口数据需要程序主动指定。发送请求由系统随机分配，如：

主机：111.111.111.111 监听 8888 端口

客户端发送请求：222:222:222:222:4567 => (发送数据) => 111.111.111.111:8888

> 注：端口取值范围为：1-65535，即 216 。通常约定1-1023之间的端口为系统常见程序预留端口，1024-5000为通信临时随机端口，5000以后为用户自定端口。

### 端口监听

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');

// 创建一个 Server 对象
const server = http.createServer();

// 监听一个指定的端口，第二参数如果是指定要监听的网卡所在网络的IP(一台机器可能存在多个网卡，一个网卡也可能会在多个不同的网络中，127.0.0.1 默认指本地回环网络，即自己给自己通信的特殊IP，同时有个默认的域localhost，0.0.0.0 表示所有网卡所有IP，可省略)，
server.listen(8888, '127.0.0.1', () => {
  console.log('服务已经启动了，http://127.0.0.1:8888');
});
```

使用 Node 解析器执行该程序，程序就会进入监听状态（不会退出）

```shell
node app.js
```



## 处理用户请求

`server` 会提供一些的事件，我们通过 Node.js 内置的 `on` 方法来监听这些事件，完成对应的业务处理。

当服务启动成功以后，客户端就可以通过发送对应的 `http` 请求（http://127.0.0.1:8888）来完成与上述服务器的通信了。

> 因为浏览器在发送请求的时候，默认端口为 80，所以，如果服务端监听的是 80 端口，那么浏览器在请求过程中可以不需要显式填写端口了，http://127.0.0.1:80 => http://127.0.0.1

### request 事件

当服务启动成功以后，我们可以监听 `server` 对象的 `request` 事件来处理客户端请求。

```js
// [file: app.js]

//...

server.on('request', () => {
  console.log('有客户端发送了一个请求');
});

//...
```

我们还可以在 `http.createServer` 的时候传入一个 `callback` 参数，这个 `callback` 就是 `request` 事件的回调函数。

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');

// 创建一个 Server 对象
const server = http.createServer(() => {
  console.log('有客户端发送了一个请求');
});

server.listen(8888, () => {
  console.log('服务已经启动了，http://127.0.0.1:8888');
});
```

在 `request` 事件回调函数中会自动传入两个参数，供我们进行后续的业务逻辑调用：

- http.IncomingMessage：一个 Node.js 封装好的对象，与当前请求的客户端相关信息（客户端请求提交的数据，IP等）和方法都是通过该对象来完成。
- http.ServerResponse：也是一个 Node.js 封装好的对象，提供了服务端信息和方法，比如向客户端发送数据的方法就由该对象提供。

### http.IncomingMessage 对象

一个 Node.js 封装好的对象，与当前请求的客户端相关信息（客户端请求提交的数据，IP等）和方法都是通过该对象来完成。

一些常用属性和方法：

- url: 当前客户端请求的 url，http://域名:端口 后面的部分，不包含 http://域名:端口。
- headers: 当前客户端请求携带的头信息数据。
- method: 当前客户端所使用的请求方法。
- httpVersion：当前客户端请求所使用的 http 协议的版本。
- on():  监听一些事件。

### http.ServerResponse

也是一个 Node.js 封装好的对象，提供了服务端信息和方法，比如向客户端发送数据的方法就由该对象提供。

一些常用的属性和方法：

- write(chunk[, encoding][, callback])：服务端发送数据给客户端的方法，但是需要调用end方法来结束当前请求。
- end([data[, encoding]][, callback])：与write类似。
- setHeader(name, value): 设置发送给客户端的额外信息（头信息）。
- statusCode：响应状态码。
- statusMessage：响应状态码对应的文本。
- writeHead(statusCode[, statusMessage][, headers])：与 end 类似，注意：调用 writeHead 以后不能在进行头信息设置了。

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');

// 创建一个 Server 对象
const server = http.createServer((req, res) => {
  // 代表了客户端的 req 对象
  console.log('req', req);
  // 代表了服务端的 res 对象
  console.log('res', res);
});

server.listen(8888, () => {
  console.log('服务已经启动了，http://127.0.0.1:8888');
});
```



## url 的作用

我们通常会通过一个 `URL` 来访问不同的内容。这里的 `URL` 也称为： `统一资源定位符（Uniform Resource Locator）` 。

参考：

- [https://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%B3%BB%E7%BB%9F/5937042?fromtitle=url&fromid=110640](https://baike.baidu.com/item/统一资源定位系统/5937042?fromtitle=url&fromid=110640)
- https://en.wikipedia.org/wiki/URL



![image.png](./image.png)

每一个互联网中的资源（资源可以是一段HTML字符串、HTML文件、CSS文件、JS文件、图片、视频、音频……）都会通过一个 `URL` 来与之对应，但是这种对应关系需要程序（WebServer）来实现。比如：http://kaikeba.com/js/hello 这个 URL 在找到 kaikeba.com 这个主机（服务器）以后，/js/hello 这个虚拟的 URL 路径会返回对应的内容是什么，它可以直接返回一个字符串，也可以返回一个服务器在某个地方存储的文件，也也也可以是这个服务器去另外一个主机上读取的内容。

### req.url

我们可以通过分析每次请求的 `url` 来获取当前客户端要请求的资源。

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');

// 创建一个 Server 对象
const server = http.createServer((req, res) => {
  // 当前请求的 url
  console.log('req.url', req.url);
});

server.listen(8888, () => {
  console.log('服务已经启动了，http://127.0.0.1:8888');
});
```

### res.write AND res.end

根据不同的请求 URL 以及当前具体业务逻辑，通过 `res` 对象的 `write` 和 `end` 方法向客户端返回这次请求的结果。

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');
const fs = require('fs');

// 创建一个 Server 对象
const server = http.createServer((req, res) => {
  const url = req.url;
  let resContent = '';
  
  // 针对不同url进行不同的处理
  if (url == '/') {
    // 返回一个字符串
    resContent = 'hello';
  } else if (url == '/now') {
    resContent = (new Date).toString();
  } else if (url == '/kkb.html') {
    resContent = fs.readFileSync('./kkb.html');
    } else {
    resContent = '啥也没有';
  }
  
  res.end(resContent);
});

server.listen(8888, () => {
  console.log('服务已经启动了，http://127.0.0.1:8888');
});
```



## 静态资源 Vs 动态资源

许多时候，我们会把资源简单的划分成：

- 静态资源
- 动态资源

### 静态资源

相对不变的内容（除非你修改了它的内容），类似程序中的 变量与常量。

比如前面 / 、/kkb.html 以及 最后那个 啥也没有，就是静态内容，除非你去修改内容本身，否则访问对应的 URL ，返回的内容永远不变。

### 动态资源

与静态资源不同，同一个 URL 返回的内容并不固定，比如访问 /now 这个 URL，即使不做任何修改，你就有可能得到不一样的结果，这就是动态资源。



## 静态资源代理（处理）服务

通常，我们的 WebServer 会提供各种静态资源（html代码、css代码、js代码、图片……），而这些资源我们又通常会通过文件的方式存储在某个地方。为了批量处理这种资源与 URL 的对应关系，我们会根据某种规则（规则自己定义，或者说由实现WebServer的各种软件和框架）来自动映射。

我们把静态资源文件存放在服务器的某个位置，如：

- D:/kkb/public/

同时我们去解析请求的 URL，只要 URL 上的路径符合某种规则（自定），如：

- /public/1.html

那么我们可以根据这种规则，利用 `fs` 去读取对应的文件，只需要按照 URL 去生成对应的真实文件路径即可：

```js
// [file: app.js]

// 首先通过 require 引入 http 模块
const http = require('http');
const fs = require('fs');

// 创建一个 Server 对象
const server = http.createServer((req, res) => {
  const url = req.url;
  let resContent = '';
  
  // 针对不同url进行不同的处理
  if (url.startsWith('/public')) {
    // 真实文件存储的位置自己写的自己定，用别人写的就根据别人的规则定，原理一样
    // resContent = fs.readFileSync('D:/kkb' + url);
    resContent = fs.readFileSync('.' + url);
  } else {
    // 这里处理动态资源，以及其它一些情况
    if (url == '/now') {
      resContent = (new Date).toString();
    } else {
      resContent = '啥也没有';
    }
  }
  
  res.end(resContent);
});

server.listen(8888, () => {
  console.log('服务已经启动了，http://127.0.0.1:8888');
});
```



## 头信息

头信息是每次请求和响应的时候所携带的一些非主体内容相关的信息，用于请求和接收方作为某种处理依据（但其本身并非主要内容），比如请求的时候所使用的代理（如浏览器，请求并不一定是浏览器发起，比如迅雷等下载软件也可以发送http请求）。作用类似写信（邮件）所填写的邮编、邮箱地址等非信件本身的信息。

由的头信息只能在请求中设置，有的只能在响应中设置，而有的双方都可以设置。

参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers



### Content-Type

设置发送的内容 MIME 类型

参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type



### MIME

参考：

https://baike.baidu.com/item/MIME/2900607

https://en.wikipedia.org/wiki/MIME

http://www.iana.org/assignments/media-types/media-types.xhtml



## 动态资源处理

许多时候，动态资源会相对复杂一些，有的时候需要根据业务产生一些数据，同时又会把这个数据进行一些包装（嵌入到HTML代码）中，如果每次都字符串拼接去做会比较麻烦：

- 拼接数据和html字符串毕竟麻烦，且容易出错。
- 逻辑处理很繁琐，同样也容易出错。
- 不容易维护，前端页面处理（html、css等）和后端（Node.js）代码混合。
- ……

### 模板引擎

把数据与某个模板文件（通常是类似HTML，但是又包含了一些特殊定义的语法的字符串/文件），进行结合，利用引擎（写好的方法）去对模板文件中的特殊语法（模板引擎定义语法 - 语法取决于具体模板引擎）进行解析，得到最终的 HTML 字符串。

#### Nunjucks

参考：

https://mozilla.github.io/nunjucks/

https://nunjucks.bootcss.com/



# queryString

在 URL 中，除了路径部分，还有一个 query 部分（url 的 `?` 后面的内容），称为：查询字符串（queryString），通常情况下，我们可以在请求的 URL 中通过路径 `?` 后面加入一种特殊组织格式的数据携带一些数据，用于服务端进行一些额外的逻辑处理。

它的结构为使用 `&` 或者 `;` 分割的键值对字符串，键值对的 键 与 值 使用 `=` 进行分隔，如：

```
http://kaikeba.com/items?order=asc&typeId=1
```

参考：

https://en.wikipedia.org/wiki/Query_string

## Node.js 中的 queryString 模块

我们可以自己封装处理 queryString 的方法，也可以直接使用 Node.js 内置的 `queryString` 模块来处理。

参考：https://nodejs.org/dist/latest-v12.x/docs/api/querystring.html



# 请求方式

为了规范统一和语义化资源处理的行为，在定义了 URL 这种资源定位规范以外，还定义了一套动作，也称为请求方式（请求方法）

参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods

```js
// 针对 POST 方式提交的数据进行单独处理
} else if (url == '/add' && req.method.toUpperCase() == 'POST') {
  let data = await new Promise(resolve => {
    let reqData = '';
    req.on('data', data => {
      console.log('data', data);
      reqData += data.toString();
    })
    req.on('end', () => {
      console.log('over');
      resolve(reqData);
    })
  })
  console.log('提交过来的数据是：', data);
  resContent = '提交成功';
}
```

##  Content-Type

同时，我们也可以通过提交过来的 `Content-Type` 来针对性的处理：

- application/x-www-form-urlencoded
- multipart/form-data
- text/plain



> 注：
>
> - 浏览器 GET 不支持提交正文
> - queryString 属于 URL，与请求方式无关（任何方式的请求都可以携带 queryString）



# 工具

一些开发工具

- nodemon: https://www.npmjs.com/package/nodemon