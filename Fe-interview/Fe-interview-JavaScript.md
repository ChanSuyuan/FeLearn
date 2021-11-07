# Js Concept

[TOC]





## 数据结构

- **Js目前含有的数据结构：**
- **基本数据类型：string number undefined null boolean Bigint Symbol**
	引用数据类型： Object
- 基本数据类型与复杂数据类型之间的区别在与存储位置的不同：
  - 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
  - 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。





## 引用数据类型常用 Api

###  forEach()   

可以改变原数组，返回值为 undefined

###  Map()

会创建一个新数组，且能够有返回值

### filter ()

会创建一个新数组

### Reducer（）

- Reducer 函数接受四个参数 acc 、 cur 、 idx 、 src
- Reducer 函数还提供一个额外参数 initalValue 作为累加器的初始值。如果没有提供该参数，则将初始值默认为数组的第一个元素。	

## 数据类型检测的方式

+ （1)、**typeof** 判断该类型的机械码 ==> (000 对象  010 浮点数 100 字符串 110 布尔 1: 整数)

+ ```javascript
  console.log(typeof 2);               // number
  console.log(typeof true);            // boolean
  console.log(typeof 'str');           // string
  console.log(typeof []);              // object    
  console.log(typeof function(){});    // function
  console.log(typeof {});              // object
  console.log(typeof undefined);       // undefined
  console.log(typeof null);            // object
  ```

+ （2）、**instanceof** 可以正确判断对象的类型，其内部运行机制是判断其在原型链中是否能够找到该类型的类型。

+ ```javascript
  console.log(2 instanceof Number);                    // false
  console.log(true instanceof Boolean);                // false 
  console.log('str' instanceof String);                // false 
   
  console.log([] instanceof Array);                    // true
  console.log(function(){} instanceof Function);       // true
  console.log({} instanceof Object);                   // true
  ```



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

- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1627381665787-c0159c6c-d9b3-4b43-906c-1f2d267dd672.png)



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



## 正则表达式
+ 正则表达式是匹配模式，要么匹配字符，要么匹配位置。
+ ![image-20211025100946666](/Users/chensiyuan/Library/Application Support/typora-user-images/image-20211025100946666.png)
+ 可以与空字符串进行类比，字符的首尾、间隙都可以用空字符串进行连接。 
+ 例如``Hello === "H" + "" + "e" + "" + "l" + "" + "l" + "" + "o"``

+ 正则中常用来表达位置的有：^、$、\b、\B、?=p、(?!p)、(?<=p)、(?<!p)





> ^  脱字符，匹配行的开头
>
> 例如要在 hello 前添加一个笑脸（😄）

``` javascript
let string = 'hello'
console.log(string.replace(/^/,'😄')) // 😄hello
```



> $  匹配行的结尾
>
> 同理想在 hello 后添加一个笑脸（😄）

```javascript
let string = 'hello'
console.log(string.replace(/$/,'😄')) // hello😄
```





> \b 单词的边界，具体有三种规则
>
> ① \w和\W之间的位置
>
> ② ^与\w之间的位置
>
> ③ \w与$之间的位置
>
> 比如要把 **xxx_love_study_1.mp4**，变成`❤️xxx_love_study_1❤️.❤️mp4❤️`

```javascript
'xxx_love_study_1.mp4'.replace(/\b/g, '❤️') // ❤️xxx_love_study_1❤️.❤️mp4❤️
```

![image-20211025102726811](/Users/chensiyuan/Library/Application Support/typora-user-images/image-20211025102726811.png)



> \B 非单词的边界，与 \b 是反着来的意思，它的规则如下
>
> ① \w与\w之间的位置
>
> ② \W与\W之间的位置
>
> ③^与\W之间的位置
>
> ④\W与$之间的位置

```javascript
'[[xxx_love_study_1.mp4]]'.replace(/\B/g, '❤️') // ❤️[❤️[x❤️x❤️x❤️_❤️l❤️o❤️v❤️e❤️_❤️s❤️t❤️u❤️d❤️y❤️_❤️1.m❤️p❤️4]❤️]❤️
```

![image-20211025103140208](/Users/chensiyuan/Library/Application Support/typora-user-images/image-20211025103140208.png)

> (?=p)
>
> 符合 p 子模式前面的那个位置。换句话说，有一个位置，紧跟其后需要满足 p 子模式。也有一个学名叫**正向先行断言**。
>
> 还是这个例子`xxx_love_study_1.mp4`，要在xxx(xxx可以指代任何你喜欢的那个TA)前面塞一个❤️。

```javascript
'xxx_love_study_1.mp4'.replace(/(?=xxx)/g, '❤️') // ❤️xxx_love_study_1.mp4
```

![image-20211025103658300](/Users/chensiyuan/Library/Application Support/typora-user-images/image-20211025103658300.png)



> (?!p)
>
> 与（?=p）相反，可以理解为(?=p)匹配到的位置之外的位置都是属于(?!p)的，它被称为负向先行断言。

```javascript
'xxx_love_study_1.mp4'.replace(/(?!xxx)/g, '❤️') 

// (?=xxx)的输出
❤️xxx_love_study_1.mp4
// (?!xxx)的输出
x❤️x❤️x❤️_❤️l❤️o❤️v❤️e❤️_❤️s❤️t❤️u❤️d❤️y❤️_❤️1❤️.❤️m❤️p❤️4❤️
```



> (?<=p)
>
> 符合p子模式后面(注意(?=p)表示的是前面)的那个位置。换句话说是，有一个位置，其前面的部分需要满足p子模式。

```javascript
'xxx_love_study_1.mp4'.replace(/(?<=xxx)/g, '❤️') //xxx❤️_love_study_1.mp4
```

![image-20211025110811911](/Users/chensiyuan/Library/Application Support/typora-user-images/image-20211025110811911.png)

> (?<!p)
>
> (?<=p)反过来的意思，可以理解为(?<=p)匹配到的位置之外的位置都是属于(?<!p)的，

```javascript
'xxx_love_study_1.mp4'.replace(/(?<!xxx)/g, '❤️') 

// (?<=xxx)的输出
xxx❤️_love_study_1.mp4
// (?<!xxx)的输出
❤️x❤️x❤️x_❤️l❤️o❤️v❤️e❤️_❤️s❤️t❤️u❤️d❤️y❤️_❤️1❤️.❤️m❤️p❤️4❤️
```





## WebWorker（HTML5 标准）

> 作用：在主线程运作之外再创建一个worker线程，在主线程执行任务的同时，worker 线程也可以在后台执行它自己的任务，互不影响，使得 Js 能够变成多线程环境。

### 创建 worker 对象

> 主线程调用 new Worker() 构造函数,创建一个 worker 线程,构造函数的参数是一个url ,生成这种 url 的方法有两种 



+ 脚本文件

  + ```javascript
    const worker new Worker("https://~.js") // 	脚本文件
    ```

  + ##### Worker 存在两个限制

    > 1、分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
    >
    > 2、worker 不能读取本地的文件（不能打开本机的文件系统 file:// ），它所加载的脚本必须来自网络。

+ 字符串形式

  + ```javascript
    const data = `
        //  worker线程 do something
        `;
    // 转成二进制对象
    const blob = new Blob([data]);
    // 生成url
    const url = window.URL.createObjectURL(blob);
    // 加载url
    const worker = new Worker(url);
    ```

  + 在项目中：可以把worker线程的逻辑写在 js 文件里面，然后字符串化，然后再export、import，配合 webpack 进行模块化管理,这样就很容易使用了。

### 主线程的其他 API：

#### 主线程与 worker 线程通信

+ ```javascript
  const worker = new Worker()
  worker.postMessage({
    hello: ['hello', 'world']
  });		
  ```

+ 它们**相互之间的通信可以传递对象和数组**，这样我们就可以根据相互之间传递的信息来进行一些操作，比如可以设置一个`type`属性，当值为`hello`时执行什么函数，当值为`world`的时候执行什么函数。

+ 它们之间的通信是通过拷贝的形式来传递数据的，进行传递的对象需要经过序列化处理，接下来在另一端还要进行反序列化。这也说明，

  + > 1.我们必须传递能够被序列化的数据,比如函数就不能传.
    >
    > 2.在一端改变数据,另一端是不会受到影响的.

#### 监听 worker 线程返回的信息

```javascript
worker.onmessage = function (e) {
    console.log('父进程接收的数据：', e.data);
    // doSomething();
}
```

#### 主线程关闭 worker 线程

Worker 线程一旦新建成功,就会始终运行,这样有利于随时相应主线程的通信.这也是 Worker 比较耗费计算机的 CPU 的原因,一旦使用完毕,就应该关闭 worker 线程 。

```javascript
worker.terminate()
```

#### 监听错误

```javascript
// worker线程报错
worker.onerror = e => {
    // e.filename - 发生错误的脚本文件名；e.lineno - 出现错误的行号；以及 e.message - 可读性良好的错误消息
    console.log('onerror', e);
};
```



### Worker 线程

#### self 代表 worker 线程自身

worker 线程的执行上下文是一个叫做 WorkerGlobalScope 的东西，与主线程的 window 是不同的。 需要使用 self / WorkerGlobalScope 来访问全局对象。

#### 监听主线程传来的信息

```javaScript
self.onmessage = e =>{
	console.log(e)
	console.log('我是子进程')
}
```

#### 发送信息给主线程

```javaScript
self.postMessage = e => {
	console.log('主线程传来的信息',e.data)
}
```

#### worker 线程关闭自身

```javascript
self.close()
```

#### worker 线程加载脚本

Worker 线程能访问一个全局函数 importScripts() 来引入脚本，该函数接收 0 个或者多个 url 作为参数。

```javascript
importScripts('http~.js','https~.js')
```

> 脚本中的全局变量能够被 worker 线程使用。
>
> 脚本的下载顺序是不固定的，但执行时会按照传入 importScripts() 中的文件顺序进行，这个过程是同步的。

#### Worker 线程限制

因为 worker 创造了另外一个线程，不在主线程上，相应的会有一些限制，我们**无法使用**下列对象

> window document DOM parent

但我们可以使用以下对象

> 浏览器: navigator 对象
>
> URL: location  对象,只读
>
> 发送请求, XMLHttpRequest 对象
>
> 定时器: setTimeout/setInterval, 在 worker 线程轮询
>
> 应用缓存: Application Cache

### 应用场景:

数学运算 / 图像 影音等文件处理 / 大数据检索 / 耗时任务

#### poolWorker.js

```javascript
//模拟
self.onmessage = msg => {
	console.log(msg)
  console.log('我是子进程')
}
self.postMessage('我是子进程弟弟')
self.close()
```

#### index.html

```html
<script>
	const worker = new Worker('./poolWorker.js')
  worker.postMessage('我是主线程')
  worker.onmessage = msg => {
		console.log(msg)
    console.log('我是主进程哥哥')
    worker.terminate()
  }
  worker.onerror = e =>{
    console.log(e)
  }
</script>
```

