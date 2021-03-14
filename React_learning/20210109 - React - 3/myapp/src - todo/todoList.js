import { Component } from "react";
import Todo from "./todo";
/*
key 在一组元素给元素添加一个唯一的标识，在更新时方便查找元素(React 内容使用)
更新前：a(0), b(1), c(2), d(3)
更新后: b(1), c(2), e(4), d(3)
key 的取值问题:
1. 列表中，key 一定不能重复
2. 同一个元素，再更新前后，key 值不能变
*/
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