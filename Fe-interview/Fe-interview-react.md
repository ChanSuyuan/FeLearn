## 组件基础

### React 事件机制

```jsx
<div onClick={this.handleClick.bind(this)}>点我</div>
```

![77fa6b2a59c92e160bc171f9c80783e7.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e969caa9fc647cf8985c4c841a01f60~tplv-k3u1fbpfcp-watermark.awebp)

> JSX 中写的时间并没有绑定在对应的真实DOM上，而是通过事件代理的方式，将所有的事件都统一绑定在了 document 上。这样的方式不仅减少了内存消耗，海能在组件挂载销毁时统一订阅和移除。
>
> 冒泡到document上的事件也不全是原生浏览器事件，而是 React 本身实现的合成事件(SyntheticEvent)。因此如果不想要事件冒泡，需要调用 event.preventDefault。

#### 合成事件的目的

+ 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力。
+ 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个 **事件池** 专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。



### React事件和普通 HTML 事件的区别

#### 区别

> + 对于事件名称命名方式，原生事件全为小写，react 事件采用小驼峰
> + 对于事件函数处理语法，原生事件为字符串，react 事件为函数
> + react 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要明确地调用 preventDefault()来阻止默认行为。

合成事件是 react 模拟原生DOM事件所有能力的一个对象，优点如下：

+ 兼容所有浏览器，有更好的跨平台能力；
+ 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）
+ 方便 react 统一管理和事务机制



### React 组件中事件代理

> React 基于 Virtual DOM 实现了一个 SyntheticEvent 层，定义的事件处理器会接收到一个合成事件对象的实例，它符合 W3C标准，且与原生的浏览器事件拥有相同的接口，支持冒泡机制，所有的事件都自动绑定在最外层。
>
> 在React 底层，主要对合成事件做了两件事：
>
> + 事件委派：React会把所有的事件绑定到结构的最外层，使用**统一**的事件监听器，这个事件监听器上维持了一个**映射**来保存**所有组件内部事件监听和处理函数**。
> + 自动绑定：React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。



### React 高阶组件、 Render props、 hooks 区别

> 这三者是目前 react 解决代码复用的主要方式
>
> + 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
> + render props 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render props 是一个用于告知组件需要渲染什么内容的函数 prop。
> + 通常，render props 和高阶组件只渲染一个子节点。让 Hook 来服务这个使用场景更加简单。这两种模式仍有用武之地。（例如，一个虚拟滚动条组件或许会有一个 renderItem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但大部分场景下，Hook 足够用了。

#### HOC

```jsx
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));
```

> HOC 的优缺点：
>
> + 优点： 逻辑服用、不影响被包裹组件的内部逻辑
> + 缺点： HOC 传递给包裹组件的props 容易被包裹后的组件重名，进而被覆盖。

#### Render props

具有render prop 的组件接收一个返回 React元素的函数，将render的渲染逻辑注入到组件内部。在这里，‘render'的命名可以是任何其他有效的标识符。

```jsx
// DataProvider组件内部的渲染逻辑如下
class DataProvider extends React.Components {
     state = {
    name: 'Tom'
  }

    render() {
    return (
        <div>
          <p>共享数据组件自己内部的渲染逻辑</p>
          { this.props.render(this.state) }
      </div>
    );
  }
}

// 调用方式
<DataProvider render={data => (
  <h1>Hello {data.name}</h1>
)}/>
```



##### 优点：

数据共享、代码复用，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。

##### 缺点：

无法在return 语句外访问数据、嵌套写法不够优雅。



#### Hooks

##### 优点：

+ 使用直观；解决hoc重名问题。解决render props 因共享数据而出现嵌套地狱的问题。能在return之外使用数据的问题。

##### 缺点：

+ hook 只能在组件顶层使用。

## React LifeCycle

- **The Version 16.4**![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628778306953-36592f13-80a7-4083-a266-914d3ad755ac.png)
- **The Version 16.3** ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1628778592898-948a91ec-c9b3-4c9a-96c8-9a4f3b73d542.png)
- **componentWillMount, componentWillReceiveProps, componentWillUpdate were abandoned，and will'be deleted in V.17**



## React 理念

> 我们认为，React是用 JavaScript 构建**快速响应**的大型Web应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

关键 可见是**快速响应**，而制约 **快速响应**的因素是什么？

+ 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。
+ 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

这两类场景可以概括为：CPU瓶颈、IO瓶颈。

## CPU 瓶颈

当项目变得庞大、组件数量繁多时，就容易遇到CPU的瓶颈。

例如以下Demo，在视图中渲染 3000 个 li：

```jsx
funcation App (){
	const len = 3000
	return (
		<ul>
			{Array(lent).fill(0).map((_,i) => <li>{i}</li>)}
		</ul>
	)
}

const rootEl = document.querySelector('#root')
ReactDOM.render(<App/>, rootEl)
```

主流的浏览器刷新频率为 60 Hz，即每（1000ms/ 60Hz） 16.6ms浏览器刷新一次。

而 Js 可以操作 DOM， **GUI 渲染线程**与 **JS线程**是互斥的。所以 **js 脚本执行**和 **浏览器布局、绘制**不能同时执行。·

在每16.6 ms时间内，需要完成如下工作：

```
Js 脚本执行 ---- 杨式布局 --- 样式绘制
```

当 JS 脚本执行超过 16.6ms，这次刷新就没有时间执行 **样式布局** 和 **样式绘制**了。

那么想要解决问题，需要在浏览器**每一帧的时间**中，预留一些时间给 JS线程，React 利用这部分时间（5ms）更新组件。当预留的时间不够用的时候， React 将线程控制权交还给浏览器使其有时间渲染 UI， React 则等待下一帧时间到来继续被中断的工作。

> 这种将长任务拆分到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为 **时间切片**（time slice)

接下来会通过 ReactDOM.unstable_createRoot 开启 Concurrent Mode。此时长任务被拆分到每一帧不同的task中， Js 脚本执行时间大体在 5ms 左右，这样浏览器就有剩余时间来执行 **样式布局**和 **样式绘制**，减少掉帧的可能性。

所以，解决 **CPU瓶颈** 的关键是实现 **时间切片**，而 **时间切片**的关键是： 将 **同步的更新**变为 **可中断的异步更新**。



## IO 瓶颈

`网络延迟`是前端开发者无法解决的。如何在 `网络延迟`客观存在的情况下，减少用户对`网络延迟`的感知呢？

React给出的答案是 `将人机交互研究的结果整合到真实的UI中`

以苹果举例，在 IOS系统中，点击 “设置‘ 面板中的 通用。

![同步](https://react.iamkasong.com/img/legacy-move.gif)

作为对比，再点击”设置“面板中的 ”Siri与搜索“，进入 ”Siri与搜索“界面

![异步](https://react.iamkasong.com/img/concurrent-mov.gif)

其中有什么区别呢？

> 事实上，点击“通用”后的交互是同步的，直接显示后续界面。而点击“Siri与搜索”后的交互是异步的，需要等待请求返回后再显示后续界面。但从用户感知来看，这两者的区别微乎其微。
>
> 这里的窍门在于：点击“Siri与搜索”后，先在当前页面停留了一小段时间，这一小段时间被用来请求数据。
>
> 当“这一小段时间”足够短时，用户是无感知的。如果请求时间超过一个范围，再显示`loading`的效果。
>
> 试想如果我们一点击“Siri与搜索”就显示`loading`效果，即使数据请求时间很短，`loading`效果一闪而过。用户也是可以感知到的。

为此， `React`实现了 Suspense 功能以及配套的 hook -- useDeferredValue , 但这里需要注意， **Suspense目前处于试验阶段，在稳定版本中尚不可使用。**

而在源码内部，为了支持这些特性，同样需要将**同步的更新**变为**可中断的异步更新**。



## 老的React 15架构

React 15 结构可分为两层：

+ Reconciler（协调器） ---负责找出变化的组件
+ Renderer（渲染器） --- 负责将变化的组件渲染到页面上

### Reconciler（协调器）

在 React 中可以通过 this.setState、this.forceUpdate、ReactDOM.render等API触发更新。

当有更新发生时，Reconciler会做如下工作：

+ 调用函数组件、或 class 组件的 `render`方法，将返回的 JSX 转化为虚拟DOM
+ 将虚拟DOM和上次更新时的虚拟DOM对比
+ 通过对比找出本次更新中变化的虚拟DOM
+ 通知 Renderer 将变化的虚拟DOM渲染到页面上



### Renderer（渲染器）

由于`react`支持跨平台，所以不同平台有不同的 **Renderer**。我们前端最熟悉的是负责在浏览器环境渲染的Renderer---ReactDOM

除此之外，还有：

+ ReactNative渲染器，渲染 App原生组件
+ ReactTest渲染器，渲染出纯Js对象用于测试
+ ReactArt渲染器，渲染到Canvas，SVG或VML（IE8）

在每次更新发生时，**Renderer**接到 **Reconciler**通知，将变化的组件渲染在当前宿主环境。



### React15架构的缺点

在**Reconciler**中，`mount`的组件会调用 mountComponent，`update`的组件会调用 updateComponent。这两个方法都会递归更新子组件。

```js
mountComponent: function( 
	transaction,
   hostParent,
   hostContainerInfo,
   context
)
updateComponent: function(transaction,prevElement,nextElement,context)
```

#### 递归更新的缺点

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。而为了解决卡顿，则需要用可中断的异步更新来代替同步的更新。**而React15不会中断进行中的更新**。在React15中，**Reconciler**和**Renderer**是交替工作的。故而进行了重构。





## React 16 架构

- **Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler**
- **Reconciler（协调器）—— 负责找出变化的组件**

- **Renderer（渲染器）—— 负责将变化的组件渲染到页面上**

React16 架构，在React15的基础上，添加了**Scheduler**。



### Scheduler（调度器）

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间的时候来通知我们。

其实部分浏览器已经实现了这个API，就是`requestIdleCallback`。但是由于以下因素，`React`放弃使用：

+ 浏览器兼容性
+ 触发频率不稳定，受到很多因素影响，比如当我们的浏览器切换tab，之前tab注册的`requestIdleCallback`触发的频率会变得很低。

基于以上原因，`React`实现了功能更完备的`requestIdleCallback` polyfill，这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。

#### window.requestIdleCallback()

插入一个函数，这个函数将在浏览器**空闲时期**被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时间`timeout`，则有可能为了在超时前执行函数而打乱执行顺序。

在 MDN 中强力建议到使用`timeout`选项进行必要的工作，否则可能会在触发回调之前经过几秒钟。

目前该API处于实验阶段，不支持 IE 、Safari。



### Reconciler（协调器)

我们知道，在React15中**Reconciler**是递归处理虚拟DOM的。让我们看看**React16的Reconciler**。

我们可以看见，更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent(){
  while(workInProgress !== null && !shouldYield()){
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

在React16中，**Reconciler**与**Renderer**不再是交替工作，当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表 **增/删/更新**的标记，类似如下 (packages/react-reconciler/src/ReactSideEffectTags.js)

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

#### Fiber Reconciler 即 React16 Reconciler

主要目标： 

+ 能够把可中断的任务切片处理。
+ 能够调整优先级，重置并复用任务。
+ 能够在父子元素之间交错处理，支持React中的布局。
+ 能够在`render()`中返回多个元素。
+ 能够更好地支持错误边界。



## Fiber架构的心智模型

### 什么是代数效应

`代数效应`是`函数时编程`中的一个概念，用于将`副作用`从`函数`调用中分离。

接下来我们用 `虚拟的语法`来解释。

假设我们有一个函数 `getTotalPicNum`，传入2个 `用户名称`后，分别查找该用户在平台保存的图片数量，最后将图片数量相加后返回。

```js
function getTotalPicNum(user1,user2) {
  const picNum1 = getPicNum(user1)
	const picNum2 = getPicNum(user2)
  
  return picNum1 + picNum2
}
```

在 `getTotalPicNum`中，我们不关注 `getPicNum`的实现，只在乎“获取到两个数字后将他们相加的结果返回”这一过程。

接下来我们来实现`getPicNum`。

"用户在平台保存的图片数量"是保存在服务器中的。所以，为了获取该值，我们需要发起异步请求。

为了尽量保持`getTotalPicNum`的调用方式不变，我们首先想到了使用`async await`：

```js
async function getTotalPicNum(user1, user2) {
  const picNum1 = await getPicNum(user1);
  const picNum2 = await getPicNum(user2);

  return picNum1 + picNum2;
}
```

但是，`async await`是有`传染性`的 —— 当一个函数变为`async`后，这意味着调用他的函数也需要是`async`，这破坏了`getTotalPicNum`的同步特性。

有没有什么办法能保持`getTotalPicNum`保持现有调用方式不变的情况下实现异步请求呢？

没有。不过我们可以`虚构`一个。

我们虚构一个类似`try...catch`的语法 —— `try...handle`与两个操作符`perform`、`resume`。

```js
async function getTotalPicNum(user1, user2) {
  const picNum1 = await getPicNum(user1);
  const picNum2 = await getPicNum(user2);

  return picNum1 + picNum2;
}

function getPicNum(name) {
  const picNum = perform name;
  return picNum;
}

try {
  getTotalPicNum('cc', 'bb');
} handle (who) {
  switch (who) {
    case 'cc':
      resume with 230;
    case 'bb':
      resume with 122;
    default:
      resume with 0;
  }
}
```

当执行到`getTotalPicNum`内部的 `getPicNum`方法时，会执行 `perform name`。

此时函数调用栈会从 `getPicNum`方法内跳出，被最近一个`try...handle`捕获。类似`throw Error`后被最近一个 `try...catch`捕获。

类似`throw Error`后`Error`会作为`catch`的参数，`perform name`后 `name`会作为 `handle`的参数。与`try...catch`最大的不同在于：当`Error`被`catch`捕获后，之前的调用栈就销毁了。而`handle`执行`resume`后会回到之前的`perform`的调用栈。

对于`case 'cc'`，执行玩 `resume with 230`后调用栈会回到`getPicNum`，此时`picNum === 230`

`代数效应`能够将`副作用`（例子中为请求图片数量）从函数逻辑中分离，使函数关注点保持纯粹。

并且，从例子中可以看出，`perform resume`不需要区分同步异步。



### 代数效应在React中的应用

`代数效应`在React中应用最明显的例子就是 `Hooks`

对于类似`useState`、`useReducer`、`useRef`这样的`Hook`，我们不需要关注`FunctionComponent`的`state`在`Hook`中是如何保存的，`React`会为我们处理。

我们只需要假设`useState`返回的是我们想要的`state`，并编写业务逻辑就行。

```js
function App() {
  const [num, updateNum] = useState(0);
  
  return (
    <button onClick={() => updateNum(num => num + 1)}>{num}</button>  
  )
}
```

### 代数效应与Generator

从`React15`到`React16`，协调器(`Reconciler`)重构的一大目的就是：将老的`同步更新`的架构变为`异步可中断` 。

`异步可中断更新`可以理解为：`更新`在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

这就是`代数效应`中`try...handle`的作用。

其实，浏览器原生就支持类似的实现，这就是`Generator`。

但是`Generator`的一些缺陷使`React`团队放弃了他：

- 类似`async`，`Generator`也是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变。这样心智负担比较重。
- `Generator`执行的`中间状态`是上下文关联的。

```js
function* doWork(A, B, C) {
  var x = doExpensiveWorkA(A);
  yield;
  var y = x + doExpensiveWorkB(B);
  yield;
  var z = y + doExpensiveWorkC(C);
  return z;
}
```

每当浏览器有空闲时间都会一次执行其中一个 `doExpensiveWork`，当时间用尽则会中断，当再次恢复时会从中断位置继续执行。

只考虑 ”单一优先级任务的中断与继续“情况下 `Generator`可以很好的实现 `异步可中断更新`

但是当考虑到”**高优先级任务插队**“的情况，如果此时已经完成了`doExpensiveWorkA`与`doExpensiveWorkB`计算`x`与`y`。

此时`B`组件接收到一个`高优更新`，由于`Generator`执行的`中间状态`是上下文关联的，所以计算`y`时无法复用之前已经计算出的`x`，需要重新计算。

如果通过`全局变量`保存之前执行的`中间状态`，又会引入新的复杂度。



### 代数效应与Fiber

`Fiber`并不是计算机术语中的新名词，它称为`纤程`，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将`纤程`理解为`协程`的一种实现。在`JS`中，`协程`的实现便是`Generator`。

所以，我们可以将`纤程`(Fiber)、`协程`(Generator)理解为`代数效应`思想在`JS`中的体现。

`React Fiber`可以理解为：

`React`内部实现一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

其中每个任务更新单元为`React Element`对应的`Fiber节点`。



## Fiber架构的实现原理

### Fiber的起源

在`React15`及以前，`Reconciler`采用递归的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，`React16`将**递归的无法中断的更新**重构为**异步的可中断更新**，由于曾经用于递归的**虚拟DOM**数据结构已经无法满足需要。于是，全新的`Fiber`架构应运而生。

### Fiber的含义

`Fiber`包含三层含义：

+ 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
+ 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型(函数组件/类组件/原生组件)、对应的DOM节点等信息。
+ 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作(需要被删除/被插入页面中/被更新....)。

### Fiber的结构

https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiber.new.js#L117

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

#### 作为架构来说

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠如下三个属性。

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

举个例子，如下的组件结构：

```jsx
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}
```

其对应的Fiber结构：

![Fiber架构](https://react.iamkasong.com/img/fiber.png)

这里需要提一下，为什么父级指针叫做`return`而不是`parent`或者`father`呢？因为作为一个工作单元，`return`指节点执行完`completeWork`后会返回的下一个节点。子`Fiber节点`及其兄弟节点完成工作后会返回其父级节点，所以用`return`指代父级节点。

#### 作为静态的数据结构

作为一种静态的数据结构，保存了组件相关的信息：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

#### 作为动态的工作单元

作为动态的工作单元，`Fiber`中如下参数保存了本次更新相关的信息。

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;
```

如下两个字段保存调度优先级相关的信息，

```js
// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```

## Fiber架构的工作原理

`Fiber`节点可以保存对应的`DOM节点`，响应的`Fiber节点`构成的`Fiber树`就对应`DOM树`。在React16中，我们采用“双缓存”技术来更新DOM。

### 什么是“双缓存”

当我们使用`canvas`绘制动画，每一帧绘制前都会调用`ctx.clearRect`清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现**白屏**。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种**在内存中构建并直接替换**的技术叫做[双缓存 (opens new window)](https://baike.baidu.com/item/双缓冲)。

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新。

### 双缓存Fiber树

在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

`current Fiber树`中的`Fiber节点`被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`，他们通过`alternate`属性连接。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

`React`应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成`current Fiber`树指向的切换。

即当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，应用根节点的`current`指针指向`workInProgress Fiber树`，此时`workInProgress Fiber树`就变为`current Fiber树`。

每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成`DOM`更新。

### Mount时

```js
function App(){
  const [num,add] = useState(0)
  return (
  	<p onClick={()=> add(num + 1)}>{num}</p>
  )
}

ReactDOM.render(<App/>,document.getElementById('root));
```

1、首先执行`ReactDOM.render`会创建`fiberReactNode`（源码中叫`fiberRoot`）和`rootFiber`。其中`fiberRootNode`是整个应用的根节点，`rootFiber`是`<App/>`所在组件树的根节点。

之所以要区分`fiberRootNode`与`rootFiber`，是因为在应用中我们可以多次调用`ReactDOM.render`渲染不同的组件树，他们会拥有不同的`rootFiber`。但是整个应用的根节点只有一个，那就是`FiberRootNode`。

`fiberRootNode`的`current`会指向当前页面上已渲染内容对应`Fiber树`，即`current Fiber树`。

![rootFiber](https://react.iamkasong.com/img/rootfiber.png)

```js
fiberRootNode.current = rootFiber
```

由于是首屏渲染，页面中还没有挂载任何`DOM`，所以`fiberRootNode.current`指向的`rootFiber`没有任何`子Fiber节点`(即`current Fiber树`为空)。

2、接下来进入`render阶段`，根据组件返回的`JSX`在内存中一次创建`Fiber节点`并连接在一起构建`Fiber树`，被称为`workInProgress Fiber树`。（下图右侧为内存中构建的树，左侧为页面显示的树。）

在构建`workInProgress Fiber树`时会尝试复用`current Fiber树`中已有的`Fiber节点`内的属性，在`首屏渲染`时只有`rootFiber`存在对应的`current Fiber`（即 `rootFiber.alternate`）。

![](https://react.iamkasong.com/img/workInProgressFiber.png)

3、途中右侧已构建完的`workInProgress Fiber树`在`commit阶段`渲染到页面。

此时`DOM`更新为右侧树对应的样子。`fiberRootNode`的`current`指针指向`workInProgress Fiber树`使其变为`current Fiber树`。

![workInProgressFiberFinish](https://react.iamkasong.com/img/wipTreeFinish.png)

### update时

1、接下来我们点击 `p节点`触发状态改变，这回开启一次新的`render阶段`并构建一颗新的`workInProgress Fiber树`。

![wipTreeUpdate](https://react.iamkasong.com/img/wipTreeUpdate.png)

和`mount`时一样，`workInProgress fiber`的创建可以复用`current Fiber树`对应的节点数据。

> 这里决定是否复用的过程就是 Diff 算法

2、`workInProgress Fiber树`在`render阶段`完成构建后进入`commit阶段`渲染到页面上。渲染完毕后，`workInProgress Fiber树`变为`current Fiber树`。

![currentTreeUpdate](https://react.iamkasong.com/img/currentTreeUpdate.png)

## 深入理解JSX

`JSX`在编译时会被`Babel`编译为`React.createElement`方法。

`JSX`并不是只能被编译为`React.createElement`方法，你可以通过[@babel/plugin-transform-react-jsx (opens new window)](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)插件显式告诉`Babel`编译时需要将`JSX`编译为什么函数的调用（默认为`React.createElement`）。

### React.createElement

既然`jsx`会被编译为`React.createElement`，看看具体过程实现吧

```js
export function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    // 将 config 处理后赋值给 props
    // ...省略
  }

  const childrenLength = arguments.length - 2;
  // 处理 children，会被赋值给props.children
  // ...省略

  // 处理 defaultProps
  // ...省略

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // 标记这是个 React Element
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };

  return element;
};
```

我们可以看到，`React.createElement`最终会调用`ReactElement`方法返回一个包含组件数据的对象，该对象有个参数`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个`React Element`。

所以调用`React.createElement`返回的对象就是`React Element`么？

`React`提供了验证合法`React Element`的全局API [React.isValidElement (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react/src/ReactElement.js#L547)，我们看下他的实现

```js
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```

可以看到，`$$typeof === REACT_ELEMENT_TYPE`的非`null`对象就是一个合法的`React Element`。换言之，在`React`中，所有`JSX`在运行时的返回结果（即`React.createElement()`的返回值）都是`React Element`。



### React Component

在`React`中，我们常使用`classComponent`与`FunctionComponent`构建组件。

```jsx
class AppClass extends React.Component {
	render(){
    return <p>Hello World</p>
  }
  console.log("这是ClassComponent",AppClass)
	console.log("这是Element",<AppClass/>)
              
  function AppFunc(){
    return <p>Hello World</p>
  }

	console.log("这是FunctionComponent,AppFunc")
	console.log("这是Element",<AppFunc/>)
}
```

Demo https://codesandbox.io/s/jsx-type-blpuo

![image-20220105144634671](C:\Users\Csy\AppData\Roaming\Typora\typora-user-images\image-20220105144634671.png)

可以看出`ClassComponent`对应的`Element`的`type`字段是`AppClass`自身。

`FunctionComponent`对应的`Element`的`type`字段是 `AppFunc`自身，如下所示:

```js
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: ƒ AppFunc(),
  _owner: null,
  _store: {validated: false},
  _self: null,
  _source: null 
}
```

但是需要注意的是，`AppClass instanceof Function === true` `AppFunc instanceof Function === true`，所以无法通过引用类型来区分`ClassComponent`和`FunctionComponent`。`React`通过`ClassComponent`实例原型上的`isReactComponent`变量判断是否为`ClassComponent`。

`ClassComponent.prototype.isReactComponent = {}`如果是ReactComponent则返回了{}。需要注意的是方法组件不存在原型链概念。



### JSX与Fiber节点

`JSX`是一种描述当前组件内容的数据结构，他不包含组件`schedule`、`reconcile`、`render`所需的相关信息。

比如以下信息就不包括在`JSX`中：

+ 组件在更新中的**优先级**
+ 组件的 `state`
+ 组件被打上的用于 `Renderer`的**标记**

这些内容都包含在`Fiber节点`中。

所以，在组件`mount`时，`Reconciler`根据`JSX`描述的组件内容生成组件对应的`Fiber节点`。

在`update`时，`Reconciler`将`JSX`与`Fiber节点`保存的数据对比，生成组件对应的`Fiber节点`，并根据对比结果为`Fiber节点`打上`标记`。

## Render阶段

### 流程

`render阶段`开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于本次更新是同步还是异步更新。

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

可以看出，他们之间唯一的区别就是是否调用`shouldYield()`。如果当前浏览器帧没有剩余时间，`shouldYield`会中止循环，知道浏览器有空闲时间后再继续遍历。

`workInProgress`代表当前以及建立的`workInProgress Fiber`。

`performUnitOfWork`方法会创建下一个`Fiber节点`并赋值给`workInProgress`，并将`workInProgress`与已创建的`Fiber节点`连接起来构建`Fiber树`。

我们知道`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为:**递和归**

#### “递”阶段

首先从`rootFiber`开始向下**深度优先遍历**。为遍历到的每个`Fiber节点`调用**beginWork方法**。该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个`Fiber节点`连接起来。当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

#### “归”阶段

在“归”阶段会调用**completeWork**处理`Fiber节点`。

当某个`Fiber节点`执行完`completeWork`，如果其存在`兄弟Fiber节点`(即`fiber.sibling !== null`)，会进入其`兄弟Fiber`的“递”阶段。

如果不存在`兄弟Fiber`，会进入`父级Fiber`的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render阶段`的工作就结束了。

### [#](https://react.iamkasong.com/process/reconciler.html#例子)例子

以上一节的例子举例：

```js
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
```

对应的`Fiber树`结构： ![Fiber架构](https://react.iamkasong.com/img/fiber.png)

`render阶段`会依次执行：

```sh
1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork
```

>注意
>
>之所以没有 “KaSong” Fiber 的 beginWork/completeWork，是因为作为一种性能优化手段，针对只有单一文本子节点的`Fiber`，`React`会特殊处理。



### BeginWork 方法(Render阶段)

`beginWork`的工作是传入`当前Fiber节点`，创建`子Fiber节点`。

#### 从传参看方法执行

```js
function beginWork (
	current:Fiber | null,
  workInProgress: Fiber,
  renderLanes:Lanes,
): Fiber | null {
}
```

其中传参：

- current：当前组件对应的`Fiber节点`在上一次更新时的`Fiber节点`，即`workInProgress.alternate`
- workInProgress：当前组件对应的`Fiber节点`
- renderLanes：优先级相关，在讲解`Scheduler`时再讲解

从[双缓存机制一节](https://react.iamkasong.com/process/doubleBuffer.html)我们知道，除[`rootFiber`](https://react.iamkasong.com/process/doubleBuffer.html#mount时)以外， 组件`mount`时，由于是首次渲染，是不存在当前组件对应的`Fiber节点`在上一次更新时的`Fiber节点`，即`mount`时`current === null`。

组件`update`时，由于之前已经`mount`过，所以`current !== null`。

所以我们可以通过`current === null ?`来区分组件是处于`mount`还是`update`。

基于此原因，`beginWork`的工作可以分为两部分：

- `update`时：如果`current`存在，在满足一定条件时可以复用`current`节点，这样就能克隆`current.child`作为`workInProgress.child`，而不需要新建`workInProgress.child`。
- `mount`时：除`fiberRootNode`以外，`current === null`。会根据`fiber.tag`不同，创建不同类型的`子Fiber节点`

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes,
    );
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: 
      // ...省略
    case LazyComponent: 
      // ...省略
    case FunctionComponent: 
      // ...省略
    case ClassComponent: 
      // ...省略
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
      // ...省略
    // ...省略其他类型
  }
}
```



#### update时

我们可以看到，满足如下情况时`didReceiveUpdate === false`（即可以直接复用前一次更新的`子Fiber`，不需要新建`子Fiber`，不需要新建`子Fiber`）

1、`oldProps === newProps && workInProgress.type === current.Type`，即`props`与`fiber.type`不变。

2、`!includesSomeLane(renderLanes,updateLanes)`，即当前`Fiber节点`优先级不够。

```js
if(current !== null){
	const oldProps = current.memoizedProps;
  const newProps = workInProgress.pendingProps;
  
  if(
  	oldProps !== newProps ||
    hasLegacyCOntextChanged() ||
    (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true
  }else if (!includesSomeLane(renderLanes, updateLanes)) {
      didReceiveUpdate = false;
      switch (workInProgress.tag) {
        // 省略处理
      }
      return bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderLanes,
      );
    } else {
      didReceiveUpdate = false;
    }
  } else {
    didReceiveUpdate = false;
}
```

#### mount时

当不满足优化路径时，就会进入第二部分，新建`子Fiber`。

可以看到，根据`fiber.tag`不同，进入不同类型`fiber`的创建逻辑。

```js
// mount时：根据tag不同，创建不同的Fiber节点
switch (workInProgress.tag) {
  case IndeterminateComponent: 
    // ...省略
  case LazyComponent: 
    // ...省略
  case FunctionComponent: 
    // ...省略
  case ClassComponent: 
    // ...省略
  case HostRoot:
    // ...省略
  case HostComponent:
    // ...省略
  case HostText:
    // ...省略
  // ...省略其他类型
}
```

对于我们常见的组件类型，如（`FunctionComponent`/`ClassComponent`/`HostComponent`），最终会进入[reconcileChildren (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L233)方法。



#### reconcileChildren

该函数名就能看出这是`Reconciler`模块的核心部分。

+ 对于 `mount`的组件，他会创建新的`子Fiber节点`
+ 对于`update`的组件，他会将当前组件与该组件在上次更新时对应的`Fiber节点`比较(也就是俗称的`Diff算法`)，将比较的结果生成性的`Fiebr节点`。

```js
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    );
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}
```

从代码可以看出，和`beginWork`一样，他也是通过`current === null ?`区分`mount`与`update`。

不论走哪个逻辑，最终他会生成新的子`Fiber节点`并赋值给`workInProgress.child`，作为本次`beginWork`[返回值 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L1158)，并作为下次`performUnitOfWork`执行时`workInProgress`的[传参 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1702)

> 注意
>
> 值得一提的是，`mountChildFibers`与`reconcileChildFibers`这两个方法的逻辑基本一致。唯一的区别是：`reconcileChildFibers`会为生成的`Fiber节点`带上`effectTag`属性，而`mountChildFibers`不会。

#### effectTag

`render阶段`的工作是在内存中进行，当工作结束后会通知`Renderer`需要执行的`DOM操作`。要执行`DOM`操作的具体类型就保存在`fiber.effectTag`中。

比如：

```js
// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;
```

> 通过二进制表示`effectTag`，可以方便的使用位操作符作为`fiber.effectTag`赋值多个`effect`

那么，如果要通知`Renderer`将`Fiber节点`对应的`DOM节点`插入页面中，需要满足两个条件：

1. `fiber.stateNode`存在，即`Fiber节点`中保存了对应的`DOM节点`
2. `(fiber.effectTag & Placement) !== 0`，即`Fiber节点`存在`Placement effectTag`

我们知道，`mount`时，`fiber.stateNode === null`，且在`reconcileChildren`中调用的`mountChildFibers`不会为`Fiber节点`赋值`effectTag`。那么首屏渲染如何完成呢？

针对第一个问题，`fiber.stateNode`会在`completeWork`中创建，我们会在下一节介绍。

第二个问题的答案十分巧妙：假设`mountChildFibers`也会赋值`effectTag`，那么可以预见`mount`时整棵`Fiber树`所有节点都会有`Placement effectTag`。那么`commit阶段`在执行`DOM`操作时每个节点都会执行一次插入操作，这样大量的`DOM`操作是极低效的。

为了解决这个问题，在`mount`时只有`rootFiber`会赋值`Placement effectTag`，在`commit阶段`只会执行一次插入操作。



### CompleteWork

#### 流程概览

类似`beginWork`,`completeWork` 也是针对不同`fiber.tag`调用不同的处理逻辑。

```js
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }
  // ...省略
```

我们重点关注页面渲染所必须的`HostComponent`（即原生`DOM组件`对应的`Fiber节点`）

### 处理HostComponent

和`beginWork`一样，我们根据`current !== null ？` 判断是`mount`还是`update`。

同时针对`HostComponent`，判断`update`时我们还需要考虑`workInProgress.stateNode != null ?`（即该`Fiber节点`是否存在对应的`DOM节点`）

```js
case HostComponent: {
  popHostContext(workInProgress);
  const rootContainerInstance = getRootHostContainer();
  const type = workInProgress.type;

  if (current !== null && workInProgress.stateNode != null) {
    // update的情况
    // ...省略
  } else {
    // mount的情况
    // ...省略
  }
  return null;
}
```



### update时

当`update`时，`Fiber节点`已经存在对应`DOM节点`，所以不需要生成`DOM节点`。需要做的主要是处理`props`，比如：

- `onClick`、`onChange`等回调函数的注册
- 处理`style prop`
- 处理`DANGEROUSLY_SET_INNER_HTML prop`
- 处理`children prop`

我们去掉一些当前不需要关注的功能（比如`ref`）。可以看到最主要的逻辑是调用`updateHostComponent`方法。

```js
if (current !== null && workInProgress.stateNode != null) {
  // update的情况
  updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance,
  );
}
```

在`updateHostComponent`内部，被处理完的`props`会被赋值给`workInProgress.updateQueue`，并最终会在`commit阶段`被渲染在页面上。

```ts
workInProgress.updateQueue = (updatePayload: any);
```

### mount时

同样，我们省略了不相干的逻辑。可以看到，`mount`时主要是逻辑包括三个

+ 为`Fiber节点`生成对应的`DOM节点`
+ 将子孙`DOM节点`插入刚生成的`DOM节点`
+ 与`update`逻辑中的`updateHostComponent`类似的处理 props 的过程

```js
// mount的情况

// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext();
// 为fiber创建对应DOM节点
const instance = createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress,
  );
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false);
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance;

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
  )
) {
  markUpdate(workInProgress);
}
```

还记得[上一节](https://react.iamkasong.com/process/beginWork.html#effecttag)我们讲到：`mount`时只会在`rootFiber`存在`Placement effectTag`。那么`commit阶段`是如何通过一次插入`DOM`操作（对应一个`Placement effectTag`）将整棵`DOM树`插入页面的呢？

原因就在于`completeWork`中的`appendAllChildren`方法。

由于`completeWork`属于“归”阶段调用的函数，每次调用`appendAllChildren`时都会将已生成的子孙`DOM节点`插入当前生成的`DOM节点`下。那么当“归”到`rootFiber`时，我们已经有一个构建好的离屏`DOM树`。

### effectList

至此`render阶段`的绝大部分工作就完成了。

还有一个问题：作为`DOM`操作的依据，`commit阶段`需要找到所有有`effectTag`的`Fiber节点`并依次执行`effectTag`对应操作。难道需要在`commit阶段`再遍历一次`Fiber树`寻找`effectTag !== null`的`Fiber节点`么？

这显然是很低效的。

为了解决这个问题，在`completeWork`的上层函数`completeUnitOfWork`中，每个执行完`completeWork`且存在`effectTag`的`Fiber节点`会被保存在一条被称为`effectList`的单向链表中。

`effectList`中第一个`Fiber节点`保存在`fiber.firstEffect`，最后一个元素保存在`fiber.lastEffect`。

类似`appendAllChildren`，在“归”阶段，所有有`effectTag`的`Fiber节点`都会被追加在`effectList`中，最终形成一条以`rootFiber.firstEffect`为起点的单向链表。

```js
                       nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```

这样，在`commit阶段`只需要遍历`effectList`就能执行所有`effect`了。

你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1744)看到这段代码逻辑。

借用`React`团队成员**Dan Abramov**的话：`effectList`相较于`Fiber树`，就像圣诞树上挂的那一串彩灯。

### [#](https://react.iamkasong.com/process/completeWork.html#流程结尾)流程结尾

至此，`render阶段`全部工作完成。在`performSyncWorkOnRoot`函数中`fiberRootNode`被传递给`commitRoot`方法，开启`commit阶段`工作流程。

```js
commitRoot(root);
```

![completeWork流程图](https://react.iamkasong.com/img/completeWork.png)

## Commit阶段

### 流程概览

`commitRoot`方法是`commit阶段`工作的起点。`fiberRootNode`会作为传参。

```js
commitRoot(root);
```

在`rootFiber.firstEffect`上保存了一条需要执行`副作用`的`Fiber节点`的单向链表`effectList`，这些`Fiber节点`的`updateQueue`中保存了变化的`props`。

这些`副作用`对应的`DOM操作`在`commit`阶段执行。

除此之外，一些什么周期狗子(比如`componenteDidXXX`)、`Hook`(比如`useEffect`)需要在`commit`阶段执行。

`commit`阶段的主要工作(即`Renderer`的工作流程)分为三部分:

+ before mutation 阶段(执行`DOM`操作前)
+ mutation阶段(执行`DOM`操作)
+ layout阶段(执行`DOM`操作后)

在`before mutation阶段`之前和`layout阶段`之后还有一些额外工作，设计到比如`useEffect`的触发、`优先级相关`的重置、`ref`的绑定/解绑。



#### before mutation 之前

`commitRootImpl`方法中知道第一句`if(firstEffect !== null)`之前属于`before mutation`之前。

```js
do {
    // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  // root指 fiberRootNode
  // root.finishedWork指当前应用的rootFiber
  const finishedWork = root.finishedWork;

  // 凡是变量名带lane的都是优先级相关
  const lanes = root.finishedLanes;
  if (finishedWork === null) {
    return null;
  }
  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  // 重置Scheduler绑定的回调函数
  root.callbackNode = null;
  root.callbackId = NoLanes;

  let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
  // 重置优先级相关变量
  markRootFinished(root, remainingLanes);

  // 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
  if (rootsWithPendingDiscreteUpdates !== null) {
    if (
      !hasDiscreteLanes(remainingLanes) &&
      rootsWithPendingDiscreteUpdates.has(root)
    ) {
      rootsWithPendingDiscreteUpdates.delete(root);
    }
  }

  // 重置全局变量
  if (root === workInProgressRoot) {
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  } else {
  }

  // 将effectList赋值给firstEffect
  // 由于每个fiber的effectList只包含他的子孙节点
  // 所以根节点如果有effectTag则不会被包含进来
  // 所以这里将有effectTag的根节点插入到effectList尾部
  // 这样才能保证有effect的fiber都在effectList中
  let firstEffect;
  if (finishedWork.effectTag > PerformedWork) {
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // 根节点没有effectTag
    firstEffect = finishedWork.firstEffect;
  }
```

可以看到,`before mutation`之前主要做一些变量赋值，状态重置的工作。

这一长串代码只需要关注最后赋值的`firstEffect`，在`commit`的三个子阶段都会用到他。

#### layout之后

`layout`阶段执行完后的代码

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
} else {}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
} 

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now());

// ...处理未捕获错误及老版本遗留的边界问题


// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue();

return null;
```

主要包括三点内容：

1、`useEffect`相关的处理。

2、性能追踪相关。

源码离有很多和`interaction`相关的变量。他们都和追踪`React`渲染时间、性能相关，在[Profiler API (opens new window)](https://zh-hans.reactjs.org/docs/profiler.html)和[DevTools (opens new window)](https://github.com/facebook/react-devtools/pull/1069)中使用。

3、在`commit`阶段会触发一些生命周期钩子（如 `componentDidXXX`）和`hook`（如`useLayoutEffect`、`useEffect`）。

在这回调方法中可能触发新的更新，新的更新会开启新的`render-commit`流程。

### before mutation阶段

`Renderer`工作的阶段被称为`commit`阶段。`commit`阶段可以分为三个子阶段：

- before mutation阶段（执行`DOM`操作前）
- mutation阶段（执行`DOM`操作）
- layout阶段（执行`DOM`操作后）

本节我们看看`before mutation阶段`（执行`DOM`操作前）都做了什么。

#### 概览

`before mutation阶段`的代码很短，整个过程就是遍历`effectList`并调用`commitBeforeMutationEffects`函数处理。

```js
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority();
setCurrentUpdateLanePriority(SyncLanePriority);

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext;
executionContext |= CommitContext;

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo);
shouldFireAfterActiveInstanceBlur = false;

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork);

focusedInstanceHandle = null;
```

重点关注`beforeMutation`阶段的主函数`commitBeforeMutationEffects`做了什么。

#### commitBeforeMutationEffects

大体代码逻辑：

```js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag;

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

整体可以分为三部分：

1、处理`DOM节点`渲染/删除后的`autoFocus`、`blur`逻辑。

2、调用`getSnapshotBeforeUpdate`生命周期钩子。

3、调度`useEffect`。

#### 调用getSnapshotBeforeUpdate

`commitBeforeMutationEffectOnFiber`是`commitBeforeMutationLifeCycles`的别名。

在该方法内会调用`getSnapshotBeforeUpdate`。

从`React`v16 开始，`componentWillXXX`钩子前增加了`UNSAFE_`前缀。

究其原因，是因为`Stack Reconciler`重构为`Fiber Reconciler`后，`render阶段`的任务可能中断/重新开始，对应的组件在`render阶段`的生命周期钩子(即`componentWillXXX`)可能触发多次。

这种行为和`React`v15不一致，所以标记为`UNSAFE_`。

为此，`React`提供了替代的生命周期钩子`getSnapshotBeforeUpdate`

`getSnapshotBeforeUpdate`是在`commit阶段`内的`before mutation阶段`调用的，由于`commit阶段`是同步的，所以不会遇到多次调用的问题。

#### 调度`useEffect`

在这几行代码内，`scheduleCallback`方法由`Scheduler`模块提供，用于以某个优先级异步调度一个回调函数。

```js
//useEffect
if((effectTag & Passive) !== NoEffect) {
  if(!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发 useEffect
      flushPassiveEffects()
      return null
    })
  }
}
```

在此处，被异步调度的回调函数就是触发`useEffect`的方法`flushPassiveEffects`。

##### 如何异步调度

在`flushPassiveEffects`方法内部会从全局变量`rootWithPendingPassiveEffects`获取`effectList`。

`effectList`中保存了需要执行副作用的`fiber节点`。其中副作用包括

+ 插入`DOM节点`(Placement)
+ 更新`DOM节点`(Update)
+ 删除`DOM节点`(Deletion)

除此之外，当一个`FunctionComponent`含有`useEffect`或`useLayoutEffect`，他对应的`Fiber节点`也会被赋值`effectTag`。

在`flushPassiveEffects`方法内部会遍历`rootWithPengdingPassiveEffects`(即`effectList`)执行`effect`回调函数。

如果在此时直接执行，`rootWithPendingPassiveEffects === null`。

那么`rootWithPendingPassiveEffects`会在何时赋值呢？

在上一节`layout之后`的代码片段汇总会根据`rootDoesHavePassiveEffects === true ?`决定是否赋值`rootWithPendingPassiveEffects`。

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects
if(rootDoesHavePassiveEffects){
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
}
```

因此整个`useEffect`异步调用分为三步

+ `before mutation阶段`在`scheduleCallback`中调度`flushPassiveEffects`
+ `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
+ `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`



##### 为什么需要异步调用

> 与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

可见，`useEffect`异步执行的原因主要是防止同步执行时阻塞浏览器渲染。

#### 总结

经过本节学习，我们知道了在`before mutation阶段`，会遍历`effectList`，依次执行：

1. 处理`DOM节点`渲染/删除后的 `autoFocus`、`blur`逻辑
2. 调用`getSnapshotBeforeUpdate`生命周期钩子
3. 调度`useEffect`



### mutation 阶段

#### 概览

类似`before mutation阶段`，`mutation阶段`也是遍历`effectList`，执行函数。这里执行的是`commitMutationEffects`。

```js
nextEffect = firstEffect;
do {
  try {
      commitMutationEffects(root, renderPriorityLevel);
    } catch (error) {
      invariant(nextEffect !== null, 'Should be working on an effect.');
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    }
} while (nextEffect !== null);
```

#### commitMutationEffects

```js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag;

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect);

        nextEffect.effectTag &= ~Placement;

        // 更新
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;

        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```

`commitMutationEffects`会遍历`effectList`，对每个`Fiber节点`执行如下三个操作：

1. 根据`ContentReset effectTag`重置文字节点
2. 更新`ref`
3. 根据`effectTag`分别处理，其中`effectTag`包括(`Placement` | `Update` | `Deletion` | `Hydrating`)

我们关注步骤三中的`Placement` | `Update` | `Deletion`。`Hydrating`作为服务端渲染相关，我们先不关注。

#### Placement effect

当`Fiber节点`含有`Placement effectTag`，意味着该`Fiber节点`对应的`DOM节点`需要插入到页面中。

调用的方法为`commitPlacement`。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L1156)看到`commitPlacement`源码

该方法所做的工作分为三步：

1. 获取父级`DOM节点`。其中`finishedWork`为传入的`Fiber节点`。

```js
const parentFiber = getHostParentFiber(finishedWork);
// 父级DOM节点
const parentStateNode = parentFiber.stateNode;
```

1. 获取`Fiber节点`的`DOM`兄弟节点

```js
const before = getHostSibling(finishedWork);
```

1. 根据`DOM`兄弟节点是否存在决定调用`parentNode.insertBefore`或`parentNode.appendChild`执行`DOM`插入操作。

```js
// parentStateNode是否是rootFiber
if (isContainer) {
  insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
} else {
  insertOrAppendPlacementNode(finishedWork, before, parent);
}
```

值得注意的是，`getHostSibling`（获取兄弟`DOM节点`）的执行很耗时，当在同一个父`Fiber节点`下依次执行多个插入操作，`getHostSibling`算法的复杂度为指数级。

这是由于`Fiber节点`不只包括`HostComponent`，所以`Fiber树`和渲染的`DOM树`节点并不是一一对应的。要从`Fiber节点`找到`DOM节点`很可能跨层级遍历。

考虑如下例子：

```jsx
function Item() {
  return <li><li>;
}

function App() {
  return (
    <div>
      <Item/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

对应的`Fiber树`和`DOM树`结构为：

```js
// Fiber树
          child      child      child       child
rootFiber -----> App -----> div -----> Item -----> li

// DOM树
#root ---> div ---> li
```

当在`div`的子节点`Item`前插入一个新节点`p`，即`App`变为：

```jsx
function App() {
  return (
    <div>
      <p></p>
      <Item/>
    </div>
  )
}
```

对应的`Fiber树`和`DOM树`结构为：

```js
// Fiber树
          child      child      child
rootFiber -----> App -----> div -----> p 
                                       | sibling       child
                                       | -------> Item -----> li 
// DOM树
#root ---> div ---> p
             |
               ---> li
```

此时`DOM节点` `p`的兄弟节点为`li`，而`Fiber节点` `p`对应的兄弟`DOM节点`为：

```js
fiberP.sibling.child
```

即`fiber p`的`兄弟fiber` `Item`的`子fiber` `li`

#### update effect

当`Fiber节点`含有`Update effectTag`，意味着该`Fiber节点`需要更新。调用的方法为`commitWork`，他会根据`Fiber.tag`分别处理。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L1441)看到`commitWork`源码

这里我们主要关注`FunctionComponent`和`HostComponent`。

##### FunctionComponent mutation

当`fiber.tag`为`FunctionComponent`，会调用`commitHookEffectListUnmount`。该方法会遍历`effectList`，执行所有`useLayoutEffect hook`的销毁函数。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L314)看到`commitHookEffectListUnmount`源码

所谓“销毁函数”，见如下例子：

```js
useLayoutEffect(() => {
  // ...一些副作用逻辑

  return () => {
    // ...这就是销毁函数
  }
})
```

你不需要很了解`useLayoutEffect`，我们会在下一节详细介绍。你只需要知道在`mutation阶段`会执行`useLayoutEffect`的销毁函数。

##### HostComponent mutation

当`fiber.tag`为`HostComponent`，会调用`commitUpdate`。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-dom/src/client/ReactDOMHostConfig.js#L423)看到`commitUpdate`源码

最终会在[`updateDOMProperties` (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-dom/src/client/ReactDOMComponent.js#L378)中将[`render阶段 completeWork` (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L229)中为`Fiber节点`赋值的`updateQueue`对应的内容渲染在页面上。

```js
for (let i = 0; i < updatePayload.length; i += 2) {
  const propKey = updatePayload[i];
  const propValue = updatePayload[i + 1];

  // 处理 style
  if (propKey === STYLE) {
    setValueForStyles(domElement, propValue);
  // 处理 DANGEROUSLY_SET_INNER_HTML
  } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
    setInnerHTML(domElement, propValue);
  // 处理 children
  } else if (propKey === CHILDREN) {
    setTextContent(domElement, propValue);
  } else {
  // 处理剩余 props
    setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
  }
}
```

#### Deletion effect

当`Fiber节点`含有`Deletion effectTag`，意味着该`Fiber节点`对应的`DOM节点`需要从页面中删除。调用的方法为`commitDeletion`。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L1421)看到`commitDeletion`源码

该方法会执行如下操作：

1. 递归调用`Fiber节点`及其子孙`Fiber节点`中`fiber.tag`为`ClassComponent`的[`componentWillUnmount` (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L920)生命周期钩子，从页面移除`Fiber节点`对应`DOM节点`
2. 解绑`ref`
3. 调度`useEffect`的销毁函数

#### 总结

从这节我们学到，`mutation阶段`会遍历`effectList`，依次执行`commitMutationEffects`。该方法的主要工作为“根据`effectTag`调用不同的处理函数处理`Fiber`。

### layout阶段

该阶段之所以称为`layout`，因为该阶段的代码都是在`DOM`阶段渲染完成的(`mutation阶段完成`)后执行的。

该阶段触发的生命周期钩子和`hook`可以直接访问到已经改变的`Dom`，即该阶段是可以参与`DOM Layout`的阶段。

#### 概览

与前两个阶段类似，`layout阶段`也是遍历`effectlist`，执行函数。具体执行的函数是`commitLayoutEffects`。

```js
root.current = finishedWork
nextEffect = firstEffect
do {
	try {
    commitLayoutEffects(root,lines)
  }catch (err){
    invariant(nextEffect !== null, 'Should be working  on an effect')
    captureCommitPhaseError(nextEffect,error)
  	nextEffect = nextEffect.nextEffect
  }
}while(nextEffect !== null)
  
nextEffect = null
```

#### commitLayoutEffects

> **commitLayoutEffects源码**

```js
function commitLayoutEffects(root: FiberRoot,committed: Lanes) {
  while(nextEffect !== null) {
    const effectTag = nextEffect.effectTag
    
    // 调用生命周期钩子和hook
    if(effectTag & (Update | Callback)){
      const current = nextEffect.alternate
      commitLayoutEffectonFiber(root,current,nextEffect,committedLanes)
    }
    
    // 赋值ref
    if(effectTag & Ref){
      commitAttachRef(nextEffect)
    }
    
    nextEffect = nextEffect.nextEffect
  }
}
```

`commitLayoutEffects` 一共做了两件事情

1. commitLayoutEffectOnFiber (调用`生命周期钩子` 和`hook`相关操作)
2. commitAttachRef (赋值 ref)

#### commitLayoutEffectOnFiber

`commitLayoutEffectOnFiber`方法会根据`fiber.tag`对不同类型的节点分别处理。

+ 对于`ClassComponent`，他会通过`current === null？`区分是`mount`还是`update`，调用`componentDidMount`或者`ComponentDidUpdate`

触发`状态更新`的`this.setState`如果赋值了第二个参数`回调参数`，他会在此处调用。

```js
this.setState({xxx: 1, () => {
	console.log(" i am updating")
}})
```

+ 对于`FunctionComponent`及相关类型，他会调用`useEffectLayoutEffect hook`的`回调函数`，调度`useEffect`的`销毁`与`回调`。

> `相关类型`指特殊处理后的`FunctionComponent`，比如`ForwardRef`、`React.memo`包裹的`FunctionComponent`。

```js
switch(finishedWork.tag){
  case FunctionComponent:
  case ForwardRef:
  case SimpleMemoComponent:
  case Block: {
    // 执行useLayoutEffect的回调函数
    commitHookEffectListMount(ookLayout | HookHastEffect,finishedWork)
    // 调度useEffect的销毁函数与回调函数
    schedulePassiveEffects(finishedWork)
    return
  }
}
```

在上一节介绍[Update effect](https://react.iamkasong.com/renderer/mutation.html#update-effect)时介绍过，`mutation阶段`会执行`useLayoutEffect hook`的`销毁函数`。

结合这里我们可以发现，`useLayoutEffect hook`从上一次更新的`销毁函数`调用到本次更新的`回调函数`调用是同步执行的。

而`useEffect`则需要先调度，在`Layout阶段`完成后再异步执行。

这就是`useLayoutEffect`与`useEffect`的区别。

- 对于`HostRoot`，即`rootFiber`，如果赋值了第三个参数`回调函数`，也会在此时调用。

```js
ReactDOM.render(<App />, document.querySelector("#root"), function() {
  console.log("i am mount~");
});
```

####  commitAttachRef

`commitLayoutEffects`会做的第二件事是`commitAttachRef`。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L823)看到`commitAttachRef`源码

```js
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;

    // 获取DOM实例
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    if (typeof ref === "function") {
      // 如果ref是函数形式，调用回调函数
      ref(instanceToUse);
    } else {
      // 如果ref是ref实例形式，赋值ref.current
      ref.current = instanceToUse;
    }
  }
}
```

代码逻辑很简单：获取`DOM`实例，更新`ref`。

#### current Fiber树切换

至此，整个`layout阶段`就结束了。

在结束本节的学习前，我们关注下这行代码：

```js
root.current = finishedWork;
```

在[双缓存机制一节](https://react.iamkasong.com/process/doubleBuffer.html#什么是-双缓存)我们介绍过，`workInProgress Fiber树`在`commit阶段`完成渲染后会变为`current Fiber树`。这行代码的作用就是切换`fiberRootNode`指向的`current Fiber树`。

那么这行代码为什么在这里呢？（在`mutation阶段`结束后，`layout阶段`开始前。）

我们知道`componentWillUnmount`会在`mutation阶段`执行。此时`current Fiber树`还指向前一次更新的`Fiber树`，在生命周期钩子内获取的`DOM`还是更新前的。

`componentDidMount`和`componentDidUpdate`会在`layout阶段`执行。此时`current Fiber树`已经指向更新后的`Fiber树`，在生命周期钩子内获取的`DOM`就是更新后的。

#### 总结

从这节我们学到，`layout阶段`会遍历`effectList`，依次执行`commitLayoutEffects`。该方法的主要工作为“根据`effectTag`调用不同的处理函数处理`Fiber`并更新`ref`。



## Diff 算法

为了防止概念混淆，这里再强调下

一个`DOM节点`在某一时刻最多会有4个节点和他相关。

1. `current Fiber`。如果该`DOM节点`已在页面中，`current Fiber`代表该`DOM节点`对应的`Fiber节点`。
2. `workInProgress Fiber`。如果该`DOM节点`将在本次更新中渲染到页面中，`workInProgress Fiber`代表该`DOM节点`对应的`Fiber节点`。
3. `DOM节点`本身。
4. `JSX对象`。即`ClassComponent`的`render`方法的返回结果，或`FunctionComponent`的调用结果。`JSX对象`中包含描述`DOM节点`的信息。

`Diff算法`的本质是对比1和4，生成2。

### 概览

#### Diff的瓶颈以及React如何应对

由于`Diff`操作本身也会带来性能损耗，React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中`n`是树中元素的数量。

如果在`React`中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。

为了降低算法复杂度，`React`的`diff`会预设三个限制：

1. 只对同级元素进行`Diff`。如果一个`DOM节点`在前后两次更新中跨越了层级，那么`React`不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过 `key prop`来暗示哪些子元素在不同的渲染下能保持稳定。考虑如下例子：

```jsx
// 更新前
<div>
  <p key="ka">ka</p>
  <h3 key="song">song</h3>
</div>

// 更新后
<div>
  <h3 key="song">song</h3>
  <p key="ka">ka</p>
</div>
```

如果没有`key`，`React`会认为`div`的第一个子节点由`p`变为`h3`，第二个子节点由`h3`变为`p`。这符合限制2的设定，会销毁并新建。

但是当我们用`key`指明了节点前后对应关系后，`React`知道`key === "ka"`的`p`在更新后还存在，所以`DOM节点`可以复用，只是需要交换下顺序。

这就是`React`为了应对算法性能瓶颈做出的三条限制。

#### Diff是如何实现的

我们从`Diff`的入口函数`reconcileChildFibers`出发，该函数会根据`newChild`（即`JSX对象`）类型调用不同的处理函数。

> 你可以从[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L1280)看到`reconcileChildFibers`的源码。

```js
// 根据newChild类型选择不同diff函数处理
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any,
): Fiber | null {

  const isObject = typeof newChild === 'object' && newChild !== null;

  if (isObject) {
    // object类型，可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        // 调用 reconcileSingleElement 处理
      // // ...省略其他case
    }
  }

  if (typeof newChild === 'string' || typeof newChild === 'number') {
    // 调用 reconcileSingleTextNode 处理
    // ...省略
  }

  if (isArray(newChild)) {
    // 调用 reconcileChildrenArray 处理
    // ...省略
  }

  // 一些其他情况调用处理函数
  // ...省略

  // 以上都没有命中，删除节点
  return deleteRemainingChildren(returnFiber, currentFirstChild);
}
```

我们可以从同级的节点数量将Diff分为两类：

1. 当`newChild`类型为`object`、`number`、`string`，代表同级只有一个节点
2. 当`newChild`类型为`Array`，同级有多个节点

在接下来两节我们会分别讨论这两类节点的`Diff`。

### 单节点Diff

对于单个几点，我们以类型`object`为例，会进入`reconcileSingleElement`

```js
const isObject = typeof newChild === 'object' && newChild !== null
if(isObject){
  // 对象类型，可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
  switch(newChild.$$typeof){
      case REACT_ELEMENT_TYPE
      // 调用reconcileSingleElement 处理
      // ... 其他case
  }
}
```

这个函数会做如下事情：

![diff](https://react.iamkasong.com/img/diff.png)



让我们看看第二步**判断DOM节点是否可以复用**是如何实现的

```javascript
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement
): Fiber {
  const key = element.key;
  let child = currentFirstChild;
  
  // 首先判断是否存在对应DOM节点
  while (child !== null) {
    // 上一次更新存在DOM节点，接下来判断是否可复用

    // 首先比较key是否相同
    if (child.key === key) {

      // key相同，接下来比较type是否相同

      switch (child.tag) {
        // ...省略case
        
        default: {
          if (child.elementType === element.type) {
            // type相同则表示可以复用
            // 返回复用的fiber
            return existing;
          }
          
          // type不同则跳出switch
          break;
        }
      }
      // 代码执行到这里代表：key相同但是type不同
      // 将该fiber及其兄弟fiber标记为删除
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // key不同，将该fiber标记为删除
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  // 创建新Fiber，并返回 ...省略
}
```

还记得我们刚才提到的，React预设的限制

从代码可以看出，React通过先判断`key`是否相同，如果`key`相同则判断`type`是否相同，只有都相同时，一个`DOM`节点才能复用。

这里有个细节需要关注下：

- 当`child !== null`且`key相同`且`type不同`时执行`deleteRemainingChildren`将`child`及其兄弟`fiber`都标记删除。
- 当`child !== null`且`key不同`时仅将`child`标记删除。

考虑如下例子：

当前页面有3个`li`，我们要全部删除，再插入一个`p`。

```js
// 当前页面显示的
ul > li * 3

// 这次需要更新的
ul > p
```

由于本次更新时只有一个`p`，属于单一节点的`Diff`，会走上面介绍的代码逻辑。

在`reconcileSingleElement`中遍历之前的3个`fiber`（对应的`DOM`为3个`li`），寻找本次更新的`p`是否可以复用之前的3个`fiber`中某个的`DOM`。

当`key相同`且`type不同`时，代表我们已经找到本次更新的`p`对应的上次的`fiber`，但是`p`与`li` `type`不同，不能复用。既然唯一的可能性已经不能复用，则剩下的`fiber`都没有机会了，所以都需要标记删除。

当`key不同`时只代表遍历到的该`fiber`不能被`p`复用，后面还有兄弟`fiber`还没有遍历到。所以仅仅标记该`fiber`删除。

### 多节点Diff

#### 概览

首先归纳下我们需要处理的情况：

我们以**之前**代表更新前的`JSX对象`，**之后**代表更新后的`JSX对象`

**情况1：节点更新**

```jsx
// 之前
<ul>
  <li key="0" className="before">0<li>
  <li key="1">1<li>
</ul>

// 之后 情况1 —— 节点属性变化
<ul>
  <li key="0" className="after">0<li>
  <li key="1">1<li>
</ul>

// 之后 情况2 —— 节点类型更新
<ul>
  <div key="0">0</div>
  <li key="1">1<li>
</ul>
```

**情况2：节点新增或减少**

```jsx
// 之前
<ul>
  <li key="0">0<li>
  <li key="1">1<li>
</ul>

// 之后 情况1 —— 新增节点
<ul>
  <li key="0">0<li>
  <li key="1">1<li>
  <li key="2">2<li>
</ul>

// 之后 情况2 —— 删除节点
<ul>
  <li key="1">1<li>
</ul>
```

**情况3：节点位置变化**

```jsx
// 之前
// 之前
<ul>
  <li key="0">0<li>
  <li key="1">1<li>
</ul>

// 之后
<ul>
  <li key="1">1<li>
  <li key="0">0<li>
</ul>
```

同级多个节点的`Diff`，一定属于以上三种情况中的一种或多种。

#### Diff的思路

该如何设计算法呢？如果让我设计一个`Diff算法`，我首先想到的方案是：

1. 判断当前节点的更新属于哪种情况
2. 如果是`新增`，执行新增逻辑
3. 如果是`删除`，执行删除逻辑
4. 如果是`更新`，执行更新逻辑

按这个方案，其实有个隐含的前提——**不同操作的优先级是相同的**

但是`React团队`发现，在日常开发中，相较于`新增`和`删除`，`更新`组件发生的频率更高。所以`Diff`会优先判断当前节点是否属于`更新`。

**注意**

在我们做数组相关的算法题时，经常使用**双指针**从数组头和尾同时遍历以提高效率，但是这里却不行。

虽然本次更新的`JSX对 象` `newChildren`为数组形式，但是和`newChildren`中每个组件进行比较的是`current fiber`，同级的`Fiber节点`是由`sibling`指针链接形成的单链表，即不支持双指针遍历。

即 `newChildren[0]`与`fiber`比较，`newChildren[1]`与`fiber.sibling`比较。

所以无法使用**双指针**优化。

## 状态更新

### 流程梗概

### 几个关键点

##### render阶段的开始

`render阶段`开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于更新是同步更新还是异步更新

##### commit阶段的开始

`commit阶段`开始于`commitRoot`方法的调用，其中`rootfiber`会作为传参。我们已经知道，`render阶段`完成后会进入`commit阶段`。让我们继续补全从`触发状态更新`到`render阶段`的路径。

```sh
触发状态更新（根据场景调用不同方法）

    |
    |
    v

    ？

    |
    |
    v

render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）

    |
    |
    v

commit阶段（`commitRoot`）
```

##### 创建update对象

在`React`中，有如下方法可以触发状态更新（排除SSR相关）

+ ReactDOM.render
+ this.setState
+ this.forceUpdate
+ useState
+ useReducer

这些方法调用的场景各不相同，他们是如何接入同一套 **状态更新机制**呢

答案是：每次`状态更新`都会创建一个保存**更新状态相关内容**的对象，我们叫他`update`。在`render阶段`的`beginWork`中根据`Update`计算新的`state`。

##### 从fiber到root

现在`触发状态更新的Fiber`上已经包含`Update`对象。

我们知道，`render阶段`是从`rootFiber`开始向下遍历的。那么如何从`触发状态更新的fiber`得到`rootfiber`呢？

答案是：调用`markUpdateLaneFromFiberToRoot`方法

该方法做的工作可以概括为：从`触发状态更新的fiber`一直向上遍历到`rootFiber`，并返回`rootFiber`。

由于不同更新优先级不尽相同，所以过程中还会更新遍历到`fiber`的优先级。

##### 调度更新

现在我们拥有一个`rootfiber`，该`rootFiber`对应的`Fiber树`中某个`Fiber节点`包含一个`Update`。接下来通知`Scheduler`根据**状态**的优先级，决定以**同步**还是**异步**的方式调度本次更新。

这里调用的方法是`ensureRootIsScheduled`。

以下是`ensureRootIsScheduled`最核心的代码

```js
if (newCallbackPriority === SyncLanePriority) {
  // 任务已经过期，需要同步执行render阶段
  newCallbackNode = scheduleSyncCallback(
    performSyncWorkOnRoot.bind(null, root)
  );
} else {
  // 根据任务优先级异步执行render阶段
  var schedulerPriorityLevel = lanePriorityToSchedulerPriority(
    newCallbackPriority
  );
  newCallbackNode = scheduleCallback(
    schedulerPriorityLevel,
    performConcurrentWorkOnRoot.bind(null, root)
  );
}
```

其中，`scheduleCallback`和`scheduleSyncCallback`会调用`Scheduler`提供的调度方法根据`优先级`调度回调函数执行。

可以看到，这里调度的回调函数是

```js
performSyncWorkOnRoot.bind(null,root)
performConcurrentWorkOnRoot.bind(null,root)
```

即`render阶段`的入口函数。

至此，`状态更新`就和我们所熟知的`render阶段`接上了。

### 总结

让我们梳理下`状态更新`的整个调用路径的关键节点：

```sh
触发状态更新（根据场景调用不同方法）

    |
    |
    v

创建Update对象（接下来三节详解）

    |
    |
    v

从fiber到root（`markUpdateLaneFromFiberToRoot`）

    |
    |
    v

调度更新（`ensureRootIsScheduled`）

    |
    |
    v

render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）

    |
    |
    v

commit阶段（`commitRoot`）
```

### 心智模型

#### 同步更新的React

我们可以将`更新机制`类比`代码版本控制`

在没有`代码版本控制`前，我们在代码中逐步叠加功能。一切看起来井然有序，直到我们遇到了一个紧急线上bug(红色标记)

![流程1](https://react.iamkasong.com/img/git1.png)

为了修复这个bug，我们需要首先将之前的代码提交。

在`React`中，所有通过`ReactDOM.render`创建的应用都是通过类似的方式更新状态。

即没有优先级概念，`高优更新`（红色节点）需要排在其他`更新`后面执行。

#### 并发更新的React

当有了`代码版本控制`，有紧急线上bug需要修复时，我们暂存当前分支的修改，在`master`分支修复bug并上线。

![流程2](https://react.iamkasong.com/img/git2.png)

bug修复上线后通过`git rebase`命令和`开发分支`连接上。`开发分支`基于`修复bug的版本`继续开发。

![流程3](https://react.iamkasong.com/img/git3.png)

在`React`中，通过`ReactDOM.createBlockingRoot`和`ReactDOM.createRoot`创建的应用会采用`并发`的方式`更新状态`。

`高优更新`（红色节点）中断正在进行中的`低优更新`（蓝色节点），先完成`render-commit流程`。

待`高优更新`完成后，`低优更新`基于`高优更新`的结果`重新更新`。

### Update

#### Update的分类

首先，我们将可以触发更新的方法所隶属的组件分类：

+ ReactDOM.render - HostRoot
+ this.setState - ClassComponent
+ this.forceUpdate - ClassComponent
+ useState - FunctionComponent
+ useReducer - FunctionComponent

可以看到，一共三种组件(`HostRoot`|`ClassComponent`|`FunctionComponent`)可以触发更新。

由于不同类型组件工作方式不同，所以存在两种不同结构的`Update`，其中`ClassComponent`与`HostRoot`共用一套`Update`结构，`FunctionComponent`单独使用一种`Update`结构，`FunctionComponent`单独使用一种`Update`结构。

#### Update的结构

`ClassComponent`与`HostRoot`（即`rootFiber.tag`对应类型）共用一种`Update结构`。

对应的结构如下：

```typescript
const update: Update<*> = {
  eventTime,
  lane,
  suspenseConfig,
  tag: UpdateState,
  payload: null,
  callback: null,

  next: null,
};
```

> `Update`由`createUpdate`方法返回。

字段意义如下：

+ eventTime：任务时间，通过`performance.now()`获取的毫秒数。由于该字段在未来会重构，当前我们不需要理解他。
+ lane：优先级相关字段。
+ suspenseConfig：`Suspense`相关
+ tag：更新的类型，包括`UpdateState`|`ReplaceState`|`ForceUpdate`|`CaptureUpdate`。
+ payload：更新挂载的数据，不同类型组件挂载的数据不同，对于`ClassComponent`，`payload`为`this.setState`的第一个传参。对于`HostRoot`，`payload`为`ReactDOM.render`的一个传参。
+ callback：更新的回调函数。
+ next：与其他`Update`连接形成链表。

#### Update与Fiber的联系

`Update`存在一个连接其他`Update`形成链表的字段`next`。

从双缓存机制中我们可以得知，`Fiber节点`组成`Fiber树`，页面中最多同时存在两棵`Fiber树`：

+ 代表当前页面状态`current Fiber树`
+ 代表正在`render阶段`的`workInProgress Fiber树`

类似`Fiber节点`组成`Fiber树`，`Fiber节点`上的多个`Update`会组成链表并被包含在`fiber.updateQueue中`

什么情况下一个Fiber节点会存在多个Update？

你可能疑惑为什么一个`Fiber节点`会存在多个`Update`。这其实是很常见的情况。

在这里介绍一种最简单的情况：

```js
onClick() {
  this.setState({
    a: 1
  })

  this.setState({
    b: 2
  })
}
```

在一个`ClassComponent`中触发`this.onClick`方法，方法内部调用了两次`this.setState`。这会在该`fiber`中产生两个`Update`。

`Fiber节点`最多同时存在两个`updateQueue`：

- `current fiber`保存的`updateQueue`即`current updateQueue`
- `workInProgress fiber`保存的`updateQueue`即`workInProgress updateQueue`

在`commit阶段`完成页面渲染后，`workInProgress Fiber树`变为`current Fiber树`，`workInProgress Fiber树`内`Fiber节点`的`updateQueue`就变成`current updateQueue`。

#### updateQueue

`updateQueue`有三种类型，其中针对`HostComponent`的类型我们在[completeWork一节](https://react.iamkasong.com/process/completeWork.html#update时)介绍过。

剩下两种类型和`Update`的两种类型对应。

`ClassComponent`与`HostRoot`使用的`UpdateQueue`结构如下：

```js
const queue: UpdateQueue<State> = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    effects: null,
  };
```

> `UpdateQueue`由`initializeUpdateQueue`方法返回，你可以从[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactUpdateQueue.new.js#L157)看到`initializeUpdateQueue`的源码

字段说明如下：

- baseState：本次更新前该`Fiber节点`的`state`，`Update`基于该`state`计算更新后的`state`。

> 你可以将`baseState`类比`心智模型`中的`master分支`。

- `firstBaseUpdate`与`lastBaseUpdate`：本次更新前该`Fiber节点`已保存的`Update`。以链表形式存在，链表头为`firstBaseUpdate`，链表尾为`lastBaseUpdate`。之所以在更新产生前该`Fiber节点`内就存在`Update`，是由于某些`Update`优先级较低所以在上次`render阶段`由`Update`计算`state`时被跳过。

> 你可以将`baseUpdate`类比`心智模型`中执行`git rebase`基于的`commit`（节点D）。

- `shared.pending`：触发更新时，产生的`Update`会保存在`shared.pending`中形成单向环状链表。当由`Update`计算`state`时这个环会被剪开并连接在`lastBaseUpdate`后面。

> 你可以将`shared.pending`类比`心智模型`中本次需要提交的`commit`（节点ABC）。

- effects：数组。保存`update.callback !== null`的`Update`。

#### 例子

`updateQueue`相关代码逻辑涉及到大量链表操作，比较难懂。在此我们举例对`updateQueue`的工作流程讲解下。

假设有一个`fiber`刚经历`commit阶段`完成渲染。

该`fiber`上有两个由于优先级过低所以在上次的`render阶段`并没有处理的`Update`。他们会成为下次更新的`baseUpdate`。

我们称其为`u1`和`u2`，其中`u1.next === u2`。

```js
fiber.updateQueue.firstBaseUpdate === u1;
fiber.updateQueue.lastBaseUpdate === u2;
u1.next === u2;
```

我们用`-->`表示链表的指向：

```js
fiber.updateQueue.baseUpdate: u1 --> u2
```

现在我们在`fiber`上触发两次状态更新，这会先后产生两个新的`Update`，我们称为`u3`和`u4`。

每个 `update` 都会通过 `enqueueUpdate` 方法插入到 `updateQueue` 队列上

当插入`u3`后：

```js
fiber.updateQueue.shared.pending === u3;
u3.next === u3;
```

`shared.pending`的环状链表，用图表示为：

```js
fiber.updateQueue.shared.pending:   u3 ─────┐ 
                                     ^      |                                    
                                     └──────┘
```

接着插入`u4`之后：

```js
fiber.updateQueue.shared.pending === u4;
u4.next === u3;
u3.next === u4;
```

`shared.pending`是环状链表，用图表示为：

```js
fiber.updateQueue.shared.pending:   u4 ──> u3
                                     ^      |                                    
                                     └──────┘
```

`shared.pending` 会保证始终指向最后一个插入的`update`，你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactUpdateQueue.new.js#L208)看到`enqueueUpdate`的源码

更新调度完成后进入`render阶段`。

此时`shared.pending`的环被剪开并连接在`updateQueue.lastBaseUpdate`后面：

```js
fiber.updateQueue.baseUpdate: u1 --> u2 --> u3 --> u4
```

接下来遍历`updateQueue.baseUpdate`链表，以`fiber.updateQueue.baseState`为`初始state`，依次与遍历到的每个`Update`计算并产生新的`state`（该操作类比`Array.prototype.reduce`）。

在遍历时如果有优先级低的`Update`会被跳过。

当遍历完成后获得的`state`，就是该`Fiber节点`在本次更新的`state`（源码中叫做`memoizedState`）。

> `render阶段`的`Update操作`由`processUpdateQueue`完成，你可以从[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactUpdateQueue.new.js#L405)看到`processUpdateQueue`的源码

`state`的变化在`render阶段`产生与上次更新不同的`JSX`对象，通过`Diff算法`产生`effectTag`，在`commit阶段`渲染在页面上。

渲染完成后`workInProgress Fiber树`变为`current Fiber树`，整个更新流程结束。





## React && Vue

以下来自于 Vue 官方文档

React 和 Vue 有许多相似之处，它们的共同点：

+ 都是使用 Virtual DOM
+ 提供了响应式(Reactive)和组件化(Composable)的视图组件。
+ 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

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



### useState

> React 16.8 推出的基础 Hook，其模拟的是类组件编写中的 this.state= {} 与 this.setState（{}）

```jsx
function useState(initialValue) {
  int currentI
}
```



## 组件通信-类

### Props

父-> 子

子 -> 父

```jsx
// 利用 props callback 通信，父组件传递一个 callback到子组件，当时间触发时间参数放置到 callback 带回给父组件。
// 父组件
import React from 'react'
import Son from './son'
class Father extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    info: '',
  }
  callback = (value) => {
    // 此处的value便是子组件带回
    this.setState({
      info: value,
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.info}</p>
        <Son callback={this.callback} />
      </div>
    )
  }
}
export default Father

// 子组件
import React from 'react'
interface IProps {
  callback: (string) => void
}
class Son extends React.Component<IProps> {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (e) => {
    // 在此处将参数带回
    this.props.callback(e.target.value)
  }
  render() {
    return (
      <div>
        <input type='text' onChange={this.handleChange} />
      </div>
    )
  }
}
export default Son
```



### Context

> 适用于跨层级组件之间通信，父 -> 子    父->孙子

```jsx
// context.js
import React from 'react'
const { Consumer, Provider } = React.createContext(null) //创建 context 并暴露Consumer和Provider
export { Consumer, Provider }

// 父组件
import React from 'react'
import Son from './son'
import { Provider } from './context'
class Father extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    info: 'info from father',
  }
  render() {
    return (
      <Provider value={this.state.info}>
        <div>
          <p>{this.state.info}</p>
          <Son />
        </div>
      </Provider>
    )
  }
}
export default Father

// 子组件
import React from 'react'
import GrandSon from './grandson'
import { Consumer } from './context'
class Son extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Consumer>
        {(info) => (
          // 通过Consumer直接获取父组件的值
          <div>
            <p>父组件的值:{info}</p>
            <GrandSon />
          </div>
        )}
      </Consumer>
    )
  }
}
export default Son

// 孙子组件
import React from 'react'
import { Consumer } from './context'
class GrandSon extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Consumer>
        {(info) => (
          // 通过 Consumer 中可以直接获取组父组件的值
          <div>
            <p>组父组件的值:{info}</p>
          </div>
        )}
      </Consumer>
    )
  }
}
export default GrandSon
```

> 特别注意，如果需要消费多个 Context，则React需要使每一个 consumer组件的context在组件树种称为一个单独的节点，说白了就是要Context之间要一一对应。



### OnRef

> OnRef 的本质就是通过 props 将子组件的组件实例（this）当作参数，通过回调传到父组件，然后再父组件就可以拿到子组件的实例从而调用它的方法。

```jsx
// 父组件
import React from 'react'
import Son from './son'
import { Button } from 'antd'

class Father extends React.Component {
  child: any
  constructor(props) {
    super(props)
  }
  sonRef = (ref) => {
    this.child = ref // 在这里拿到子组件的实例
  }
  clearSonInput = () => {
    this.child.clearInput()
  }
  render() {
    return (
      <div>
        <Son onRef={this.sonRef} />
        <Button type='primary' onClick={this.clearSonInput}>
          清空子组件的input
        </Button>
      </div>
    )
  }
}
export default Father

// 子组件
import React from 'react'
import { Button } from 'antd'

interface IProps {
  onRef: any
}

class Son extends React.Component<IProps> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.onRef(this) // 在这将子组件的实例传递给父组件this.props.onRef()方法
  }
  state = {
    info: 'son',
  }
  handleChange = (e) => {
    this.setState({
      info: e.target.value,
    })
  }
  clearInput = () => {
    this.setState({
      info: '',
    })
  }
  render() {
    return (
      <div>
        <div>{this.state.info}</div>
        <input type='text' onChange={this.handleChange} />
      </div>
    )
  }
}
export default Son
```



### ref

> ref 是 react 提供的一个属性，可以通过它访问 DOM 节点或者组件

```jsx
// 父组件
import React from 'react'
import Son from './son'
import { Button } from 'antd'

class Father extends React.Component {
  son: any
  constructor(props) {
    super(props)
    this.son = React.createRef() // 在此处创建ref
  }
  clearSonInput = () => {
    const { current } = this.son // 注意，这里必须通过 this.son.current拿到子组件的实例
    current.clearInput()
  }
  render() {
    return (
      <div>
        <Son ref={this.son} />
        <Button type='primary' onClick={this.clearSonInput}>
          清空子组件的input
        </Button>
      </div>
    )
  }
}
export default Father

// 子组件
import React from 'react'
import { Button } from 'antd'

class Son extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    info: 'son',
  }
  handleChange = (e) => {
    this.setState({
      info: e.target.value,
    })
  }
  clearInput = () => {
    this.setState({
      info: '',
    })
  }
  render() {
    return (
      <div>
        <div>{this.state.info}</div>
        <input type='text' onChange={this.handleChange} />
      </div>
    )
  }
}
export default Son
```

> 特别注意，必须通过 this.childRef.current 才能拿到子组件的实例，使用 ref 常见的场景有管理焦点，文本选择或媒体播放、触发强制动画、集成第三方DOM库等。



## Q&A

### React Hooks 带来的便利

> 1、在类中，我们编写方法，许多都是围绕state，并且在编辑方法的时候，需要在 constructor 中 进行声明，才能够触发，而在 hooks 中，则只需要使用一句简单的声明。

```jsx
// react class
export default class Greeting extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      name : 'Mary'
    }
    this.handleNameChange = this.handleNameChange.bind(this)
  }
  handleNameChange (e){
    this.setState({
      name: e.target.value
    })
  }
  
  render (){
    return (
      <div>
      	<input 
          	value = {props.name}
          	onChange= {props.handleNameChange}
          />
      </div>
    )
  }
}

// 而在使用 hooks 之后，我们可以这样写
export defualt function Greeting (){
 const [name,setName] = useState("Mary")
 const handleNameChange = (e) => {
   setName(e.target.value)
 }
 return (
 	 <div>
      <input 
          value = {name}
          onChange= {handleNameChange}
        />
   </div>
 )
}
```

