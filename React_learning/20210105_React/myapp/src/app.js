import { Component } from "react";
import "./index.css";
import Menu from "./menu";
import rootdata from "./data";
/*
  props： 父组件调用子组件时，可以将 数据添加在子组件的属性上 , 在子组件中 可以通过 props 属性接收父级传递的数据
*/
class App extends Component {
  render() {
    return <ul id="menu">
       {Object.keys(rootdata).map((item,index)=>{
          //console.log(item,rootdata[item]);
          return <Menu 
            key = {index} 
            title = {item}
            data = {rootdata[item]}
          />
       })}
    </ul>
  }
}
export default App;