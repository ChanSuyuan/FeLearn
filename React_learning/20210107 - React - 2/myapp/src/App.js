import { Component } from "react";
import AddTodo from "./addTodo";
import "./index.css";
import TodoList from "./todoList";
class App extends Component {
  state = {
    todos:[
      {
        id: 1,
        title: "今天想要上王者"
      },{
        id: 2,
        title: "北京的天气已经可以玩泼水成冰"
      }
    ]
  }
  add = (title) => {
    const {todos} = this.state;
    todos.push({
      id: Date.now(),
      title
    });
    this.setState({
      todos
    })
  }
  remove = (id)=>{
    const {todos} = this.state;
    this.setState({
      todos:todos.filter(item=>item.id!==id)
    })
  }
  render() {
    const {todos} = this.state;
    return <div id="todoapp">
      <div className="title">
        <h1>todo</h1>
      </div>
      <div className="content">
        <AddTodo 
          add = {this.add}
        />
        <TodoList 
            todos={todos}
            remove = {this.remove}
        />
      </div>
    </div>
  }
}

export default App;