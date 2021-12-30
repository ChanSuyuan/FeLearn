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



## React 16 架构

- **Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler**
- **Reconciler（协调器）—— 负责找出变化的组件**

- **Renderer（渲染器）—— 负责将变化的组件渲染到页面上**



#### Fiber 架构心智模型



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

