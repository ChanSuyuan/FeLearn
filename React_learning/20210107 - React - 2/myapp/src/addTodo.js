import { Component } from "react";
/*
  受控组件：
    当我们希望组件的state 和 表单空间的 state 一致时，就可以使用 受控组件，当我们给表单控件，设置 value 属性或 checked 时，React 就认为我们要实现一个受控组件，这时就必须给控件加 onChange 处理，onChange 在把 控件的状态同步给组件
  非受控组件：
    1. 不在定义时，设置 value 或 checked
    2. defaultValue 或 defaultChecked 设置初始值
*/
class AddTodo extends Component {
  state = {
    title:""
  }
  render() {
    const {add} = this.props;
    const {title} = this.state;
    return <div id="create-todo">
      <input 
        type="text"  
        defaultValue="初始值"
      />
      <input 
        id="new-todo" 
        placeholder="What needs to be done?" 
        autoComplete="off" 
        type="text" 
        value={title}
        onChange = {({target})=>{
            console.log(target.value);
            this.setState({
              title: target.value
            })
        }}
      />
      <button onClick={()=>{
        if(title.trim()){
            add(title);
            this.setState({
              title: ""
            })
        }
      }}>添加Todo</button>
    </div>
  }
}

export default AddTodo;