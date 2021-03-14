import { Component } from "react";

class Todo extends Component {
  render() {
    const {data,remove} = this.props;
    const {id,title} = data;
    return <li className="">
        <div className="todo">
          <div className="display">
            <div className="todo-content">{title}</div>
            <span className="todo-destroy" onClick={()=>{remove(id)}}></span>
          </div>
        </div>
      </li>
  }
}

export default Todo;