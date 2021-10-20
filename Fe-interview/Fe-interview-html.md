# HTML

## HTML5 新特性

### 语义化标签

- **就如字面意思。自载一定的CSS样式，可以直接用，同时也因为语义化标签，利于被搜索引擎解析，利于SEO优化。**
- **包含： <h1-h6> <strong> <aside> <article> <header> <footer> <nav> <section>**



### 媒体元素

- **audio、vedio**



### Web Storage

- **提供一种除了 Cookie 之外的存储会话数据的途径。**
- **提供一种存储大量可以跨会话存在的数据的机制。**

- Web Storage 包含 LocalStorage、 SessionStorage。

- - SessionStorage 绑定服务器对话，在浏览器关闭的时候，就会失效，且由于绑定的是服务器，固然在本地是没有作用的。 

```javascript
sessionStorage.setItem("name", "James");
var name = sessionStorage.getItem("name")
```

- - **LocalStorage 常用作持久化客户端保存数据的一种方案。即我们在浏览器使用的登录信息等，都可存入其中。设置 LocalStorage 的****目的是跨越会话存储对象，但有特定的访问限制。要访问同一个localStorage对象，页面必须来自同一个域名(子域名无效)，使用同一种协议，在同一个端口上。**

```javascript
localStorage.setItem("name", "James");
var name = localStorage.getItem("name")
```

## 

### Web Socket

- **WebSocket 目标是在一个持久连接上提供全双工、双向通信。该协议需要专门的服务器，传统的HTTP服务器不起效。且由其协议构成的网站都为ws://.... 或者wss://....。****使用自定义协议而不是HTTP协议的好处是，能够在客户端和服务器之间发送非常少量的数据，而不必担心HTTP那样字节级的开销。**

```javascript
var socket = new WebSocket(ws:// www.example.com)
socket.send("Hello World")
//对于复杂的数据结构，需要提前进行序列化处理，即转成 JSON 文件，通过stringify方法进行发送。
socket.send(JSON.stringify(Message))
socket.close()
```



### Canvas 绘图

- **这个元素负责在页面中设定一个区域，然后就可以通过JavaScript动态地在这个区域中绘制图形。**

## Meta Tag

- **Meta 标签：含有四种类型，分别为Meta KeyWords Attribute（已被弃用）、 Title Tag、 Meta Description Attribute、 Meta Robots Attribute。**
- **Title Tag 即为浏览器上方显示的字段- "...How Meta Tags...."** 

- ![img](https://cdn.nlark.com/yuque/0/2021/gif/22079037/1627378137132-f719ad31-ca15-47d9-91d3-c9217b54d549.gif)
- **Meta Description Attribute：指的是搜索信息时下方出现的一串字段。**

- ![img](https://cdn.nlark.com/yuque/0/2021/gif/22079037/1627378137139-7b1ccfb4-e346-4ad3-b7e1-00e6792876cd.gif)
- **Meta Robots Attribute -index/noindex：告诉搜索引擎是否展示页面。 follow/nofollow：告诉搜索引擎如何处理页面中的链接，是否跟从链接。其相对应的类型有：name属性、 http-equiv、 charest、 itemprop。**

- - **如果定义了 name 属性，则 meta 提供的是文档级别的元数据，可以适用于整个页面。**
  - **如果定义了 http-equiv 属性，则 meta 元素为编译指令。常设置的值有 content-security-policy ，该值有助于防止 XSS 攻击、 content-type，以及X-ua-compatible。**

- - - **X-ua-compatible 是 IE8 提供的一种新的属性，仅向上兼容。**

- - **<meta http-equiv="X-UA-Compatible" content="IE=7">**  
  - **#以上代码告诉IE浏览器，无论是否用DTD声明文档标准，IE8/9都会以IE7引擎来渲染页面。** 

- -  **<meta http-equiv="X-UA-Compatible" content="IE=8">**  
  -  **#以上代码告诉IE浏览器，IE8/9都会以IE8引擎来渲染页面。**  

- - **<meta http-equiv="X-UA-Compatible" content="IE=edge">**  
  - **#以上代码告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面。**  

- - **<meta http-equiv="X-UA-Compatible" content="IE=7,IE=9">**  
  - **<meta http-equiv="X-UA-Compatible" content="IE=7,9">**  

- - **<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">**
  - **#以上代码IE=edge告诉IE使用最新的引擎渲染网页，chrome=1则可以激活Chrome Frame.**  



- ==**<meta charset="utf-8">** vs <meta http-equiv="Content-Type" charset="utf-8">==两者区别，前者仅仅只是定义了当前页面的编码格式。而后者则是多设置了与服务器之间的发送和返回数据的格式，更加严谨。



## link 和 @import 导入资源有什么区别 ？

- link 是 HTML 标签，@import 是 CSS 提供的。
- link 引入的样式页面加载时同时加载，@import 引入的样式需要页面加载完成后再加载。

- link 没有兼容性问题， @import 不兼容 IE5 以下。
- link 可以通过 Js 操作 DOM 动态引入样式表改变样式，而 @import 不可以。



## H5 全局属性



| 属性                  | 描述                                                       |
| --------------------- | ---------------------------------------------------------- |
| accesskey             | 设置访问元素的键盘快捷键。                                 |
| class                 | 规定元素的类名（classname）                                |
| contenteditable（h5） | 规定是否可编辑元素的内容。                                 |
| contextmenu（h5）     | 指定一个元素的上下文菜单。当用户右击该元素，出现上下文菜单 |
| data-*（h5）          | 用于存储页面的自定义数据                                   |
| dir                   | 设置元素中内容的文本方向。                                 |
| draggable（h5）       | 指定某个元素是否可以拖动                                   |
| dropzone（h5）        | 指定是否将数据复制，移动，或链接，或删除                   |
| hidden（h5）          | hidden 属性规定对元素进行隐藏。                            |
| id                    | 规定元素的唯一 id                                          |
| lang                  | 设置元素中内容的语言代码。                                 |
| spellcheck（h5）      | 检测元素是否拼写错误                                       |
| style                 | 规定元素的行内样式（inline style）                         |
| tabindex              | 设置元素的 Tab 键控制次序。                                |
| title                 | 规定元素的额外信息（可在工具提示中显示）                   |
| translate（h5）       | 指定是否一个元素的值在页面载入时是否需要翻译               |

# 

## a 标签的 target 属性



- `a` 标签的 `target` 属性一共有四个值。
- `_self`
  默认属性。在当前窗口或者框架中加载目标文档。

- `_blank`
  打开新的窗口或者新的标签页。在使用这个属性时，最好添加 `rel="noopener norefferrer"` 属性，防止打开的新窗口对原窗口进行篡改。防止 `window.opener` API 的恶意行为。
- `_parent`
  在 `frame` 或者 `iframe` 中使用较多。在父级框架中载入目标文档，当 `a` 标签本身在顶层时，与 `_self` 相同。

- `_top`
  在 `frame` 或者 `iframe` 中使用较多。直接在顶层的框架中载入目标文档，加载整个窗口。



## label 的作用

实例：

- 利用 label 模拟 button 来解决不同浏览器原生 button 样式不同的问题。

```html
<input type="button" id="btn">
<label for="btn">Button</label>

<style>
input[type='button'] {
  display: none;
}

label {
  display: inline-block;
  padding: 10px 20px;
  background: #456;
  color: #fff;
  cursor: pointer;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,.3);
  border-radius: 2px;
}
</style>
```

- 结合 checkbox 、radio 表单元素实现纯 CSS 状态切换。 例如控制 CSS 动画播放和停止。
- [详细实例地址](https://codepen.io/mts123/pen/EzqdbM)  以及一个基于 radio 的 [摩斯密码键盘](https://codepen.io/mts123/pen/vqpQvR)

```html
//部分代码 具体实现
<input type="checkbox" id="controller">
<label class="icon" for="controller">
  <div class="play"></div>
  <div class="pause"></div>
</label>
<div class="animation"></div>

<style>
...
#controller:checked ~ .animation {
  animation-play-state: paused;
}
...
</style>
```

- input 的 focus 事件会触发锚点定位，可以利用 label 当触发器实现选项卡切换的效果。
- [实际效果链接](https://demo.cssworld.cn/6/4-3.php)

```html
<div class="box">
  <div class="list"><input id="one" readonly>1</div>
  <div class="list"><input id="two" readonly>2</div>
  <div class="list"><input id="three" readonly>3</div>
  <div class="list"><input id="four" readonly>4</div>
</div>
<div class="link">
  <label class="click" for="one">1</label>
  <label class="click" for="two">2</label>
  <label class="click" for="three">3</label>
  <label class="click" for="four">4</label>
</div>

<style>
.box {
  width: 20em;
  height: 10em;
  border: 1px solid #ddd;
  overflow: hidden;
}
.list {
  height: 100%;
  background: #ddd;
  text-align: center;
  position: relative;
}
.list > input { 
  position: absolute; top:0; 
  height: 100%; width: 1px;
  border:0; padding: 0; margin: 0;
  clip: rect(0 0 0 0);
}
</style>
```

## 

## viewport (在移动端中极为重要)

- 手机浏览器把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。

- <meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>

- 具有以下属性： 

| 属性名        | 取值                    | 描述                                                |
| ------------- | ----------------------- | --------------------------------------------------- |
| width         | 正整数 \| device-width  | 定义视口的宽度，单位为像素                          |
| height        | 正整数 \| device-height | 定义视口的高度，单位为像素，一般不用                |
| initial-scale | [0.0-10.0]              | 定义初始缩放值                                      |
| minimum-scale | [0.0-10.0]              | 定义缩小最小比例，它必须小于或等于maximum-scale设置 |
| maximum-scale | [0.0-10.0]              | 定义放大最大比例，它必须大于或等于minimum-scale设置 |
| user-scalable | yes \| no               | 定义是否允许用户手动缩放页面，默认值yes             |

## 

## 为什么 H5 只需要写<!DOCTYPE HTML>就可以了？

- 因为 HTML5 与 HTML4 基于的基准不同。HTML4 基于 SGML 因此需要除了 `DOCTYPE` 外还需要引入 DTD 来告诉浏览器用什么标准进行渲染。DTD 还分为标准模式、严格模式。如果什么都不写，就完全让浏览器自我发挥，会变成怪异模式。
- HTML5 不基于 SGML，因此后面就不要跟 DTD，但是需要 `DOCTYPE` 来规范浏览器的渲染行为。

- 注：SGML 是通用标记语言的集合。其中有 HTML、XML，因此需要用 DTD 来指定使用那种规范



## 常见的浏览器内核

- 内核主要分为渲染引擎和 JS 引擎。前者负责页面的渲染，后者负责执行解析 JavaScript。之后，由于 JS 引擎越来越独立，现在所说的浏览器内核大都指渲染引擎。目前主流的内核有以下 4 个：
- Trident: 由微软开发，即我们熟知的 IE 内核

- Gecko: 使用 C++ 开发的渲染引擎，包括了 SpiderMonkey 即我们熟悉的 FireFox
- Presto: Opera 使用的内核

- Webkit: 前端使用最多的 Chrome 和 Safari 使用的内核



## 浏览器内多标签页间通信

- https://xv700.gitee.io/message-communication-for-web/

## Iframe 框架都有哪些优缺点？

- 优点：

- - 重载页面时不需要重载整个页面，只需要重载页面中的一个框架页
  - 技术易于掌握，使用方便，可主要应用于不需搜索引擎来搜索的页面

- - 方便制作导航栏

- 缺点：

- - 会产生很多页面，不容易管理
    *不容易打印
  - 对浏览器搜索引擎不友好

- - 多框架的页面会增加服务器的http请求



## 关于 input 中的 disabled 和 readonly 

- 区别：

- - 作用范围：disabled 作用于所有表单元素，而 readonly 只对 input 等可输入标签起效。
  - 作用程度：disabled 是禁用元素的所有操作，而 readonly 仅仅只是设置当前元素可读，其余操作正常。

- - 提交效果：disabled 使当前元素值无法被发送，而 readonly 可以。

