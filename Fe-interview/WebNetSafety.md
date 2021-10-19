## Web 安全

### 1、SQL 注入

+ SQL 注入攻击的核心在于攻击者将具有目的性的 SQL 语句通过 Web 提交给数据库，执行恶意操作。
+ 常见的场景有 Form 表单提交以及请求参数 url，而后端服务器如果没有设置检查机制，那么将造成安全性 P0 级别事故。



### 2、XSS（跨站脚本攻击）

+ XSS 攻击的核心是将可执行的 Js 脚本植入到页面之中，意在让用户执行攻击者编写的恶意脚本。
+ XSS 一般分为两种，一种为反射型，一种为存储型。
+ 反射型中，攻击者将 Js 代码直接嵌入在请求参数 url 中，例如 <a>http:localhost:8080/test?name=<script>alert("you are under attack")</script></a> 这种方式。用户点击后，则该请求将会发送到后端服务器中，后端服务器如果未做安全检查，那么将执行攻击者 Js 代码，并将数据返回前端页面，中招。
+ https://mmbiz.qpic.cn/mmbiz_png/tuSaKc6SfPqYRNXg1QunqbaNCBRleyicNMGJ2DBag1yics48KEXx87rEOwA1Qv5wGAea3fMu1rAQFH0AVY0DLibrw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1
+ 存储型中，攻击者直接将攻击 Js 脚本发送给服务器，然后直接就存储在服务器、数据库上了，其他用户触发机制，中招。
+ https://mmbiz.qpic.cn/mmbiz_png/tuSaKc6SfPqYRNXg1QunqbaNCBRleyicNOibu8Dgmeibshmb85J0cOtrSYsrgJw2ibz4YLbXDLTM10kueTWiahTg4UA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1

### 3、CSRF（跨站请求伪造）
+ 核心在于，打开网站 A 且不关闭浏览器的情况下，另开一个 Tab 页面打开恶意网站 B，而在网站 B 中可存在恶意脚本，诱导用户点击使得浏览器发起一个对网站 A 的请求。
+ 由于浏览器中存储有 A 的 Cookie 以及其他用户个人信息，因而网站 A 的后端服务器为识别行为为用户个人行为。
+ 典型的例子有 银行家

### 4、DDos 攻击（分布式拒绝服务攻击）
+ 拒绝服务（Dos）攻击是一种恶意尝试，旨在影响合法最终用户对目标系统的可用性。常见的情况下，攻击者会生成大量数据包或者是请求发送给服务器，服务器负载压力过大，最终导致目标系统不堪重负。而所谓的 DDos 攻击，就是攻击者使用多台计算机或者计算机集群进行 Dos 攻击