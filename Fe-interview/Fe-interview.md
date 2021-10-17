Adblocker

[![语雀](https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg)]()

[Csy]()/[打工人学习资料]()/[FE-Learning]()/











Sharing

[Edit]()

###### Table of contents



[无标题]()

[FE-Learning]()



# FE-Learning

# 计算机网络

 OSI七层模型，从下至上分为 **物理层、数据链路层、网络层、传输层、会话层、表示层、应用层**。

## 应用层

- 定义进程间交互规则，通过不同的应用层协议为不同的网络应用提供服务。例如DNS、HTTP、SMTP。

### 域名系统（DNS）

- - -  **DNS ，提供主机名与IP地址之间的相互转换的服务。**
    -  **DNS 域名分层次结构：根域名、顶级域名、二级域名**

- - - ![img](https://cdn.nlark.com/yuque/0/2021/jpeg/22079037/1628174164716-db302010-c28e-4a0d-802e-f6772b0368ee.jpeg)

注意：DNS 涉及两种查询方式：一种是`递归查询(Recursive query)` ，一种是`迭代查询(Iteration query)`。



如果根域名服务器无法告知本地 DNS 服务器下一步需要访问哪个顶级域名服务器，就会使用递归查询；



如果根域名服务器能够告知 DNS 服务器下一步需要访问的顶级域名服务器，就会使用迭代查询。

### 文件传输协议（FTP）

-  **FTP 使用 TCP 进行连接，需要通过两个连接实现文件传输。**

- - **控制连接：服务器打开 21 端口号等待客户端连接，客户端建立连接后，客户端会通过这个连接将命令给服务器，同时客户端也会通过这个连接接收服务端返回的数据。**

- - - **数据连接：传输文件数据。**

- - - - **数据连接有两种模式：主动模式、被动模式**

- - - - - **主动模式：服务器端主动建立数据连接。**
        - **被动模式：客户端主动建立数据连接。**

- - - - **主动模式需要客户端开放端口，需要配置主机防火墙，而被动模式要求服务器端开放端口，可能会有安全性问题。**

### 电子邮件协议

- **电子邮件系统组成三部分：邮件服务器、邮件协议、用户代理。**
- **邮件协议：发送协议：SMTP  读取协议：POP3、IMAP （例子：微软、苹果自带邮件绑定）**

- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628175321487-18bd1d3a-9dfa-41d3-86ae-3646896909f4.png)



### HTTP

**HTTP是一种无状态的超文本传输协议，使用明文传输。**

#### HTTP 1.0 与 HTTP 1.1（HTTP 1.0 支持 Get Post Head）（HTTP 1.1 增支持 OPTIONS PUT DELETE TRACE CONNECT）

- **缓存处理：**在 HTTP 1.0 中，主要用的是 Response Header 里的 if-Modified-Since，Expires 来做缓存判断的标准。在 HTTP 1.1 中则是引入了 Etag、if-None-Match等缓存头来控制缓存协议。
- **带宽优化以及网络连接的使用：**在 HTTP 1.0 中，客户端仅仅需要某对象中的单个部分，但却需要服务器将整个对象发送过来，并且也不支持断点续传功能。 HTTP 1.1 在 Request Header 中引入了 range 头域，它只允许仅请求资源的某个部分，即返回码是 206，这样就方便了。

- **错误通知的管理：**在 HTTP 1.1 中新增了 24 个错误状态响应码。如 409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
- **Host 头处理：**在 HTTP1.0 中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。

- **长连接：**HTTP 1.1 支持长连接（Persistent Connection）和请求的流水线（pending）处理，在一个 TCP 连接上可以传递多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟， 在 HTTP 1.1 中默认开启 Connection: Keep-alive ，一定程度上弥补 HTTP 1.0 每次请求都要创建连接的缺点。



#### SPDY：HTTP 1.x 优化（冷门些，少考）

- 2012年 google 提出了SPDY的方案，优化了HTTP1.X的请求延迟，解决了 HTTP1.X 的安全性，具体如下：
- **降低延迟**，针对 HTTP 高延迟的问题，SPDY 优雅的采取了多路复用（multiplexing）。多路复用通过多个请求 stream 共享一个tcp连接的方式，解决了 HOL blocking 的问题，降低了延迟同时提高了带宽的利用率。

- **请求优先级**（request prioritization）。多路复用带来一个新的问题是，在连接共享的基础之上有可能会导致关键请求被阻塞。SPDY 允许给每个 request 设置优先级，这样重要的请求就会优先得到响应。比如浏览器加载首页，首页的 html 内容应该优先展示，之后才是各种静态资源文件，脚本文件等加载，这样可以保证用户能第一时间看到网页内容。
- **header压缩。**前面提到 HTTP1.x 的header很多时候都是重复多余的。选择合适的压缩算法可以减小包的大小和数量。

- **基于HTTPS的加密协议传输**，大大提高了传输数据的可靠性。
- **服务端推送**（server push），采用了SPDY的网页，例如我的网页有一个 sytle.css 的请求，在客户端收到sytle.css数据的同时，服务端会将 sytle.js 的文件推送给客户端，当客户端再次尝试获取 sytle.js 时就可以直接从缓存中获取到，不用再发请求了。



#### HTTP 2.0

- HTTP 2.0 是 SPDY 的升级版，但仍在一定的区别。
- 例如，SPDY 仅支持 HTTPS 协议，而 HTTP 2.0 可以支持明文传输。

- **拥有的新特性：**

- - **新的二进制格式：**HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便。
  - **多路复用：**即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。

- - **header 压缩：**如上文中所言，对前面提到过HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。
  - **服务端推送**（server push），同 SPDY 一样，HTTP2.0 也具有server push功能。



#### HTTP 请求方法

- [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)

GET 方法请求一个指定资源的表示形式，使用GET的请求应该只被用于获取数据。

- [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)

HEAD 方法请求一个与 GET 请求的响应相同的响应，但没有响应体。

- [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

POST 方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用。

- [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)

PUT 方法用请求有效载荷替换目标资源的所有当前表示。

- [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)

DELETE 方法删除指定的资源。

- [CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT)

CONNECT 方法建立一个到由目标资源标识的服务器的隧道。

- [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)

OPTIONS 方法用于描述目标资源的通信选项。

- [TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)

TRACE 方法沿着到目标资源的路径执行一个消息环回测试。

- [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)

PATCH 方法用于对资源应用部分修改。



- 在这其中，GET POST HEAD 是简单请求。
- 除了以下字段之外，没有自定义的 Request Header

- - Accept
  - Accept-Language

- - Content-Language
  - Content-Type

- - [DPR](https://link.segmentfault.com/?url=http%3A%2F%2Fhttpwg.org%2Fhttp-extensions%2Fclient-hints.html%23dpr)
  - [Downlink](https://link.segmentfault.com/?url=http%3A%2F%2Fhttpwg.org%2Fhttp-extensions%2Fclient-hints.html%23downlink)

- - [Save-Data](https://link.segmentfault.com/?url=http%3A%2F%2Fhttpwg.org%2Fhttp-extensions%2Fclient-hints.html%23save-data)
  - [Viewport-Width](https://link.segmentfault.com/?url=http%3A%2F%2Fhttpwg.org%2Fhttp-extensions%2Fclient-hints.html%23viewport-width)

- - [Width](https://link.segmentfault.com/?url=http%3A%2F%2Fhttpwg.org%2Fhttp-extensions%2Fclient-hints.html%23width)

- Content-Type的值只有以下三种(Content-Type一般是指在post请求中，get请求中设置没有实际意义)

- - text/plain
  - multipart/form-data

- - application/x-www-form-urlencoded

- 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器 (未验证)

- - XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问

- 请求中没有使用 ReadableStream 对象 (未验证)

##### 简单请求与非简单请求在设置跨域上的区别

- 针对简单请求，在进行 CORS 设置的时候只需要设置

```javascript
Access-Control-Allow-Origin:*
// 如果只是针对某一个请求源进行设置的话，可以设置为具体的值
Access-Control-Allow-Origin: 'http://www.yourwebsite.com'
```

- 针对复杂请求，需要去设置不同的响应头。这是因为在预检阶段进行请求的时候会携带相对对应的请求头信息。

```javascript
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-CUSTOMER-HEADER, Content-Type
```

- 相对应的请求头信息为：

```javascript
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
// 设置max age，浏览器端会进行缓存。没有过期之前真对同一个请求只会发送一次预检请求
Access-Control-Max-Age: 86400
```

### HTTPS

**HTTPS = HTTP + SSL/TLS  （相关问题，CA证书签发、中间人攻击等。）**

#### 对称加密：

- 对称加密，加密与解密用的都是同一把钥匙。对称加密所使用的密钥在内存上相对较小的，密钥的大小决定加密的强弱，相应的，内存占比较大的密钥所需要花费的解密的时间也就越长。故而在设计对成加密算法的时候，就需要按照场景，既要兼顾安全，也要兼顾效率。
- 对称加密有一个较大的缺点，那便是对于密钥的管理与分配。于之前所说，加密与解密用同一把钥匙，就很容易产生安全性问题，中间人可以伪造自身为 Server，劫持数据，于是为了更加安全，便有了 HTTPS，但是不管怎么说，没有最安全的，只有相对安全的。

- 对称加密图解：

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629515906093-49474ea3-456c-40a7-ad6c-3074dc80414a.png)



- 双方都将各自有一把钥匙，Client 用这把钥匙加密， Server 用这把钥匙解密。Client 通过某种对称加密算法加密密钥发送给 Server， Server 获取到密钥以及数据后，通过对算法的逆推，对数据进行解密，获取数据。
- 优缺点：简单快速，密钥越大，加密越强，解密越慢，容易被黑客数据劫持。

- 补充图片，加强理解。

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629519456795-3d49c677-7e23-48f9-8e8c-4aac4e11a047.png)





#### 非对称加密：

- 非对称加密，使用一对密钥，公钥和私钥。私钥只能由一方保管，不允许外泄，而公钥可以发给任何想要它的人。数据使用公钥加密，私钥解密。
- 图解

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629520872979-66abd2c4-f91f-45fc-b139-5c4cde3c708b.png)



- 如此一看，单独使用对称加密或是非对称加密都不是十分安全。PK 是所有人都有，SK 只有服务端有。
- 因此有了 非对称加密 + 对称加密。



#### 对称加密 + 非对称加密 通讯

- 目前较为常用的通讯方式。

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629533611546-0fd96026-7482-4131-acca-9e189f2a9d24.png)

- 相当于是首先进行非对称加密，通过非对称加密生成一个唯一值作为后继进行对称加密的 Key，这样可以更加的安全，因为这个 Key 只有Client  和 Server 能够知道。
- 但是即便这也是存在漏洞的，那便是如果一开始，Client 所请求的对象被定向到了黑客所指定的 Server，黑客可以模拟客户端向Server 申请 PK然后存在自身上，作为中间人劫取数据。

- 为了能够修改这一点使得连接更加安全，又在 对称加密 + 非对称加密 的基础上添加了一个 CA 认证。

####  对称加密 + 非对称加密 + CA 证书认证 + Hash 散列算法

- 为了防止中间人攻击，添加 CA 证书认证环节。

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629535996889-c1740213-f123-4635-b44f-593dbea0818e.png)



- 图中有提到“返回数据确认收到”，只是在宏观的一个概念，其中另藏玄机。即在 HTTPS 中最为重要的 SSL / TLS 协议
- 其实 TLS 就是标准化后的 SSL ，由 “安全套接字” 成为 “传输层安全协议”。对称加密的非对称传输方式。

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629537739002-7219da95-c108-489f-8987-61d1bc743748.png)







### Web 页面请求过程

#### 1、DHCP 配置主机信息 

- **具体过程：略 太长了，不可能背的下来的。**

#### 2、ARP 解析 MAC 地址

- **主机会通过浏览器，依据网站域名以及对应的 IP 地址，生成一个 TCP 套接字，向 HTTP 服务器发送 HTTP 请求。主机会生成一个 DNS 查询报文，该报文会具备 53 端口。**
- **该 DNS 查询报文会被存到目的地址为 对应 DNS 服务器的 IP 地址的数据报中。**

- **接着 这个 IP 数据报会被存到一个以太网帧，发送到网关路由器。**

#### 3、DNS 域名解析

- **知晓网关路由器的 MAC 地址之后， 继续进行 DNS 的解析过程。**
- **网关路由器接收到包含 DNS 查询报文的以太网帧之后，抽取该 IP 数据报，并根据转发表决定该 IP 数据报应该转发的路由。**

- **到达 DNS 服务器之后， DNS 服务器会抽出本地生成的 DNS 查询报文，根据 DNS 查询报文查询在 DNS 数据库中查找待解析的域名。**
- **查询到 DNS 记录之后，DNS 服务器发送 DNS 回答报文， 将该报文段存入 UDP 报文段，并将该 UDP 存入 IP 数据报，数据报通过路由反向转发回到网关路由器，并经过以太网交换机到达主机。**

#### 4、HTTP 请求

- **主机获取到返回的 IP 数据报，（****主机生成 TCP 套接字，用于向 Web 服务器发送 Get 请求报文。****） 主机与 HTTP 服务器向通过三次握手建立连接。生成一个具有端口号信息的 SYN 报文，并将该报文信息发送给HTTP服务器，服务器接收到该数据报文，生成 TCP SYN ACK 报文返回给主机。在建立连接之后，主机浏览器生成 Get 请求报文交付 HTTP 服务器。服务器从套接字报文读取 Get 报文，并生成 HTTP 响应报文， 将加载 Web 页面内容的资源存入响应报文主体返回主机。浏览器接收到 HTTP 响应报文，抽出报文主体中的网页内容，进行页面渲染，展示内容。**







## 传输层

- **传输层主要关系到了TCP、UDP。**
- **TCP 与 UDP 两者的区别在于，TCP 是面向连接、字节流的，头部字节需要20个字节，具有拥塞、流量控制，提供的是全双工协议，便与连接对象的关系为一对一，其特点个人认为就是稳定。而 UDP 则是无连接的，面向报文，头部字节仅需要8个字节，不具备拥塞控制，与连接对象的关系可以是 一对一 、 一对多、 多对一、 多对多，其主要的特点个人理解为就是传输数据，疯狂地尽力地传，在生活常见的用到 UDP 的就有直播。**



### TCP 三次握手、四次挥手

- **三次握手：客户端、服务器端的 PCB 进程块被唤醒，客户端生成 SYN 数据包发送给服务器，同时客户端还生成一个随机数 X 存入该数据包中，服务器根据收到的 SYN 数据包，生成 SYN-ACK 数据包返还给客户端，同时服务器生成一个随机数 Y 作为 SYN = Y，ACK确认序列号确认接收客户端数据，被赋值ACK = X + 1，两者均存入 SYN-ACK 数据包。客户端接收 SYN-ACK 数据包之后，生成 ACK 数据包发送给服务器，服务器解析 ACK 数据包， 确认数据传递成功，ACK = ACK + 1，连接建立。**

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628403246825-cec403b0-4fa6-40ec-9ee9-b1f4e9b6ab40.png)

- **三次握手的原理：****第三次握手是为了防止失效的连接请求到达服务器，让服务器错误打开连接。客户端发送的连接请求如果在网络中滞留，那么就会隔很长一段时间才能收到服务器端发回的连接确认。客户端等待一个超时重传时间之后，就会重新请求连接。但是这个滞留的连接请求最后还是会到达服务器，如果不进行三次握手，那么服务器就会打开两个连接。如果有第三次握手，客户端会忽略服务器之后发送的对滞留连接请求的连接确认，不进行第三次握手，因此就不会再次打开连接。**
- **四次挥手****：**![img](https://cdn.nlark.com/yuque/0/2021/jpeg/22079037/1628403589303-c8be03a1-655f-4340-8ced-1cf9ba2bb417.jpeg)

- **客户端发送 连接释放报文 FIN = 1，进入连接释放等待FIN-WAIT，服务器接收后发出 ACK 数据包，此时 TCP 会进入半关闭状态，仅支持服务器传输数据给客户端，当服务器传输完所需数据后，连接将不再需要，服务器会发送包含 FIN、ACK 的数据包给客户端，客户端接收确认数据，发送 ACK 数据包给服务器进行最后的连接释放确认，进入 TIME-WAIT 状态，并等待 2MSL（报文最大存活时间）以保证 ACK 数据包能够被服务器接收，且没有旧数据进入到新连接中。**



### TCP 的可靠传输：TCP通过超时重传来实现可靠连接，超时重传： 如果发出的报文段在一定时间内没有得到确认报文的回传，这个报文段将会得到重传。我们将发出报文到接收报文的这一段时间称为一个RTT。

### TCP 滑动窗口： 略。

### TCP 拥塞控制：避免网络环境拥堵。

#### ![img](https://cdn.nlark.com/yuque/0/2021/jpeg/22079037/1628404777924-201b00a0-7737-4c25-abc0-28ffe5b1324e.jpeg)

**TCP 通过拥塞控制、慢开始、快恢复、快重传这四种算法实现拥塞控制。**

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628405076951-825ce64a-0e96-42df-96b8-cfd73b73e1ca.png)

### TCP 流量控制：

- 通过改变 TCP 窗口，控制发送方发送数据速率，以方便接收方能够及时接收。



### SYN 泛洪攻击 (vlan洪水)

- 

## 网络层

- **通过 IP 协议，把异构的物理网络连接在一次。**
- **ARP 协议**



## 物理层

- **提供通信方式： 半双工传输、全双工传输、单工传输**



## HTTP 状态码

- 1**：请求收到，继续处理
- 2**：操作成功收到，分析、接受

- 3**：完成此请求必须进一步处理
- 4**：请求包含一个错误语法或不能完成

- 5**：服务器执行一个完全有效请求失败
- 再具体就如下：

- - 100——客户必须继续发出请求
  - 101——客户要求服务器根据请求转换HTTP协议版本

- - 200——交易成功
  - 201——提示知道新文件的URL

- - 202——接受和处理、但处理未完成
  - 203——返回信息不确定或不完整

- - 204——请求收到，但返回信息为空
  - 205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件

- - 206——服务器已经完成了部分用户的GET请求
  - 300——请求的资源可在多处得到

- - 301——删除请求数据
  - 302——在其他地址发现了请求数据

- - 303——建议客户访问其他URL或访问方式
  - 304——客户端已经执行了GET，但文件未变化

- - 305——请求的资源必须从服务器指定的地址得到
  - 306——前一版本HTTP中使用的代码，现行版本中不再使用

- - 307——申明请求的资源临时性删除
  - 400——错误请求，如语法错误

- - 401——请求授权失败
  - 402——保留有效ChargeTo头响应

- - 403——请求不允许
  - 404——没有发现文件、查询或URl

- - 405——用户在Request-Line字段定义的方法不允许
  - 406——根据用户发送的Accept拖，请求资源不可访问

- - 407——类似401，用户必须首先在代理服务器上得到授权
  - 408——客户端没有在用户指定的饿时间内完成请求

- - 409——对当前资源状态，请求不能完成
  - 410——服务器上不再有此资源且无进一步的参考地址

- - 411——服务器拒绝用户定义的Content-Length属性请求
  - 412——一个或多个请求头字段在当前请求中错误

- - 413——请求的资源大于服务器允许的大小
  - 414——请求的资源URL长于服务器允许的长度

- - 415——请求资源不支持请求项目格式
  - 416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段

- - 417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求
  - 500——服务器产生内部错误

- - 501——服务器不支持请求的函数
  - 502——服务器暂时不可用，有时是为了防止发生系统过载

- - 503——服务器过载或暂停维修
  - 504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长

- - 505——服务器不支持或拒绝支请求头中指定的HTTP版本



## 拓展

### BGP 协议

- 边界网关协议 BGP ，是一种实现自治系统 AS 之间的路由可达并选择最佳路由的距离矢量路由协议。
- BGP 是一种外部网关协议（EGP），与 OSPF 、 RIP 等内部网关协议（IGP）不同，着眼点不在于自动发现网络拓扑，而在于 AS 之间选择最佳路由和控制路由的传播。



#### BGP 协议的特性

- **BGP 是自治系统外部路由协议，用来自 AS 之间传递路由信息。**
- **路径矢量路由协议，从设计上避免了环路的发生。**其路由信息中携了所经过的全部 AS 路径列表。这样，接收该路由信息的 BGP 路由器可以明确的知道此路由信息是否源于自己的 AS。如果是源于自己的 AS， BGP 就会丢弃此路由，这样就根本的解决了 AS 之间产生环路的可能性。

- **使用 TCP 作为传输协议，端口号是 179 。** 天然的可靠传输机制、重传、排序等机制来保证 BGP 协议信息交换的可靠性。
- **支持 CIDR （无类域间路由）和路由聚合。** 可以将一些连续的子网聚合陈较大的子网（突破了自然分类的限制），从而可以在一定程度上控制路由表的快速增长，并降低了路由查询的复杂度。

- **路由附带丰富的属性。**
- **只发送增量路由更新，**BGP 只发送更新的路由信息，大大减少了 BGP 传播路由所占的带宽 **。** 

### 





# 操作系统

## 进程、线程

- **进程：进程是资源分配的最小单位。进程控制块（PCB）描述进程的基本信息和运行状态，所谓的创建进程以及撤销进程，都是针对PCB的操作。**
- **线程：是CPU调度的最小单位。一个进程中含有多个线程。**



## 进程间通信

- 待补充，暂时略



### 进程调度算法



#### 批处理系统

- **先来先服务 FCFS：** 非抢占式的调度算法，按照请求的顺序进行调度。**有利于长作业，但不利于短作业，因为短作业必须一直等待前面的长作业执行完毕才能执行，而长作业又需要执行很长时间，造成了短作业等待时间过长。**
- 短作业优先 SJF：非抢占式的调度算法，按估计运行时间最短的顺序进行调度。**长作业有可能会饿死，处于一直等待短作业执行完毕的状态。因为如果一直有短作业到来，那么长作业永远得不到调度。**

- **最短剩余时间优先 SRTN：**最短作业优先的抢占式版本，按剩余运行时间的顺序进行调度。**当一个新的作业到达时，其整个运行时间与当前进程的剩余时间作比较。如果新的进程需要的时间更少，则挂起当前进程，运行新的进程。否则新的进程等待。**



# Js Concept

## 数据结构

- **Js目前含有的数据结构：**

- - **基本数据类型：string number undefined null boolean Bigint Symbol**
  - **复杂： Object**



## 闭包 Closure

- **名词，简单来讲，就是在内层函数能够访问到外层函数的作用域，可以使变量长期保存在内存中，生命周期较长。**
- **可以在内部函数访问到外部函数作用域。使用闭包，一可以读取函数中的变量，二可以将函数中的变量存储在内存中，保护变量不被污染。而正因闭包会把函数中的变量值存储在内存中，会对内存有消耗，所以不能滥用闭包，否则会影响网页性能，造成内存泄漏。当不需要使用闭包时，要及时释放内存，可将内层函数对象的变量赋值为null。**

```javascript
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();
```

- **常用场景：典型应用是模块封装，在各个模块规范出现之前，都是用这样的方式防止变量污染全局。**

```javascript
var Yideng = (function () {
    // 这样声明为模块私有变量，外界无法直接访问
    var foo = 0;

    function Yideng() {}
    Yideng.prototype.bar = function bar() {
        return foo;
    };
    return Yideng;
}());
```



## Event Loop 宏任务/微任务

### Event Loop

- **Js 分为同步任务和异步任务，同步任务在主线程执行，形成一个执行栈。在主线程之外，事件触发线程 管理一个任务队列，只要异步任务出现运行结果，就会在任务队列中放置一个事件。**
- **当主线程中的同步任务都执行完之后，系统便会去读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行操作。Event Loop 通过任务队列的机制进行协调，一个 Event Loop 中可以有一个或者多个任务队列，而一个任务队列就是一个有序任务的集合。**

-  ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1627381665787-c0159c6c-d9b3-4b43-906c-1f2d267dd672.png)



**异步任务分为 宏任务 和 微任务**

### 宏任务

- **Macro Task 每次在执行栈中执行的代码就是一个宏任务。**
- **包含： Script（整体代码）、 Promiseset、setTimeout、setInterval、UI交互事件、setImmediate（Node.js）**



### 微任务 

- **Micro Task 当前任务执行结束后立即执行的任务。**
- **包含： Promise.then、process.nextTick（Node.js）**



### 执行顺序

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/22079037/1627381667412-a3c0b88f-6d55-4d29-a1a6-47f692f23e8a.jpeg)

### async await 

- **async 函数的函数体 可以被看作是由零个或多个 await表达式分割开来的。在该函数体中，从第一行代码开始，直到第一个 await 表达式，都是同步执行的。**
- **一个不含 await 表达式的 async 函数是同步运行的。** **await表达式会暂停整个async函数的执行进程并出让其控制权，只有当其等待的基于promise的异步操作被兑现或被拒绝之后才会恢复进程。**

- **关于Promise 与 async await ， await 挂起**

```javascript
async function foo() {
   await 1
}
//等价于
function foo() {
   return Promise.resolve(1).then(() => undefined)
}
```

- **await 表达式之后的代码可以被认为是存在在链式调用的 then 回调中，多个 await 表达式都将加入链式调用的 then 回调中，返回值将作为最后一个 then 回调的返回值。**



### 看输出

```typescript
//请写出输出内容
    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end');
    }
    async function async2() {
      console.log('async2');
    }

    console.log('script start');

    setTimeout(function() {
        console.log('setTimeout');
    }, 0)

    async1();

    new Promise(function(resolve) {
        console.log('promise1');
        resolve();
    }).then(function() {
        console.log('promise2');
    });
    console.log('script end');
/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

## Js 内置对象

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects



## 验证中文

```javascript
function isChinese(str) {
  const re = /^[\u4e00-\u9fa5]+$/;
  return re.test(str);
}
```

## Shadow DOM

- [神奇的 Shadow DOM](https://aotu.io/notes/2016/06/24/Shadow-DOM/index.html)
- [使用 shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)

- 简单来讲就是由 html 、css 和 js 封装的组件，不受外部影响。



## Call、apply、bind

- call、apply、bind 都是为了改变解决 this 的指向，具体区别只在于三者所针对的对象不同。
- call 接收是一个参数列表，apply 接收的是一个参数数组，bind 接收的是一个函数。

```javascript
// Call
Function.prototype.myCall = function(context = window) {
	context.fn = this
  var args = [...arguments].slice(1)
  var result = context.fn(...args)
  delete context.fn
  return result
}
// Apply
Function.prototype.myApply = function(context = window) {
	context.fn = this
  var result
  if(arguments[1]) {
  	result = context.fn(...arguments[1])
  } else {
  	result = context.fn()
  }
  delete context.fn
  return result
}
// Bind
Function.prototype.myBind = function(context = window) {
	if(typeof this !== 'function') throw new TypeError('ERROR')
  var _this = this
  var args = [...arguments].slice(1)
  return function f(){
  	if(this instanceof f){
    	return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```



## New 的实现原理

- new 的实现原理：创建一个新对象，将新对象的 __ *proto__* 指向构造函数的 prototype 对象，将构造函数的作用域赋值给新对象（也就是this 指向新对象），执行构造函数中的代码（为这个对象添加属性），然后返回新的对象。

```javascript
function _new(fn,...args) {
	const obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, args)
  return ret instanceof Object ? ret : obj
}
```

## <script>、<script defer>、<script async> 之间的区别

- <script> 在加载的时候是同步的，会阻塞后面代码的执行。
- <script defer> 异步加载，脚本的执行需等到所有文档加载完后再加载。

- <script async> 异步加载，脚本执行和后续文档代码同时进行。
- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629214534903-f8e42b75-1632-4b11-bcba-1aa6f4e99f6b.png)





## Object.defineProperty / defineProperties

- *Object.defineProperty*, 使我们可以给对象进行属性添加或是修改。而当通过 *defineProperty* 添加完属性之后，该 *Object* 的属性就会默认为 *not* *enumerable。 Object.key* 仅仅返回 *enumerable* 的属性。
- 用 defineProperty 方法添加的属性默认不可变。你可以通过 *writable*, *configurable* 和 *enumerable* 属性来改变这一行为。这样的话， 相比于自己添加的属性，*defineProperty* 方法添加的属性有了更多的控制权。

- defineProperty 是针对单个属性，而 defineProperties 是针对多个属性。

```typescript
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});

// defineProperty
var o = {}; // 创建一个新对象

Object.defineProperty(o, 'a', {
  value: 37,
  writable: false
});

console.log(o.a); // logs 37
o.a = 25; // No error thrown
// (it would throw in strict mode,
// even if the value had been the same)
console.log(o.a); // logs 37. The assignment didn't work.

// strict mode
(function() {
  'use strict';
  var o = {};
  Object.defineProperty(o, 'b', {
    value: 2,
    writable: false
  });
  o.b = 3; // throws TypeError: "b" is read-only
  return o.b; // returns 2 without the line above
}());
```

## Object.Entries / Object.formEntries

- Object.entries() 方法返回一个给定对象自身可枚举 kv 的数组
- Object.formEntries() 能够将一个二维数组转换为对象。

```typescript
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

## Json.stringify

```typescript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```

- *Json.stringify（value,replacer,[space]）*，参数后两者皆为可选值。第二个参数的 replacer 可以是个函数或是数组，用以控制哪些值如何被转换为字符串。
- 如果替代者(replacer)是个 *数组* ，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为"*level*" 和 "*health*" 的属性被包括进来， "*username*"则被排除在外。 data 就等于 "{"level":19, "health":90}".

- 而如果替代者(replacer)是个 *函数*，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（注：Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为 *undefined*，则该属性会被排除在外。



## JSON.parse()

- 使用 JSON.parse 能够将 JSON 字符串解析转化为 JavaScript 值。

```typescript
// 将数字字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:
const jsonNumber = JSON.stringify(4) // '4'
JSON.parse(jsonNumber) // 4

// 将数组值字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:
const jsonArray = JSON.stringify([1, 2, 3]) // '[1, 2, 3]'
JSON.parse(jsonArray) // [1, 2, 3]

// 将对象字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:
const jsonArray = JSON.stringify({ name: "Lydia" }) // '{"name":"Lydia"}'
JSON.parse(jsonArray) // { name: 'Lydia' }
```

## Reducer

- Reducer 函数接受四个参数 acc 、 cur 、 idx 、 src
- Reducer 函数还提供一个额外参数 initalValue 作为累加器的初始值。如果没有提供该参数，则将初始值默认为数组的第一个元素。	





## padStart

- 用于字符串，可以通过该方法为字符串开头添加填充, 接受长度参数，如果该参数大于传入字符长度，则会在前面添加填充，如果小雨传入字符长度，则不会进行填充。

```typescript
	const str1 = "Hello World"
  console.log(str1.padStart(str1.length + 1))
```



## 实现一个 sleep 函数

- 最好写一个异步的 sleep 函数，这样可以在任何 async function 暂停。如果是同步的话，极有可能出现卡死状态。

```typescript
function sleep(millionseconds: number) {
	return new Promise<void>(resolve => setTimeout(resolve,millionseconds))
}
void async function main() {
	await sleep(5000)
}
```



## 小驼峰命名

```typescript
//下划线转换驼峰
function toHump(name) {
	return name.replace(/\_(\w)/g, function(_all,letter) {
  	return letter.toUpperCase()
  })
}

// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}

// 测试
let a = 'a_b2_345_c2345';
console.log(toHump(a));
let b = 'aBdaNf';
console.log(toLine(b));
```

## Infinity 代表什么数据？

- 在 Js 中 Infinity 代表无穷大的数值，且不是常量，即无法明确表示它到底有多大。可以通过isFinite(val)判断当前数字是否是无穷大，函数返回true表示不是无穷大，返回false表示是无穷大。

# 

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

-  ![img](https://cdn.nlark.com/yuque/0/2021/gif/22079037/1627378137132-f719ad31-ca15-47d9-91d3-c9217b54d549.gif)
- **Meta Description Attribute：指的是搜索信息时下方出现的一串字段。**

- ![img](https://cdn.nlark.com/yuque/0/2021/gif/22079037/1627378137139-7b1ccfb4-e346-4ad3-b7e1-00e6792876cd.gif)
- **Meta Robots Attribute -index/noindex：告诉搜索引擎是否展示页面。 follow/nofollow：告诉搜索引擎如何处理页面中的链接，是否跟从链接。其相对应的类型有：name属性、 http-equiv、 charest、 itemprop。**

- - **如果定义了 name 属性，则 meta 提供的是文档级别的元数据，可以适用于整个页面。**
  - **如果定义了 http-equiv 属性，则 meta 元素为编译指令。常设置的值有 content-security-policy ，该值有助于防止 XSS 攻击、 content-type，以及X-ua-compatible。**

- - - **X-ua-compatible 是 IE8 提供的一种新的属性，仅向上兼容。**

- - **<meta http-equiv="X-UA-Compatible" content="IE=7">**  
  - **#以上代码告诉IE浏览器，无论是否用DTD声明文档标准，IE8/9都会以IE7引擎来渲染页面。** 

- -  **<meta http-equiv="X-UA-Compatible" content="IE=8">**  
  - **#以上代码告诉IE浏览器，IE8/9都会以IE8引擎来渲染页面。**  

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



## 事件流 

- 事件流按照次序分为 捕获阶段、目标阶段、冒泡阶段。如果事件绑定的时候禁止了冒泡，则事件流就会停留在目标阶段。
- 有关 DOM 事件流的两个概念

- - 事件冒泡：事件沿 DOM 树向上通知。
  - 事件捕获：和事件冒泡相反，事件沿着 DOM 树向下通知。



## 

# CSS

## 盒模型

- **W3C 标准盒模型 ： 盒子宽（高）度= width(height) + padding + border + margin**
- IE 怪异盒子模型：**盒子宽（高）度= width(height) + margin**

- **在设置样式时通过添加 box-sizing 属性定义引擎采用哪种计算方式。**

```css
box-sizing: content-box|border-box|inherit:
content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
inherit 指定 box-sizing 属性的值，应该从父元素继承
```



## 几种上下文

- **BFC：格式化上下文，是页面上的一个独立的渲染区域。**

- - **形成条件：**

- - - float 的值不是 none
    - position 的值不是 static 或者 relative

- - - display 的值是 inline-block, table-cell, flex, table-caption 或者 inline-flex
    - overflow 的值不是 visible

- **IFC：内联格式上下文。水平可以通过添加 text-align: center / display: inline-block生成。垂直可以通过vertical-align: middle**
- **GFC：网格布局上下文，display: grid**

- **FFC：自适应格式上下文， display: flex / inline-flex**

## CSS 选择器

- **包含：id选择器（#box）、类选择器（.box）、标签选择器（div）、后代选择器（#box div）、子选择器（.one>one_1）、相邻选择器（.one + .two）、伪类选择器、伪元素选择器、属性选择器。**
- **其中 子类选择器：选择父类元素为 .one 的所有 .one_1 的元素。  相邻选择器：选择紧接在 .one 之后的所有 .two 元素**



## CSS 优先级



内联 > ID 选择器 > 类选择器 > 标签选择器



## 继承属性

- **继承属性可分为字体系列属性、文本系列属性、元素可见性(visibility)、表格布局属性。**



## CSS 新特性

### Transition 过渡

### animation 动画

### shadow 阴影

### transform 转换



## CSS Position

- **Static ： 默认值、表示无定位。**
- **absolute：** **表示采用绝对定位方式，相对于position值不是static的父容器进行定位，该值会使元素脱离文档流，使用该值后可以用**`**left，right，top，bottom**`**对元素进行移动定位。设置后脱离文档流。**

- **relative：** **表示采用相对定位的方式，相对于元素原本的位置进行定位，该值****不会****使元素脱离文档流，使用该值后可以用**`**left，right，top，bottom**`**对元素进行移动定位。**
- **fixed：** **表示采用固定定位的方式，相对于浏览器窗口进行定位，并且无论滚动条怎么滚动，使用了该值的元素都始终处于固定位置，该值会使元素脱离文档流，使用该值后可以用**`**left，right，top，bottom**`**对元素进行移动定位。设置后脱离文档流**

- **sticky：常用于scroll事件中，在 viewport 时该元素的位置不受定位影响，而当该元素的位置要离开 viewport 时，定位会变成 fixed。该元素不脱离文档流。**
- **float：浮动，设置后脱离文档流。**



## 常规水平居中、水平垂直居中

### 水平居中：

```css
    /* 水平居中有几种	方法分别可以是 
        1、块级元素中，在子级直接设置margin: 0 auto;
        2、在行内元素中，可以直接设置text-align:center；
        3、 在块级元素中，当子级中有float设置了属性，则需要在父级中设置width:fit-content，以及设置margin: 0 auto;
        4、在块级元素中，可以使用flex盒子。在2012版本的flex盒子，可以设置父级为display:flex,justify-content:center;
        5、采用绝对定位联合transform,在子级中设置position:absolute,设置left为50%，transform:translate(-50%,0);
        6、采用负margin方法，在子级中设置position:absolute,设置left:50%，宽度width:X 然后margin-left:- 1/2 X;
        7、在子级中将left、right都设置为0，并且设置position:absolute;margin:0 auto;
     */
```

### 水平垂直居中：

```css
  /* 水平垂直居中的方法
        1、行内元素，在父级设置height,在子级设置line-height，在此处两者需要设置相同的值。
        2、table，在父级设置display:table，在子级设置display:table-cell;vertical-align:middle;
        3、使用flex布局。在父级中设置display:flex,align-items:center;
        4、使用绝对定位，在子级中设置position:absolute,然后设置top:50% left:50%;transform:translate(-50%,-50%);
        5、使用绝对定位，在子级中设置position:absolute,然后设置top:50%,left:50%;width:x,height:y,margin-top: - 1/2 X;margin-left : - 1/2 y;
        6、使用绝对定位，在子级中设置left、right、top、bottom都为0，然后设置margin:auto 0;
     */
```

## Flex 布局

- **包含：flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content、flex-grow、 flex-shrink 、flex-basis。**
- **flex-direction: row/ row-reverse / column / column-reverse**

- **flex-wrap: nowrap / wrap / wrap-reverse**
- **justify-content: flex-start / flex-end / center / space-between / space-around**

## Grid 布局

- **包含：**



## 关于Span标签的padding、margin的设置

- **span是一种内联样式，初始默认的 display 属性是 inline，是不允许设置宽高的。如果想要设置宽高，需要将其转换成块级元素 - display: block**  





## 圣杯布局 && 双飞翼布局

- **作用：圣杯布局和双飞翼布局解决的问题是一样的，就是两边顶宽，中间自适应的三栏布局，中间栏是要在放在文档流前面以优先渲染。**
- **区别：圣杯布局，为了中间 div 内容不被遮挡，将中间的 div 设置了左右 padding-left 和 padding-right 后，将左右两个 div 用相对布局 position: relative 并分别配合 right 和 left 属性， 以便左右两栏 div 移动后不遮挡中间 div 。双飞翼布局，为了中间 div 内容不被遮挡，直接在中间 div 内部 创建子 div 用于放置内容， 在该子 div 里用 margin-left 和 margin-right 为左右两栏 div 留出位置。**

- **圣杯布局** 

```javascript
<body>
<div id="hd">header</div>
<div id="bd">
  <div id="middle">middle</div>
  <div id="left">left</div>
  <div id="right">right</div>
</div>
<div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#bd{
    /*左右栏通过添加负的margin放到正确的位置了，此段代码是为了摆正中间栏的位置*/
    padding:0 200px 0 180px;
    height:100px;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
    /*中间栏的位置摆正之后，左栏的位置也相应右移，通过相对定位的left恢复到正确位置*/
    position:relative;
    left:-180px;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
    /*中间栏的位置摆正之后，右栏的位置也相应左移，通过相对定位的right恢复到正确位置*/
    position:relative;
    right:-200px;
}
#footer{
    height:50px;
    background: #666;
    text-align: center;
}
</style>
```

- **双飞翼布局** 

```javascript
<body>
<div id="hd">header</div> 
  <div id="middle">
    <div id="inside">middle</div>
  </div>
  <div id="left">left</div>
  <div id="right">right</div>
  <div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/     
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
}

/*给内部div添加margin，把内容放到中间栏，其实整个背景还是100%*/ 
#inside{
    margin:0 200px 0 180px;
    height:100px;
}
#footer{  
   clear:both; /*记得清楚浮动*/  
   height:50px;     
   background: #666;    
   text-align: center; 
} 
</style>
```



## 隐藏元素

占位：

- `visibility: hidden;`
- `margin-left: -100%;`

- `opacity: 0;`
- `transform: scale(0);`

不占位:

- `display: none;`
- `width: 0; height: 0; overflow: hidden;`

仅对块内元素：

- `text-indent: -9999px;`
- `font-size: 0;`



## 清除 float 的方式以及其优点

- 问题出现的原因：父元素只包含浮动元素，在没有设置高度属性或者auto的前提下，它的高度会塌陷会零，因为子元素设置了 float 属性，而 float 属性会把元素从标准文档流中抽离，直接结果就是外部盒子丢掉两个孩子，因为内部没有其他盒子了，所以外部盒子只包裹文本节点内容，却把两个内部盒子扔在外面了。
- 解决方案：

- - 把外部盒子也从标准文档流中抽离，让它和孩子们见面。缺点：可读性差，不易于维护（别人很难理解为什么要给父元素也添上float），而且可能需要调整整个页面布局。
  - 在外部盒子的最下方添置一个带有 clear 属性的空盒子。 缺点：冗余代码。

- - 用 overflow: hidden 清除浮动。 给外部盒子添加该属性。 缺点： 可能造成溢出元素不可见。
  - 用伪元素 after 清除浮动。给外部盒子的 after 伪元素设置 clear 属性，再隐藏它。这其实是对空盒子方案的改进，一种纯CSS的解决方案，不用引入冗余元素。 

```css
clearfix {*zoom: 1;}
.clearfix:before,.clearfix:after {display: table;line-height: 0;content: "";}
.clearfix:after {clear: both;}
```



## CSS 三角形

- 原理：高宽设置为 0 ， 四个边框设置 border-width ,border-style ,border-color 即可，如果某个三角要变为透明，设置 border-color: transparent 。

```css
<div class='rect'></div>
<style>
    .rect {
      width: 0;
      height: 0;
      background-color: #fff;
      border-right: 100px solid rgb(34, 230, 220);
      border-left: 100px solid rgb(202, 146, 25);
      border-top: 100px solid rgb(29, 156, 194);
      border-bottom: 100px solid rgb(16, 204, 101);
    }
  </style>
// 创建一个 div ，宽高都为0，实现效果如下，发现border的四个边都是一个三角形，
```

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629018907189-79ef6322-da0a-4b29-bc75-059a11a689e8.png)

```css
// 要实现三角形只需将其中几个边background设置为transparent，即可得到三角形。
 <style>
    .rect {
      width: 0;
      height: 0;
      background-color: #fff;
      border-right: 100px solid transparent;
      border-left: 100px solid transparent;
      border-top: 100px solid rgb(29, 156, 194);
      border-bottom: 100px solid transparent;
    }
  </style>
```

- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629018944591-41d97af7-3364-4aed-8c0a-e0fadc1ff1ce.png)

## px rem em vw vh

- px: 绝对固定的值，无论页面放大或者缩小都不会改变。
- em: 可从父级继承，相对父亲标签字体大小的倍数。如果当前元素的字体为 `12px`，那么子元素 `1em` 就是 12`px`。由于是相对父级的倍数，所以多层嵌套时，倍数关系的计算会很头痛。

- rem: 相对根元素字体大小的倍数。相对于 `html` 的字体大小，如果不做任何修改，浏览器默认字体大小为 `16px`。
- vw : 1vw 等于视口宽度的1%

- vh : 1vh 等于视口高度的1%
- vmin : 选取 vw 和 vh 中最小的那个

- vmax : 选取 vw 和 vh 中最大的那个



## 什么是 FOUC ， 如何避免 FOUC ?

- FOUC, 即是 Flash of Unstyled Content，是指页面一开始以样式 A （或无样式）的渲染，突然变成样式 B。
- 原因是样式表的晚于 HTML 加载导致页面重新绘制。即通过 @import 方式导入样式表 、style 标签在 body 里。

- 解决方法： 把 link 放在 head 中。



## CSS Sprites 的原理和优缺点 *

- 原理：多张图片合成成一张单独的图片。可以减少网站的 HTTP 请求数。该图片使用 CSS background 和 background-position 属性渲染，这也就意味着标签变得更加复杂了，图片是在 CSS 中定义，而非 img 标签。
- 优点：hover效果，如果是多个图片，网络正常的情况下首次会闪烁一下。如果是断网情况下，就没图片了。sprites 就很好的解决了这个问题（第一次就加载好了）。合并了请求数，制作帧动画方便。

- 缺点：位置不好控制，有时候容易露底。。比如说30*30的按钮，图片只有12*12保不齐就漏出其他图片了。合成时候比较费时（有工具代替）。位置计算费时（有工具代替）。更新一部分的时候，需要重新加载整个图片，缓存失效。

## CSS 可置换元素与不可置换元素

- CSS 可置换元素，一般自带有固有的宽高。其展现效果不由 CSS 控制。对于其外观的渲染是独立于 CSS 的。简单来讲，对于该元素的内容，并不会收到当前文档样式影响。对于 CSS 可置换元素，需要留意的是对于其可能也是行内元素或是块级元素的可能性。
- 行内元素是无法改变宽高的，而 img 作为一种行内元素却可以修改其宽高，就是因为 img 是一种可置换元素。

- 典型的可替换元素：iframe vedio embed img 。

## Chrome 支持 12 px 以下的文字元素

- 使用 transform: sacle() 。但其中，transform 对行内元素无效，需要添加 display: block / inline-block ，到这里还没完，在设置完属性对元素进行了缩放，原本元素还是会占据对应位置，需要在外部再添加一层 div 。
- 使用图片。



## 浏览器是怎么判断元素是否和某个 CSS 选择器匹配 ？

- 先产生一个元素集合，然后从后往前判断。
- e.g：

- - 有选择器 div.ready #wrapper > .bg-red 
  - 先把所有元素 class 中有 bg-red 的元素拿出来组成一个集合，然后上一层，对每一个集合中的元素，如果元素的 parent id 不为 #wrapper 则把元素从集合中删去。再向上，从这个元素的父元素开始向上找，没有找到一个 tagName 为 div 且 class 中有 ready 的元素，就把原来的元素从集合中删去。

- - ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629217519989-917465cb-ad61-4fe6-94f8-d699cbf62e32.png)

- **P.s：为什么从后往前匹配是因为效率和文档流的解析方向。效率不必说，找元素的父亲和之前的兄弟比遍历所有儿子快并且方便。****关于文档流的解析方向，是因为现在的**` **CSS**`**，一个元素只要确定了这个元素在文档流之前出现过的所有元素，就能确定他的匹配情况；应用在即使** `**html**` **没有载入完成，浏览器也能根据已经载入的这一部分信息完全确定出现过的元素的属性。**
- **P.s：** **为什么是用集合主要也还是效率。基于**` **CSS Rule**` **数量远远小于元素数量的假设和索引的运用，遍历每一条** `**CSS Rule**` **通过集合筛选，比遍历每一个元素再遍历每一条** `**Rule**` **匹配要快得多。**





## Span 与 Span 之间的幽灵空格

# React

## React Class Component

### LifeCycle 

- **The Version 16.4**![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628778306953-36592f13-80a7-4083-a266-914d3ad755ac.png)
- **The Version 16.3** ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628778592898-948a91ec-c9b3-4c9a-96c8-9a4f3b73d542.png)

- **componentWillMount, componentWillReceiveProps, componentWillUpdate were abandoned，and will'be deleted in V.17**



### React 16 架构

- **Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler**
- **Reconciler（协调器）—— 负责找出变化的组件**

- **Renderer（渲染器）—— 负责将变化的组件渲染到页面上**



#### Fiber 架构的心智模型



## React Hooks

- **Function Component 不存在生命周期概念，但可以模拟生命周期行为。**

```javascript
// ComponentDidMount
class Example extends React.Component {
  componentDidMount() {
    console.log('I am mounted!');
  }
  render() {
    return null;
  }
}

===>
function Example(){
	useEffect(() => console.log('mounted'),[])
  return null
}
// useEffect的第一个参数作为回调函数会在浏览器布局和绘制完成后调用。
// shouldComponentUpdate
shouldComponentUpdate(nextProps, nextState){
  console.log('shouldComponentUpdate')
  // return true 更新组件
  // return false 则不更新组件
}

===>
const MyComponent = React.memo(
    _MyComponent, 
    (prevProps, nextProps) => nextProps.count !== prevProps.count
)
// React.memo 包裹一个组件来对它的 props 进行浅比较,但这不是一个 hooks，
因为它的写法和 hooks 不同,其实React.memo 等效于 PureComponent，但它只比较 props。

// ComponentDidUpdate
componentDidUpdate() {
  console.log('mounted or updated');
}

===>
const mounted = useRef();
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
   console.log('I am didUpdate')
  }
});
// useRef 在组件中创建“实例变量”。它作为一个标志来指示组件是否处于挂载或更新阶段。
当组件更新完成后在会执行 else 里面的内容，以此来单独模拟 componentDidUpdate。

// ComponentWillUnmount
componentWillUnmount() {
  console.log('will unmount');
}
===>
useEffect(() => {
  return () => {
    console.log('will unmount');
  }
}, []);
```



# 前端手写题



## Instanceof  原型链判断

- **判断一个实例是否是其父类或者祖先类型的实例。Instanceof 会在查找过程中遍历左边变量的原型链，直到找到 origin 的 prototype 为止，找不到就返回false。**

```javascript
let myInstanceOf = (target, orgin) => {
	while(target){
  	if(target.__proto__ == origin.prototype){
    	return true
    }
    target = target.__proto__
  }
  return target
} 
```

## 数组扁平化

- **多维数组转化为一维数组。**

```javascript
// concat 
function flatten(arr){
	var res = []
  for(let i = 0;i < arr.lengthl; i ++){
    if(Array.isArray(res[i]){
  		res = res.concat(flatten(arr[i]))
  	}else{
    	res.push(arr[i])
    }
  }
	return res
}
```



## Promise

- **根据 Promise A+ 规范提出，Promise 共含有三种状态： PENDING、FULFILLED、 REJECTED**



```javascript
// ES5 Promise

const STATUS = {
	PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
}

class myPromise {
  // receive a cb
	constructor(excutor){
  	this._status = STATUS.PENDING
    this._value = undefined
    this._resolveQueue = []
    this._rejectedQueue = []
  }
  
  const resolve = value => {
  	const run = () => {
    	if(this._STATUS = STATUS.PENDING) {
      	this._status = STATUS.FULFILLED
        this._value = value
      }
      
      //resolve cb
      while(this._resolveQueue.length) {
      	const cb = this._resolveQueue.shift()
        cb(value)
      }
    }
  }
  
  const reject = value => {
  	const run = () => {
    	if(this._STATUS = STATUS.PENDING){
      	this._status = STATUS.REJECTED
        this._value = value
      }
    }
    
    //resolve cb
    while(this._rejectedQueue.length) {
    	const cb = this._rejectedQueue.shift()
      cb(value)
    }
  }
}

// Promise.then
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) {}
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {}

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          x.then(resolve, reject)
        }
        resolve(x) // 否则，以它的返回值做为promise2的结果
      } catch (e) {
        reject(e) // 如果出错，以捕获到的错误做为promise2的结果
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}


//Promise.all  数组，其中只要有一项失败返回rejected，那么这个Promise就会立即停止，返回一个reject
Promise.prototype.all = function(promises) {
	return new Promise(function(resolve, reject) {
  	if(!isArray(promises)) {
    	return reject(new TypeError('arguments must be an array'))
    }
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues =  new Array(promiseNum)
    (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}
```



## 节流 

- **原理：在事件被触发 n 秒之后再执行回调，如果在 n 秒之内又被触发，则重新进行计时。**
- **适用场景：按钮提交、搜索框联想**

```javascript
// 简易版
function debounce(func, wait) {
	let timeout
  return function() {
  	const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function() {
    	func.apply(context, args)
    }, wait)
  }
}
// 立即执行函数 即定义之后立即触发，n 秒之后再次触发。
function debounce(func, wait, immediate) {
	let timeout
  return function () {
  	const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
    	const callNow = !timeout
      timeout = setTimeout(function () {
      	timeout = null
      },wait)
      if (callNow) func.apply(context, args)
    } else {
    	timeout = setTimeout(function () {
      	func.apply(context, args)
      }, wait)
    }
  }
}
```

## 防抖

- **原理：规定一个在单位时间内，只能触发一次函数。如果在这个单位时间里，这个函数被多次触发，只有一次生效。**
- 适用场景：拖拽场景、缩放场景。

```javascript
// 使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，
// 如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

function throttle(func, wait) {
	let context, args
  let previous = 0
  
  return function() {
  	let now = +new Date()
    context = this
    args = arguments
    if(now - previous > wait) {
    	func.apply(context, args)
      previous = now
    }
  }
}

// 使用定时器实现 当出发事件时，设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，知道定时器执行，然后执行函数，清空定时器。
function throttle(func, wait) {
	let timeout
  return function() {
  	const context = this
    const args = arguments
    if(!timeout) {
    	timeout = setTimeout(function () {
      	timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}
```

# 

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





# 浏览器缓存

- **浏览器每次发起请求时，会现在本地缓存中查找结果以及缓存标识，根据缓存标识来判断是否使用本地缓存。如果缓存有效，则会使用本地缓存。否则，则会向服务器发起请求并携带缓存标识。根据是否需要向服务器发送 HTTP 请求，将缓存过程分为以下两个部分：强缓存、协商缓存。**
- **强缓存：服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接使用本地缓存，如果不在时间内，则使用协商缓存。**

- **协商缓存：让客户端与服务器之间能实现缓存文件是否更新的验证、提升缓存的复用率，将缓存信息中的 Etag 和 Last-Modified 通过请求发送给服务器，并由服务器进行校验，返回 304 状态码时，浏览器直接使用缓存。**



**HTTP缓存都是从第二个请求开始的：**

- **第一次请求资源时，服务器返回资源，并在 Response Header 中回传资源的缓存策略。**
- **第二次请求时，浏览器判断这些参数，命中缓存就直接返回 200 ，否则就把请求参数加到 Request Header 头传给服务器，看是否命中协商缓存， 命中则返回 304 ，否则服务器就会返回新的资源。**

- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628926213674-78983f01-9803-4a8d-a027-a3d833fded72.png)



## 强缓存

- **强缓存命中则直接读取浏览器本地的资源，在 network 中显示的是 from memory 或 from disk**
- **控制强制缓存的字段有：Cache-Control（HTTP 1.0）、 Expires （HTTP 1.1）。**

- **Cache-Control 是一个相对时间，用以表达自上次请求正确的资源之后的多少秒的时间段内缓存有效。**
- **Expires 是一个绝对时间。用以表达在这个时间点之前发起的请求可以直接从浏览器中读取数据，而无需发起请求。**

- **论优先级，Cache-Control 要高于 Expires。 前者的出现是为了解决 Expires 在的浏览器时间被手动更改导致缓存判断错误的问题。**



### Cache-Control

- **常用值**

- - `**max-age**`**：即最大有效时间。**
  - `**must-revalidate**`**：如果超过了** `**max-age**` **的时间，浏览器必须向服务器发送请求，验证资源是否还有效。**

- - `**no-cache**`**：不使用强缓存，需要与服务器验证缓存是否新鲜。**
  - `**no-store**`**: 真正意义上的“不要缓存”。所有内容都不走缓存，包括强制和对比。**

- - `**public**`**：所有的内容都可以被缓存 (包括客户端和代理服务器， 如 CDN)**
  - `**private**`**：所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值。**

- **该字段可以在请求头或相应头设置，可以组合多种指令：**

- - **可缓存性：**

- - - **public: 浏览器和缓存服务器都可以缓存这个页面信息。**
    - **private: 代理服务器不可缓存，只能被单个用户缓存。**

- - - **no-cache: 浏览器和服务器都不应该缓存页面信息，但仍可缓存，只是在缓存前需要向服务器确认资源是否被更改。**
    - **only-if-cache: 客户端只接受已缓存的响应。**

- - **到期：**

- - - **max-age=：缓存存储的最大周期，超过这个周期被认为过期。**
    - **s-maxage=：设置共享缓存，比如can。会覆盖max-age和expires。**

- - - **max-stale[=]：客户端愿意接收一个已经过期的资源**
    - **min-fresh=：客户端希望在指定的时间内获取最新的响应**

- - - **stale-while-revalidate=：客户端愿意接收陈旧的响应，并且在后台一部检查新的响应。时间代表客户端愿意接收陈旧响应**
      **的时间长度。**
    - **stale-if-error=：如新的检测失败，客户端则愿意接收陈旧的响应，时间代表等待时间。**

- **重新验证和重新加载**

- - **must-revalidate：如页面过期，则去服务器进行获取。**
  - **proxy-revalidate：用于共享缓存。**

- - **immutable：响应正文不随时间改变。**

- **其他**

- - **no-store：绝对禁止缓存**
  - **no-transform：不得对资源进行转换和转变。例如，不得对图像格式进行转换。**

**优势：解决了 Expires 服务器和客户端相对时间的问题。**



## 协商缓存

- **协商缓存的状态码由服务器策略返回 200 or 304。**
- **当浏览器的强缓存失效的时候或者请求头中设置了不进行强缓存，并且在请求头中设置了 If-Modified-Since 或者 If-None-Match 的时候，就会将这两个属性值发送到服务器验证是否命中协商缓存。若命中，则会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或则 Etag 。**

- **对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此在响应体体积上的节省是它的优化点。**
- **协商缓存有 2 组字段，控制协商缓存的字段有：Last-Modified/If-Modified-since（http1.0）和 Etag/If-None-match（http1.1）**

- **Last-Modified/If-Modified-since 表示的是服务器的资源最后一次修改的时间；****Etag/If-None-match 表示的是服务器资源的唯一标识。**



### Last-Modified / If-Modified-Since

- **服务器通过 Last-Modified 字段告知客户端，资源最后一次被修改的时间。浏览器将这个值和内容一起记录在缓存数据库中。下一次请求相同资源的同时，浏览器从自己的缓存中找出 “不确定是否过期” 的缓存，因此在请求头中将上次的 Last-Modified 的值写入到请求头的 If-Modified-Since 字段。服务器会将 If-Modified-Since 的值与 Last-Modified 字段进行比较。如果相等，则表示未进行修改，响应 304，反之则表示修改了，相应 200，并返回数据。**





### Etag / If-None-Match

- `**Etag**` **存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的** `**Etag**` **字段。之后的流程和** `**Last-Modified**` **一致，只是** `**Last-Modified**` **字段和它所表示的更新时间改变成了** `**Etag**` **字段和它所表示的文件 hash，把** `**If-Modified-Since**` **变成了** `**If-None-Match**`**。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。**
- **浏览器在发起请求时，服务器返回在 Response header 中返回请求资源的唯一标识。在下一次请求时，会将上一次返回的Etag值赋值给If-No-Matched并添加在 Request Header 中。服务器将浏览器传来的if-no-matched跟自己的本地的资源的ETag做对比，如果匹配，则返回304通知浏览器读取本地缓存，否则返回200和更新后的资源。**

- **Etag 的优先级高于 Last-Modified**。
- **优势特点**

- - **1、可以更加精确的判断资源是否被修改，可以识别一秒内多次修改的情况。**
  - **2、不存在版本问题，每次请求都回去服务器进行校验。**

- **劣势特点**

- - **1、计算 ETag 值需要性能损耗。**
  - **2、分布式服务器存储的情况下，计算ETag的算法如果不一样，会导致浏览器从一台服务器上获得页面内容后到另外一台服务器上进行验证时现 ETag 不匹配的情况。**











# 前端安全

## 跨站脚本攻击 XSS

**就是攻击者想尽一切办法将可以执行的代码注入到网页中。**

- **存储型（ Server 端）**

- - **场景：见于带有用户保存数据的网站功能，如 论坛发帖、 商品评论、 用户私信等。**
  - **攻击步骤：攻击者将恶意代码提交到目标网站的数据库中。用户打开目标网站时，服务端将恶意代码从数据库中提取出来，拼接在 HTML 中返回给浏览器。用户浏览器在收到响应后解析执行，混在其中的恶意代码也被同时执行。恶意代码窃取用户数据，并发送到指定攻击者的网站，或者冒充用户行为，调用目标网站的接口，执行恶意操作。**

- **反射型（ Server 端）**

- - **与存储型的区别在于，存储型的恶意代码存储在数据库中，反射型的恶意代码存在 URL 上。**
  - **场景：通过 URL 传递参数的功能，如网站搜索、跳转等。**

- - 攻击步骤： 攻击者构造出特殊的 URL ，其中包含恶意代码。用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。用户浏览器接收到响应之后解析执行，混在其中的恶意代码也被执行。恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

- DOM型 （浏览器）

- - DOM 型的 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于 JavaScript 自身的安全漏洞。
  - 场景： 通过 URL 传递参数的功能，如网站搜索、跳转等。

- - 攻击步骤：攻击者构造出特殊的 URL，其中包含恶意代码。用户打开带有恶意代码的 URL ，用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定操作。



## XSS 预防 （防止攻击者提交恶意代码，防止浏览器执行恶意代码）

- **对数据进行严格的输出编码：如 HTML 元素的编码，Js 编码等。**

- - **避免拼接 HTML。 React 避免使用 dangerouslySetInnerHTML**

- **CSP HTTP Header, 即 Content-Security-Policy、X-XSS-Protection**

- - **增加攻击难度，配置 CSP （本质是建立白名单，由浏览器进行拦截）**
  - Content-Security-Policy: default-src 'self' -所有内容均来自一个站点的同一个源。

- - Content-Security-Policy: default-src 'self' *.trusted.com -允许内容来自信任的域名以及其子域名。
  - Content-Security-Policy: default-src https://yideng.com - 该服务器仅允许通过 HTTPS 的方式并仅从 yideng.com 域名来访问文档。

- **输入验证：****比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断。**
- **开启浏览器XSS防御：Http Only cookie，禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。**



## CSRF 跨站请求伪造

**攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户被攻击的网站执行某项操作的目的。**



- **攻击流程举例：受害者登录 a.com, 并保留登陆凭证（Cookie）。攻击者引诱受害者访问了 b.com。b.com 向 a.com 发送了一个请求： a.com/act=xx 浏览器会默认携带 a.com 的 Cookie 。 a.com 接受到请求之后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发出的请求。a.com 以受害者的名义执行了 act=xx 。攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。**
- **攻击类型：**

- - **GET 型：如在页面的某个 img 中发起一个 get 请求。**
  - **POST 型： 通过自动提交表单到恶意网站上。**

- - **链接型： 需要诱导用户点击链接。** 



## CSRF 预防方案

**CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提高安全性。**

- **同源检测： 通过 Header 中的 Origin Header、 Referer Header 确定，但不同浏览器可能会有不一样的实现，不能完全保证。**
- **CSRF Token 校验：将 CSRF Token 输出到页面中（通常保存在 Session 中），页面提交的请求会携带这个 Token ，服务器验证 Token 。**

- **双重 Cookie 验证：**

- - **流程：**

- - - **步骤1: 用户访问网站页面时，向请求域名注入一个 Cookie ，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）。**
    - **步骤2: 在前端向后端发送请求时，取出 Cookie ，并添加到 URL  的参数中 （接上例POST** https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）**）**

- - - **步骤3: 后端接口验证 Cookie 中的字段与 URL 参数属否一致，不一致则拒绝。**

- - **优点：**

- - - **无需使用 Session ，适用面更广，易于实施。**
    - **Token 存储在客户端中，不会给服务器带来压力。**

- - - **相对于 Token ，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。**

- - **缺点：**

- - - Cookie 中添加了额外的字段。
    - 如果有其他漏洞（例如 XSS），攻击者可以注入 Cookie，那么该防御方式失效。

- - - 难以做到子域名的隔离。
    - 为了确保 Cookie 的传输安全，采用这种防御方式的最好确保用整站 HTTPS 的方式，如果还没切 HTTPS 的使用这种方式也会有风险。

- Samsite Cookie 属性： Google 起草了一份草案来改进 HTTP 协议，那就是为 Set-Cookie 响应头新增 Samsite 属性，它用来标明这个 Cookie 是个 ‘ 同站 Cookie ’ ，同站 Cookie 只能作为第一方 Cookie ，不能作为第三方 Cookie ， Samsite 有两个属性值， Strict 为任何情况下都不可以作为第三方 Cookie， Lax 为第三方 Cookie，但必须是 GET 请求。



## Iframe 安全

说明：

- 嵌入第三方 Iframe 会有很多不可控的问题，同时第三方 Iframe 出现问题或是被劫持之后，也会诱发安全问题。
- 点击劫持

- - 攻击者将目标网站通过 Iframe 前套的方式嵌入到自己的网页上，并将 Iframe 设置为透明，诱导用户点击。

- 禁止自己的 Iframe 中的链接外部网站的 Js 。



## Iframe 预防方案

- 为 Iframe 设置 sandbox 属性，通过它可以对 Iframe 的行为进行各种限制，充分实现 “最小权限” 原则。
- 服务端设置 X-Frame-Options Header 头，拒绝页面被嵌套，X-Frame-Options 是 HTTP 响应头中用来告诉浏览器一个页面是否可以潜入 <iframe> 中

- - eg. X-Frame-Options: SAMEORIGIN
  - SAMEORIGIN：iframe 页面的地址只能为同源域名下的页面。

- - ALLOW-FROM：可以嵌套在指定来源的 iframe 里。
  - DENY： 当前页面不能嵌套在 iframe 里。

- 设置 CSP 即 Content-Security-Policy 请求头。
- 少用 Iframe



## HTTPS

描述：黑客可以利用 SSL Stripping 这种攻击手段，强制让 HTTPS 降级为 HTTP，从而进行中间人攻击。

预防方案：使用 HSTS（HTTP Strict Transport Security），它通过下面这个 HTTP Header 以及一个预加载的清单，来告知浏览器和网站进行通信的时候强制性的使用 HTTPS ，而不是通过明文的 HTTP 进行通行。这里的 “强制性” 表现为浏览器无论在任何情况下都直接向服务器端发起 HTTPS 请求，而不再像以往那样从 HTTP 跳转到 HTTPS。 另外，当遇到证书或者链接不安全的时候，则首先告警用户，并且不再用户选择是否继续进行不安全的通信。



## 静态资源验证完整性

描述：使用 内容分发网络（CDNs）在多个站点之间共享脚本和样式等文件可以提高站点性能并节省带宽。然而，使用 CDN 也存在风险，如果攻击者获得对 CDN 的控制权，则可以将任意恶意内容注入到 CDN 上的文件中，或者替换。因此可能潜在地攻击所有该 CDN 获取文件的站点。 

预防：将使用 Base 64 编码过后的文件哈希值写入所引用的 <script> 或标签 integrity 属性值中即可启用子资源完整性能。



## 中间人攻击

中间人攻击（Man-in-the-middle attack, MITM），指攻击者与通讯的两端分别创建独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上，整个对话都被攻击者进行了窃听、篡改甚至完全控制。没有进行严格的证书校验是中间人攻击的着手点。目前大多数加密协议都提供了一些较为特殊的认证方法以阻止中间人攻击，如 SSL （安全套接字）协议以验证参与通讯的用户的证书是否有权威、受信任的数字证书认证机构颁发，并且能执行双向身份认证。攻击场景如用户在一个未加密的 WiFi下访问网站。在中间人攻击中，攻击者可以拦截通讯双方的通话并插入新的内容。



场景：

- 在一个未加密的 WI-FI 无线接入点的接受范围内的中间人攻击者，可以将自己作为一个中间人插入这个网络。
- Fiddler / Charles 代理工具。

过程：

- 客户端发送请求到服务端，请求被中间人截获。服务器向客户端发送公钥，中间人截获公钥，保留在自己手上，然后自己生成一个【伪造的】公钥，发送给客户端。 客户端收到伪造的公钥后，生成加密 hash 值发给服务器。中间人获得加密的 hash 值，用自己的私钥解密获取真秘钥，同时生成假的加密 hash 值，发给服务器。服务器用私钥解密获取假秘钥，然后加密数据传输给客户端。



使用抓包工具 fiddle 进行举例说明

1. 1. 首先通过一些途径在客户端安装证书
   2. 然后客户端发送连接请求，fiddle 在中间截取请求，并返回自己伪造的证书

1. 1. 客户端已经安装了攻击者的根证书，所以验证通过
   2. 客户端就会正常和fiddle进行通信，把 fiddle 当作正确的服务器

1. 1. 同时fiddle会跟原有的服务器进行通信，获取数据以及加密的密钥，去解密密钥



常见的攻击方式：

- 嗅探：一种用来捕获流进和流出的网络数据包的技术，就好似是监听电话一般。
- 数据包注入：攻击者会将恶意数据包注入到常规数据中，而由于这些恶意数据包是藏在正常数据包之中，用户、系统难以发现。

- 会话劫持：当我们进行一个网站的登录的时候到退出登录这个时候，会产生一个会话，这个会话是攻击者用来攻击的首要目标，因为这个会话，包含了用户大量的数据和私密信息。
- SSL 剥离：HTTPS是通过SSL/TLS进行加密过的，在SSL剥离攻击中，会使SSL/TLS连接断开，让受保护的HTTPS，变成不受保护的HTTP（这对于网站非常致命）

- DNS 欺骗：攻击者往往通过入侵到 DNS 服务器，或者篡改用户本地 hosts 文件，然后去劫持用户发送的请求，然后转发到攻击者想要转发的服务器。
- ARP 欺骗：ARP(address resolution protocol) 地址解析协议，攻击者利用 ARP 的漏洞，用当前局域网之间的一台服务器，来冒充客户端想要请求的服务端，向客户端发送自己的 MAC 地址，客户端无从得到真正的主机的 MAC 地址，所以，他会把这个地址当作真正的主机来进行通信，将 MAC 存入 ARP 缓存表。

- 代理服务器。



预防方案：

- 使用可行的第三方 CA 厂商。
- 确认访问的网站是 HTTPS ，确保网站使用 SSL ，确保禁用一些不安全的 SSL，只开启： TLS1.1 TLS1.2



## SQL注入

描述：通过把 SQL 命令插入到 Web 表单递交或输入域名或页面请求的查询字符串，最终到达欺骗数据库服务器执行恶意的 SQL 命令，从而达到和服务器进行直接的交互。



预防方案：后台进行输入验证，使用参数化查询，尽量避免拼接 SQL 。



## 前端数据安全

描述：反爬虫。如猫眼电影、天眼查等。



预防方案：

- font-face拼接方式：猫眼电影、天眼查。
- background 拼接： 美团

- 伪元素隐藏：汽车之家
- iframe 异步加载： 网易云音乐

If you get gains，please give a like

[Csy]()

10-10 19:59

14

0

[Previous无标题]()

Reply

![Csy](https://gw.alipayobjects.com/zos/rmsportal/wYnHWSXDmBhiEmuwXsym.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng)

Back to document





Normal14px



Created with Sketch.

Created with Sketch.









Material

Normal

⌘ + KLink

Reply

![语雀](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*OwZWQ68zSTMAAAAAAAAAAABkARQnAQ)



[About]()[Guide]()[Security]()[Terms]()[中文](?language=zh-cn)

- [计算机网络](#O1swZ)
- [应用层](#VORYM)
- [域名系统（DNS）](#6Q88m)
- [文件传输协议（FTP）](#eQbqu)
- [电子邮件协议](#5e5dfcf9)
- [HTTP](#5uhIV)
- [HTTP 1.0 与 HTTP 1.1（HTTP 1.0 支持 Get Post Head）（HTTP 1.1 增支持 OPTIONS PUT DELETE TRACE CONNECT）](#JcuJs)
- [SPDY：HTTP 1.x 优化（冷门些，少考）](#TvwDP)
- [HTTP 2.0](#dSSB1)
- [HTTP 请求方法](#tPPCh)
- [HTTPS](#wfHw4)
- [对称加密：](#vj5sC)
- [非对称加密：](#FhaXc)
- [对称加密 + 非对称加密 通讯](#U8k11)
- [对称加密 + 非对称加密 + CA 证书认证 + Hash 散列算法](#xxqDI)
- [Web 页面请求过程](#CDn7a)
- [1、DHCP 配置主机信息](#eosOK)
- [2、ARP 解析 MAC 地址](#OOaTx)
- [3、DNS 域名解析](#63uB4)
- [4、HTTP 请求](#qCwie)
- [传输层](#uJNb9)
- [TCP 三次握手、四次挥手](#bUYnp)
- [TCP 的可靠传输：TCP通过超时重传来实现可靠连接，超时重传： 如果发出的报文段在一定时间内没有得到确认报文的回传，这个报文段将会得到重传。我们将发出报文到接收报文的这一段时间称为一个RTT。](#QqnBd)
- [TCP 滑动窗口： 略。](#Te9XL)
- [TCP 拥塞控制：避免网络环境拥堵。](#zahRv)
- [TCP 流量控制：](#hexkQ)
- [SYN 泛洪攻击 (vlan洪水)](#Z3smV)
- [网络层](#sN4Ye)
- [物理层](#rwNrV)
- [HTTP 状态码](#Bp8yj)
- [拓展](#mhesZ)
- [BGP 协议](#RZJF6)
- [BGP 协议的特性](#loG8b)
- [操作系统](#9oGnm)
- [进程、线程](#K68lY)
- [进程间通信](#EUxd8)
- [进程调度算法](#DRPwo)
- [批处理系统](#QQQ6F)
- [Js Concept](#gOx2E)
- [数据结构](#cIZqQ)
- [闭包 Closure](#uKjia)
- [Event Loop 宏任务/微任务](#SMHcT)
- [Event Loop](#DhFKy)
- [宏任务](#JyYqJ)
- [微任务](#eDxg9)
- [执行顺序](#2DBAm)
- [async await](#CNj8Y)
- [看输出](#zCb8i)
- [Js 内置对象](#DKsTC)
- [验证中文](#Hzhf3)
- [Shadow DOM](#9imho)
- [Call、apply、bind](#yz2Ts)
- [New 的实现原理](#N)
- [、<script defer>、<script async> 之间的区别](#hUF60)
- [Object.defineProperty / defineProperties](#XGJuF)
- [Object.Entries / Object.formEntries](#v1cpY)
- [Json.stringify](#ICwmo)
- [JSON.parse()](#awVEU)
- [Reducer](#kxYhB)
- [padStart](#Smdub)
- [实现一个 sleep 函数](#m1xzI)
- [小驼峰命名](#RhiWX)
- [Infinity 代表什么数据？](#ySa3e)
- [HTML](#5SASP)
- [HTML5 新特性](#swGjm)
- [语义化标签](#wFFvQ)
- [媒体元素](#lw8eA)
- [Web Storage](#RFoJV)
- [Web Socket](#9FewT)
- [Canvas 绘图](#Z0kac)
- [Meta Tag](#n5csc)
- [link 和 @import 导入资源有什么区别 ？](#VX9df)
- [H5 全局属性](#52Pa3)
- [a 标签的 target 属性](#VnJSY)
- [label 的作用](#gJfvY)
- [viewport (在移动端中极为重要)](#MhEkx)
- [为什么 H5 只需要写就可以了？](#0g5RV)
- [常见的浏览器内核](#QhP2z)
- [浏览器内多标签页间通信](#FRCNy)
- [Iframe 框架都有哪些优缺点？](#LaLjS)
- [关于 input 中的 disabled 和 readonly](#81dxH)
- [事件流](#L4c2X)
- [CSS](#JzV59)
- [盒模型](#Mp6gi)
- [几种上下文](#zAljf)
- [CSS 选择器](#ow7uB)
- [CSS 优先级](#J2tos)
- [继承属性](#PFx3M)
- [CSS 新特性](#TyB00)
- [Transition 过渡](#lCdLQ)
- [animation 动画](#m79aM)
- [shadow 阴影](#PwWr2)
- [transform 转换](#EyWu9)
- [CSS Position](#uKhqv)
- [常规水平居中、水平垂直居中](#3ITil)
- [水平居中：](#avGW7)
- [水平垂直居中：](#OKZze)
- [Flex 布局](#wmzEj)
- [Grid 布局](#HXmbM)
- [关于Span标签的padding、margin的设置](#weOil)
- [圣杯布局 && 双飞翼布局](#IUhLJ)
- [隐藏元素](#nj9x5)
- [清除 float 的方式以及其优点](#YCIJ1)
- [CSS 三角形](#h8K9N)
- [px rem em vw vh](#PgPgP)
- [什么是 FOUC ， 如何避免 FOUC ?](#VFKXB)
- [CSS Sprites 的原理和优缺点 *](#Tdqyk)
- [CSS 可置换元素与不可置换元素](#dL3cV)
- [Chrome 支持 12 px 以下的文字元素](#BdJVY)
- [浏览器是怎么判断元素是否和某个 CSS 选择器匹配 ？](#9qbkh)
- [Span 与 Span 之间的幽灵空格](#h1JtF)
- [React](#jf2qb)
- [React Class Component](#sKGNt)
- [LifeCycle](#fzd9p)
- [React 16 架构](#eI1CY)
- [Fiber 架构的心智模型](#JKNzJ)
- [React Hooks](#xZqGl)
- [前端手写题](#Fn8js)
- [Instanceof  原型链判断](#JTZBr)
- [数组扁平化](#6iyGV)
- [Promise](#QTTt4)
- [节流](#gJAZW)
- [防抖](#rzr9P)
- [CSR && SSR](#B0xcp)
- [CSR](#Sfzjh)
- [React SSR](#OCcDN)
- [为什么需要 SSR ？](#CwxmG)
- [浏览器缓存](#Oxefi)
- [强缓存](#2AaoQ)
- [Cache-Control](#Ldt7N)
- [协商缓存](#L0C6O)
- [Last-Modified / If-Modified-Since](#pVtCg)
- [Etag / If-None-Match](#Xcve6)
- [前端安全](#L8TZP)
- [跨站脚本攻击 XSS](#P8ZLU)
- [XSS 预防 （防止攻击者提交恶意代码，防止浏览器执行恶意代码）](#HhBsk)
- [CSRF 跨站请求伪造](#uCTHh)
- [CSRF 预防方案](#GtTT8)
- [Iframe 安全](#MuPv5)
- [Iframe 预防方案](#F5npd)
- [HTTPS](#8Dvo9)
- [静态资源验证完整性](#eF2LX)
- [中间人攻击](#Hv0ub)
- [SQL注入](#rqOPI)
- [前端数据安全](#hG81t)