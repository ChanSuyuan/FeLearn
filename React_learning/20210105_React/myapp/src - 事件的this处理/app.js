import {Component} from "react";

// class App extends Component {
//   state = { // 类似于 Vue 中的 data 属性
//     count: 1
//   }
//   handlerClick = ()=>{
//     console.log(this);
//   }
//   render(){
//     const {count} = this.state;
//     return <div>
//         <p>{count}</p>
//         <button onClick={this.handlerClick}>递增</button>
//     </div>
//   }
// }
class App extends Component {
  constructor(props){
    super(props);
    this.state = { // 类似于 Vue 中的 data 属性
      count: 1
    };
    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick(){
    console.log(this);
  }
  render(){
    const {count} = this.state;
    return <div>
        <p>{count}</p>
        <button onClick={this.handlerClick}>递增</button>
    </div>
  }
}
export default App;
/*
  类组件：
   组件类必须继承 **React.Component**
   组件类必须有 **render** 方法： render 的返回值，是该组件要构建的视图
  state 属性：
    state 组件状态，当组件状态有修改时，会对组件进行更新，从而完成组件的视图更新
    修改组件状态，要通过调用组件的 setState 方法完成
  事件：
    1. react 添加事件的方式，类似于 JS 中的行间事件
    2. 事件名 on 之后，每个单词首字母大写
    3. 默认情况下, React 中事件处理函数的 this 指向 为 undefined
      - this 指向的处理
        1. 箭头函数
        2. bind 绑定
*/