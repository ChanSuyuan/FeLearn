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

