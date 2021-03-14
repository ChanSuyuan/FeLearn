import { Component } from "react";
import Todo from "./todo";

class TodoList extends Component {
  render() {
    const {todos} = this.props;
    return <ul id="todo-list">
      {
        todos.map(item=><Todo key={item.id} {...this.props} data={item} />)
      }
  </ul>
  }
}

export default TodoList;