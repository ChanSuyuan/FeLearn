# Js Concept

## 数据结构

- **Js目前含有的数据结构：**

- - **基本数据类型：string number undefined null boolean Bigint Symbol**
  - **复杂： Object**

- **JavaScript最大安全数字与最小安全数字**

- ```javascript 
  
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