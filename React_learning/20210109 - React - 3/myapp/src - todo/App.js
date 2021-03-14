import { Component } from "react";
import AddTodo from "./addTodo";
import "./index.css";
import Stats from "./stats";
import TodoList from "./todoList";
class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "今天想要上王者",
        done: true
      }, {
        id: 2,
        title: "北京的天气已经可以玩泼水成冰",
        done: false
      }
    ]
  }
  add = (title) => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos,
        {
          id: Date.now(),
          title,
          done: false
        }
      ]
    })
  }
  changeDone = (id, done) => {
    const { todos } = this.state;
    // 如果该状态是引用类型，注意在更新时，一定不要操作，原有的引用，而是返回一个新的
    // todos.forEach(todo=>{
    //   if(todo.id === id){
    //     todo.done = done;
    //   }
    // })
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i] = {
          ...todos[i],
          done
        }
        break;
      }
    }
    this.setState({
      todos
    })
  }
  remove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(item => item.id !== id)
    })
  }
  removeDone = () => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(item => (!item.done))
    })
  }
  changeTitle = (id, title) => {
    const { todos } = this.state;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i] = {
          ...todos[i],
          title
        }
        break;
      }
    }
    this.setState({
      todos
    })
  }
  render() {
    const { todos } = this.state;
    return <div id="todoapp">
      <div className="title">
        <h1>todo</h1>
      </div>
      <div className="content">
        <AddTodo
          add={this.add}
        />
        {todos.length > 0 ? (
          <><TodoList
            todos={todos}
            remove={this.remove}
            changeDone={this.changeDone}
            changeTitle={this.changeTitle}
          />
            <Stats
              todos={todos}
              removeDone={this.removeDone}
            /></>
        ) : ""}

      </div>
    </div>
  }
}

export default App;