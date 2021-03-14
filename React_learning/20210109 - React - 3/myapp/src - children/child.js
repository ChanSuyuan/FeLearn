import { Component } from "react";
/*
  组件中的结构，可能有一部分不确定
*/
class Child extends Component {
  render(){
    console.log(this.props);
    return <div>{
      this.props.children
    }</div>
  }
}

export default Child;