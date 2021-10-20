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

