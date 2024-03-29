# CSR && SSR

- **CSR 即客户端渲染，可以简单理解为由服务器发送资源，客户端本地对该资源进行加载呈现。 SSR 即为服务端渲染，可以简单理解成，由服务器将资源都家在完成打包后发送给本地客户端，本地客户端只需要进行下载渲染。**
- **目前市场上大部分都采用的是CSR方式。**

- **对于框架而言，SSR 目前较为流行的是 Next.js 框架。该框架具有特定的写法，与传统 CSR 具有较大差异。**



## CSR

- **具体流程：**
- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1627397293663-893fa9b2-6628-467b-a3a4-cae0867bf0d4.png)





## React SSR

- **是指将单页面应用(SPA)在服务器渲染成HTML片段，发送到浏览器，然后交由浏览器为其绑定状态与事件，成为完全可交互页面的过程。**
- **SSR渲染流程**

- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1627397490444-161c2545-59bf-499d-8f8a-a55461f34582.png)
- **服务端只负责首次“渲染”（真正意义上，只有浏览器才能渲染页面，服务端其实是生成HTML内容），然后返回给客户端，客户端接管页面交互（事件绑定等逻辑），之后客户端路由切换时，直接通过Js代码来显示对应内容，****不再需要服务端渲染（只有页面刷新时会需要）**



## 为什么需要 SSR ？

- **优点：更快的首屏速度，不需要等待Js内容完成下载且执行才显示内容，更快速地看到完整的渲染的页面，有更佳的体验度。有利于更好的 SEO，爬虫可以直接抓取渲染之后的页面，CSR 首次返回的 HTML 文档中，是空节点 （root），不包含内容，爬虫就无法分析该网站内容，因此无法排名。而 SSR 返回的是渲染之后的 HTML 代码片段，内容完整，更加容易被爬虫分析和索引。**
- **旧版本的搜索引擎，只能通过 HTML 文档中的 Meta 标签的属性 title description 中进行操作。而对于新版本的搜索引擎，可以使用 SSR 来优化 SEO 。**

- **缺点：对服务器性能消耗较大。项目复杂度较大，较难维护。且需要考虑 SSR 机器的运维等成本。**

