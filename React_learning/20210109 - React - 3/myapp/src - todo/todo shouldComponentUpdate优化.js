import { Component } from "react";

class Todo extends Component {
  shouldComponentUpdate(nextProps){
    //console.log(nextProps.data !== this.props.data);
    return nextProps.data !== this.props.data;
  }
  render() {
    const {data,remove,changeDone} = this.props;
    const {id,title,done} = data;
    console.log("更新",id);
    return <li className="">
        <div className={"todo " + (done?"done":"")}>
          <div className="display">
            <input 
              className="check" 
              type="checkbox" 
              checked={done}
              onChange={({target})=>{
                  changeDone(id,target.checked);
              }}
            />
            <div className="todo-content">{title}</div>
            <span className="todo-destroy" onClick={()=>{remove(id)}}></span>
          </div>
          <div className="edit"><input className="todo-input" type="text" /></div>
        </div>
      </li>
  }
}

export default Todo;