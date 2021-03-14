import { Component } from "react";

class Stats extends Component {
  render() {
    const { todos,removeDone } = this.props;
    const doneLen = todos.filter(todo => todo.done).length;
    const undDoneLen = todos.length - doneLen;
    return <div id="todo-stats">
      <span className="todo-count">
        <span className="number">{undDoneLen}</span>
        <span className="word">项待完成</span>
      </span>
      {doneLen > 0 ? (
        <span className="todo-clear">
          <a onClick={()=>removeDone()}>Clear <span>{doneLen}</span> 已完成事项</a>
        </span>
      ) : ""}

    </div>
  }
}
export default Stats;