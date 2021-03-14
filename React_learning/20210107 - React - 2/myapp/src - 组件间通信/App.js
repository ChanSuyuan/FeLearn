import { Component } from "react";
import "./index.css";
import List from "./list";
import data from "./data";
/*
  组件间通信：
  - 父组件向子组件传递信息：父组件在调用子组件时，可以将要传递的信息加在子组件的属性中，子组件可以通过 props 属性接收父组件传递过来的信息
  - 子组件向父组件传递信息：在父组件上定义好相关的回调函数，将回调函数传递给子组件，子组件调用父级的回调函数，向父级进行通信
  - 同级组件间传递信息: 托管在父级，在父级进行处理
*/
class App extends Component {
  state = {
    openKey : "friend" //应该展开项的 key 值，为空则都不展开
  }
  openMenu = (name)=>{
    this.setState({
      openKey: name
    });
  }
  render() {
    const {openKey} = this.state;
    return <div className="friend-list">
      {Object.keys(data).map(item=>{
        return <List 
          key={item} 
          data={data[item]} 
          name = {item}
          openMenu = {this.openMenu}
          openKey = {openKey}
        />
      })}
    </div>
  }
}

export default App;